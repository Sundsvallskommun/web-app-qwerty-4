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
  const { isMinLargeDevice } = useThemeQueries();
  const { t } = useTranslation();
  const message = useSnackbar();
  const autoSubmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
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

  const clearAutoSubmitTimeout = () => {
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current);
      autoSubmitTimeoutRef.current = null;
    }
  };

  const submit = (submittedValue?: string) => {
    if (disabled || listening) return;

    const nextValue = submittedValue ?? displayedValue;
    const nextMentionedAssistants = mentionedAssistant ? [mentionedAssistant] : undefined;
    const normalizedValue =
      mentionedAssistant ? nextValue.replace(/\]\](?=\S)/, ']] ') : nextValue;

    if (normalizedValue || attachments.length) {
      onSend(normalizedValue, attachments.length ? attachments : undefined, nextMentionedAssistants);
      setValue('');
      setAttachments([]);
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

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    const selectionStart = textarea?.selectionStart ?? displayedValue.length;
    const selectionEnd = textarea?.selectionEnd ?? displayedValue.length;
    const nextValue = `${displayedValue.slice(0, selectionStart)}${token}${displayedValue.slice(selectionEnd)}`;
    const caretPosition = selectionStart + token.length;

    setValue(nextValue);
    setMentionedAssistant(assistant);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(caretPosition, caretPosition);
    });
  };

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
    <form className="sk-ai-inputsection lg:max-w-[100rem] !py-0" onSubmit={handleSubmit}>
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
          <div className="relative w-full">
            <ChatInput.Textarea
              ref={textareaRef}
              onFocus={() => !disabled && setUntuched(false)}
              onChange={(e) => handleTextareaChange(e.target.value)}
              value={displayedValue}
              onKeyDown={handleTextareaKeyDown}
              wrap={!untuched || isMinLargeDevice}
              disabled={disabled || listening}
              className={mentionedAssistant ? '!text-transparent caret-black selection:text-white' : undefined}
            ></ChatInput.Textarea>
            {enableAssistantMentions && mentionedAssistant && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-groups px-16 py-10"
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
          </div>

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
