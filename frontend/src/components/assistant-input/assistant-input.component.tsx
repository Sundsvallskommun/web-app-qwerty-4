'use client';

import { FilePublic } from '@data-contracts/backend/data-contracts';
import { useSpeechToText } from '@hooks/useSpeechToText';
import { ChatHistory, ChatInput, InputSection } from '@sk-web-gui/ai';
import { Button, Icon, useSnackbar, useThemeQueries } from '@sk-web-gui/react';
import { Mic, Plus } from 'lucide-react';
import { SubmitEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createAtAssistantToken,
  getAtAssistantTokenEndingAt,
  MentionedAssistant,
} from '@components/ai-feed/at-assistant-util';
import { MarkdownRendered } from '@components/ai-feed/markdown-rendered';
import { FileList } from './components/file-list.component';
import { ToolbarAttachment } from './components/toolbar-attachment.component';
import { ToolbarAssistantMention } from './components/toolbar-assistant-mention.component';

const DICTATION_AUTO_SUBMIT_DELAY_MS = 2500;
const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface AssistantMentionDraft {
  start: number;
  end: number;
  query: string;
  variant: 'plain' | 'token';
}

const getAssistantMentionDraft = (text: string, cursor: number): AssistantMentionDraft | null => {
  const prefix = text.slice(0, cursor);
  const tokenMatch = /\[\[@([^\]]*)$/.exec(prefix);

  if (tokenMatch) {
    return {
      start: cursor - tokenMatch[0].length,
      end: cursor,
      query: tokenMatch[1],
      variant: 'token',
    };
  }

  const plainMatch = /(^|\s)@([^\s\]]*)$/.exec(prefix);

  if (plainMatch) {
    return {
      start: cursor - plainMatch[2].length - 1,
      end: cursor,
      query: plainMatch[2],
      variant: 'plain',
    };
  }

  return null;
};

const getCompleteAssistantMentionToken = (text: string, cursor: number) => {
  const prefix = text.slice(0, cursor);
  const tokenMatch = /\[\[@([^\]]+)\]\]$/.exec(prefix);

  if (!tokenMatch) {
    return null;
  }

  return {
    start: cursor - tokenMatch[0].length,
    end: cursor,
    query: tokenMatch[1],
  };
};

interface AssistantInputProps {
  onSend: (query: string, files?: FilePublic[], mentionedAssistants?: MentionedAssistant[]) => void;
  history?: ChatHistory;
  disabled?: boolean;
  enableAssistantMentions?: boolean;
  mentionableAssistants?: MentionedAssistant[];
}

export const AssistantInput: React.FC<AssistantInputProps> = ({
  onSend,
  history,
  disabled = false,
  enableAssistantMentions = false,
  mentionableAssistants = [],
}) => {
  const [value, setValue] = useState<string>('');
  const [attachments, setAttachments] = useState<FilePublic[]>([]);
  const [untuched, setUntuched] = useState<boolean>(true);
  const [dictationBase, setDictationBase] = useState<string | null>(null);
  const [pendingAutoSubmit, setPendingAutoSubmit] = useState(false);
  const [mentionedAssistant, setMentionedAssistant] = useState<MentionedAssistant | undefined>(undefined);
  const [mentionDraft, setMentionDraft] = useState<AssistantMentionDraft | null>(null);
  const [highlightedMentionIndex, setHighlightedMentionIndex] = useState(0);
  const { isMinLargeDevice } = useThemeQueries();
  const { t } = useTranslation();
  const message = useSnackbar();
  const autoSubmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const mentionPopupRef = useRef<HTMLDivElement | null>(null);
  const mentionButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { error, finalTranscript, interimTranscript, listening, reset, start, stop, supported } =
    useSpeechToText('sv-SE');

  const dictatedText = useMemo(() => {
    return [finalTranscript, interimTranscript].filter(Boolean).join(' ').trim();
  }, [finalTranscript, interimTranscript]);

  const appendTranscript = (baseText: string, transcript: string) => {
    if (!transcript) return baseText;
    if (!baseText.trim()) return transcript;
    return `${baseText.trimEnd()} ${transcript}`.trim();
  };

  const displayedValue = dictationBase !== null ? appendTranscript(dictationBase, dictatedText) : value;
  const filteredMentionableAssistants = useMemo(() => {
    if (!mentionDraft || mentionedAssistant) {
      return [];
    }

    const query = mentionDraft.query.trim().toLowerCase();

    return mentionableAssistants.filter((assistant) => (query ? assistant.name.toLowerCase().includes(query) : true));
  }, [mentionDraft, mentionedAssistant, mentionableAssistants]);

  const clearAutoSubmitTimeout = () => {
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current);
      autoSubmitTimeoutRef.current = null;
    }
  };

  const focusMentionButton = (index: number) => {
    setHighlightedMentionIndex(index);
    requestAnimationFrame(() => {
      mentionButtonRefs.current[index]?.focus();
    });
  };

  const closeMentionPopup = (focusTextarea = false) => {
    setMentionDraft(null);
    mentionButtonRefs.current = [];

    if (focusTextarea) {
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  };

  const focusNextNonPopupElement = (currentElement: HTMLElement, backwards = false) => {
    const container = formRef.current;

    if (!container) {
      return;
    }

    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) =>
        !element.hasAttribute('disabled') && element.tabIndex >= 0 && !mentionPopupRef.current?.contains(element)
    );
    const currentIndex = focusableElements.indexOf(currentElement);

    if (currentIndex === -1) {
      return;
    }

    const nextElement = backwards ? focusableElements[currentIndex - 1] : focusableElements[currentIndex + 1];
    nextElement?.focus();
  };

  const submit = (submittedValue?: string) => {
    if (disabled || listening) return;

    const nextValue = submittedValue ?? displayedValue;
    const nextMentionedAssistants = mentionedAssistant ? [mentionedAssistant] : undefined;
    const normalizedValue = mentionedAssistant ? nextValue.replace(/\]\](?=\S)/, ']] ') : nextValue;

    if (normalizedValue || attachments.length) {
      onSend(normalizedValue, attachments.length ? attachments : undefined, nextMentionedAssistants);
      setValue('');
      setAttachments([]);
      closeMentionPopup();
      setHighlightedMentionIndex(0);
      setMentionedAssistant(undefined);
      setDictationBase(null);
      setPendingAutoSubmit(false);
      clearAutoSubmitTimeout();
      reset();
    }
  };

  useEffect(() => {
    if (!history?.length) {
      setUntuched(true);
    }
  }, [history]);

  useEffect(() => {
    if (dictationBase === null || listening) return;

    setValue(appendTranscript(dictationBase, dictatedText));
    setDictationBase(null);
  }, [dictatedText, dictationBase, listening]);

  useEffect(() => {
    if (!mentionedAssistant) {
      return;
    }

    const token = createAtAssistantToken(mentionedAssistant.name);

    if (!displayedValue.includes(token)) {
      setMentionedAssistant(undefined);
    }
  }, [displayedValue, mentionedAssistant]);

  useEffect(() => {
    if (!error) return;

    message({ position: 'bottom', message: error.message, status: 'error' });
  }, [error, message]);

  useEffect(() => {
    if (!listening || !dictatedText.trim()) {
      clearAutoSubmitTimeout();
      return;
    }

    clearAutoSubmitTimeout();
    autoSubmitTimeoutRef.current = setTimeout(() => {
      setPendingAutoSubmit(true);
      stop();
    }, DICTATION_AUTO_SUBMIT_DELAY_MS);

    return () => {
      clearAutoSubmitTimeout();
    };
  }, [dictatedText, listening, stop]);

  useEffect(() => {
    if (!pendingAutoSubmit || listening) return;

    submit(displayedValue);
  }, [displayedValue, listening, pendingAutoSubmit]);

  useEffect(() => {
    return () => {
      clearAutoSubmitTimeout();
    };
  }, []);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      submit();
    }
  };

  const handleBackspaceMention = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!mentionedAssistant) {
      return;
    }

    const textarea = event.currentTarget;
    const selectionStart = textarea.selectionStart ?? 0;
    const selectionEnd = textarea.selectionEnd ?? 0;

    if (selectionStart !== selectionEnd) {
      return;
    }

    const token = getAtAssistantTokenEndingAt(displayedValue, selectionStart);

    if (!token || token.handle !== mentionedAssistant.name) {
      return;
    }

    event.preventDefault();
    const nextValue = `${displayedValue.slice(0, token.start)}${displayedValue.slice(token.end)}`;
    setValue(nextValue);
    setMentionedAssistant(undefined);

    requestAnimationFrame(() => {
      textareaRef.current?.setSelectionRange(token.start, token.start);
    });
  };

  const handleTextareaChange = (nextValue: string) => {
    setValue(nextValue);
  };

  const syncMentionDraft = (nextValue: string, nextSelectionStart: number) => {
    if (!enableAssistantMentions || disabled || listening || mentionedAssistant) {
      closeMentionPopup();
      return;
    }

    const completeToken = getCompleteAssistantMentionToken(nextValue, nextSelectionStart);
    const exactAssistant = mentionableAssistants.find(
      (assistant) => assistant.name.toLowerCase() === completeToken?.query.trim().toLowerCase()
    );

    if (completeToken && exactAssistant) {
      const canonicalToken = createAtAssistantToken(exactAssistant.name);
      const normalizedValue =
        nextValue.slice(completeToken.start, completeToken.end) === canonicalToken ?
          nextValue
        : `${nextValue.slice(0, completeToken.start)}${canonicalToken}${nextValue.slice(completeToken.end)}`;
      const caretPosition = completeToken.start + canonicalToken.length;

      if (normalizedValue !== nextValue) {
        setValue(normalizedValue);

        requestAnimationFrame(() => {
          textareaRef.current?.setSelectionRange(caretPosition, caretPosition);
        });
      }

      closeMentionPopup();
      setMentionedAssistant(exactAssistant);
      return;
    }

    const draft = getAssistantMentionDraft(nextValue, nextSelectionStart);

    if (!draft) {
      closeMentionPopup();
      return;
    }

    if (draft.variant === 'plain') {
      const exactPlainAssistant = mentionableAssistants.find(
        (assistant) => assistant.name.toLowerCase() === draft.query.trim().toLowerCase()
      );

      if (exactPlainAssistant) {
        const token = createAtAssistantToken(exactPlainAssistant.name);
        const replacedValue = `${nextValue.slice(0, draft.start)}${token}${nextValue.slice(draft.end)}`;
        const caretPosition = draft.start + token.length;

        setValue(replacedValue);
        closeMentionPopup();
        setMentionedAssistant(exactPlainAssistant);

        requestAnimationFrame(() => {
          textareaRef.current?.setSelectionRange(caretPosition, caretPosition);
        });

        return;
      }
    }

    setMentionDraft(draft);
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mentionDraft && filteredMentionableAssistants.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        focusMentionButton(0);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        focusMentionButton(filteredMentionableAssistants.length - 1);
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMentionPopup();
        return;
      }

      if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault();
        focusNextNonPopupElement(event.currentTarget);
        return;
      }
    }

    if (event.key === 'Escape') {
      closeMentionPopup();
      return;
    }

    if (event.key === 'Backspace') {
      handleBackspaceMention(event);
    }

    handleEnter(event);
  };

  const handleAddAssistantMention = (assistant: MentionedAssistant) => {
    if (disabled || listening || mentionedAssistant) {
      return;
    }

    const token = createAtAssistantToken(assistant.name);
    const textarea = textareaRef.current;
    const cursorStart = textarea?.selectionStart ?? displayedValue.length;
    const cursorEnd = textarea?.selectionEnd ?? displayedValue.length;
    const insertionStart = mentionDraft?.start ?? cursorStart;
    const insertionEnd = mentionDraft?.end ?? cursorEnd;
    const nextValue = `${displayedValue.slice(0, insertionStart)}${token}${displayedValue.slice(insertionEnd)}`;
    const caretPosition = insertionStart + token.length;

    setValue(nextValue);
    closeMentionPopup();
    setMentionedAssistant(assistant);
    setHighlightedMentionIndex(0);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(caretPosition, caretPosition);
    });
  };

  useEffect(() => {
    setHighlightedMentionIndex(0);
  }, [mentionDraft?.start, mentionDraft?.query, mentionDraft?.variant]);

  useEffect(() => {
    if (highlightedMentionIndex >= filteredMentionableAssistants.length) {
      setHighlightedMentionIndex(0);
    }
  }, [filteredMentionableAssistants.length, highlightedMentionIndex]);

  const selectedAssistantNames = mentionedAssistant ? [mentionedAssistant.name] : [];
  const previewText = displayedValue || ' ';

  const handleAddFile = (attachment: FilePublic) => {
    if (disabled || listening) return;
    setAttachments([...attachments, attachment]);
  };

  const handleRemoveFile = (attachment: FilePublic) => {
    setAttachments([...attachments.filter((file) => file.id !== attachment.id)]);
  };

  const handleMicClick = async () => {
    if (disabled) return;

    if (listening) {
      setPendingAutoSubmit(false);
      clearAutoSubmitTimeout();
      await stop();
      return;
    }

    reset();
    setPendingAutoSubmit(false);
    if (isMinLargeDevice || !untuched) {
      setUntuched(false);
    }
    const currentValue = value;

    const started = await start();
    if (started) {
      setDictationBase(currentValue);
    } else {
      setDictationBase(null);
    }
  };

  const handleMentionButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusMentionButton((index + 1) % filteredMentionableAssistants.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusMentionButton((index - 1 + filteredMentionableAssistants.length) % filteredMentionableAssistants.length);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMentionPopup(true);
      return;
    }

    if (event.key === 'Tab' && event.shiftKey) {
      setHighlightedMentionIndex(index);
    }
  };

  const renderMicButton = () => (
    <Button
      variant="tertiary"
      showBackground={listening}
      size="sm"
      iconButton
      onClick={handleMicClick}
      disabled={disabled || (!supported && !listening)}
      aria-label={listening ? t('assistants:dictation_stop') : t('assistants:dictation_start')}
      aria-pressed={listening}
      className={listening ? '!bg-green-600 !text-white animate-pulse hover:!bg-green-600' : undefined}
    >
      <Icon icon={<Mic />} />
    </Button>
  );

  return (
    <form ref={formRef} className="sk-ai-inputsection lg:max-w-[100rem] !py-0" onSubmit={handleSubmit}>
      <InputSection.Wrapper shadow={!isMinLargeDevice}>
        <ChatInput.Wrapper>
          <FileList files={attachments} onRemove={handleRemoveFile} />
          {untuched && !isMinLargeDevice && (
            <ChatInput.Submitbutton>
              <Button
                tabIndex={-1}
                showBackground={false}
                size="sm"
                iconButton
                variant="tertiary"
                aria-label="Fler val"
                onClick={() => setUntuched(false)}
                disabled={disabled}
              >
                <Icon icon={<Plus />} />
              </Button>
            </ChatInput.Submitbutton>
          )}
          <ChatInput.Textarea
            ref={textareaRef}
            onFocus={() => !disabled && setUntuched(false)}
            onChange={(e) => {
              const nextValue = e.target.value;
              const nextSelectionStart = e.target.selectionStart ?? nextValue.length;

              handleTextareaChange(nextValue);
              syncMentionDraft(nextValue, nextSelectionStart);
            }}
            onClick={(e) => syncMentionDraft(e.currentTarget.value, e.currentTarget.selectionStart ?? 0)}
            onKeyUp={(e) => syncMentionDraft(e.currentTarget.value, e.currentTarget.selectionStart ?? 0)}
            onSelect={(e) => syncMentionDraft(e.currentTarget.value, e.currentTarget.selectionStart ?? 0)}
            value={displayedValue}
            onKeyDown={handleTextareaKeyDown}
            wrap={!untuched || isMinLargeDevice}
            disabled={disabled || listening}
            className={mentionedAssistant ? '!text-transparent caret-black selection:text-white' : undefined}
          ></ChatInput.Textarea>
          {enableAssistantMentions && mentionDraft && filteredMentionableAssistants.length > 0 && !untuched && (
            <div
              ref={mentionPopupRef}
              className="absolute left-0 right-0 bottom-full z-20 rounded-groups sk-popup-menu sk-popup-menu-sm"
              data-open={true}
            >
              <ul aria-label="Available assistants" className="sk-popup-menu-items">
                {filteredMentionableAssistants.map((assistant, index) => (
                  <li key={assistant.id}>
                    <Button
                      ref={(element) => {
                        mentionButtonRefs.current[index] = element;
                      }}
                      tabIndex={index === highlightedMentionIndex ? 0 : -1}
                      variant="tertiary"
                      showBackground={index === highlightedMentionIndex}
                      className="sk-popup-menu-item"
                      onFocus={() => setHighlightedMentionIndex(index)}
                      onKeyDown={(event) => handleMentionButtonKeyDown(event, index)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleAddAssistantMention(assistant)}
                    >
                      @{assistant.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {enableAssistantMentions && mentionedAssistant && !untuched && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-groups px-16 py-10 mr-6"
            >
              <MarkdownRendered
                text={previewText}
                messageId="assistant-input-preview"
                hideElements={false}
                enableAssistantAts
                allowedAssistantNames={selectedAssistantNames}
                interactiveAssistantAts={false}
                className="whitespace-pre-wrap break-words text-base leading-[inherit]"
              />
            </div>
          )}

          {(!untuched || isMinLargeDevice) && !disabled && (
            <>
              <ChatInput.Toolbar>
                <ToolbarAttachment onAttached={handleAddFile} disabled={listening} />
                {enableAssistantMentions && (
                  <ToolbarAssistantMention
                    assistants={mentionableAssistants}
                    disabled={listening || !!mentionedAssistant}
                    onSelect={handleAddAssistantMention}
                  />
                )}
              </ChatInput.Toolbar>
              <div className="flex gap-0 lg:gap-6 items-center">
                {renderMicButton()}
                <ChatInput.Submitbutton
                  disabled={disabled || listening || (!displayedValue && !attachments.length)}
                  type="submit"
                />
              </div>
            </>
          )}
          {untuched && !isMinLargeDevice && (
            <ChatInput.Submitbutton onClick={(event) => event.preventDefault()}>
              {renderMicButton()}
            </ChatInput.Submitbutton>
          )}
        </ChatInput.Wrapper>
      </InputSection.Wrapper>
    </form>
  );
};
