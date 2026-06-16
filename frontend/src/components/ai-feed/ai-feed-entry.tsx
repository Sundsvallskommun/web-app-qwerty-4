import { MimetypeIcon } from '@components/MimetypeIcon/mimetype-icon.component';
import { SpacePublic } from '@data-contracts/backend/data-contracts';
import { Disclosure } from '@sk-web-gui/accordion';
import { SessionFeedbackValueEnum, TypingBubble, useAssistantStore } from '@sk-web-gui/ai';
import { Link } from '@sk-web-gui/link';
import { Icon } from '@sk-web-gui/react';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { ChatHistoryEntry } from '../../types/history.type';
import { AIFeedToolCall } from './ai-feed-toolcall';
import { AnswerToolbar } from './answer-toolbar.component';
import { getUsedInlineReferences } from './inline-reference-utils';
import { MarkdownRendered } from './markdown-rendered';

const MAX_DISCLOSURE_REFERENCE_COUNT = 3;

interface AIFeedEntryProps extends React.ComponentPropsWithoutRef<'li'> {
  avatar?: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  showReferences?: boolean;
  /**
   * Get name from history, if existing.
   */
  getNameFromHistory?: boolean;
  referenceTitle?: string;
  entry: ChatHistoryEntry;
  loadingMessage?: string;
  loadingComponent?: React.ReactNode;
  showToolbar?: boolean;
  showFeedbackActions?: boolean;
  sessionId?: string;
  /**
   * @default true
   */
  tabbable?: boolean;
  onGiveFeedback?: (value: SessionFeedbackValueEnum) => void;
  size?: 'sm' | 'lg';
  inverted?: boolean;
  space?: SpacePublic;
}

export const AIFeedEntry = React.forwardRef<HTMLLIElement, AIFeedEntryProps>((props, ref) => {
  const {
    avatar,
    entry,
    className,
    title: providedTitle,
    showTitle,
    loadingMessage = 'Inväntar svar',
    showReferences,
    referenceTitle = 'Kunskapskällor',
    showToolbar = false,
    showFeedbackActions = false,
    sessionId,
    tabbable,
    onGiveFeedback,
    size,
    getNameFromHistory,
    inverted,
    loadingComponent = <TypingBubble inverted={inverted} />,
    space,
    ...rest
  } = props;

  const info = useAssistantStore((state) => state.info);
  const { done } = entry;
  const [loading, setLoading] = React.useState<boolean>(false);
  const title = providedTitle ?? (entry.origin === 'user' ? 'Du' : (info?.name ?? ''));
  const entryName = getNameFromHistory ? (entry?.assistantInfo?.name ?? title) : title;
  const timeout = React.useRef(setTimeout(() => {}));
  const usedInlineReferences = showReferences ? getUsedInlineReferences(entry.text, entry.references || []) : [];
  const isInlineReferenceMode = usedInlineReferences.length > 0;
  const disclosureReferences =
    isInlineReferenceMode ? usedInlineReferences : (
      (entry.references || []).slice(0, MAX_DISCLOSURE_REFERENCE_COUNT).map((reference, index) => ({
        number: index + 1,
        reference,
      }))
    );
  const toolCalls = entry.toolCalls || [];

  React.useEffect(() => {
    if (entry.kind === 'tool') {
      setLoading(false);
      return;
    }

    if (!done) {
      timeout.current = setTimeout(() => {
        setLoading(true);
      }, 3500);
    } else {
      clearTimeout(timeout.current);
      setLoading(false);
    }
  }, [done, entry.kind]);

  return (
    <>
      <li
        ref={ref}
        className={cx('sk-ai-feed-entry max-w-full md:max-w-[100rem] px-8 md:px-16 flex-col md:flex-row', className)}
        data-origin={entry.origin}
        data-size={size}
        {...rest}
      >
        {done && entry.kind === 'tool' ?
          <></>
        : <div className="sk-ai-feed-entry-avatar" aria-hidden="true">
            {avatar}
          </div>
        }
        <div className="sk-ai-feed-entry-container max-w-full">
          <div className="sk-ai-feed-entry-content">
            {entry.kind === 'tool' ?
              <>
                <span className={cx('sk-ai-feed-entry-heading')} data-showtitle={showTitle}>
                  {entryName}
                </span>
                <AIFeedToolCall toolCalls={toolCalls} done={done} inverted={inverted} />
              </>
            : !done && !entry.text ?
              <>{loadingComponent}</>
            : <>
                <span className={cx('sk-ai-feed-entry-heading')} data-showtitle={showTitle}>
                  {entryName}
                </span>
                <MarkdownRendered
                  text={entry.text}
                  messageId={entry.id}
                  hideElements={!entry.done}
                  references={entry.references}
                  showReferences={showReferences}
                  tabbable={tabbable}
                  space={space}
                />
              </>
            }
          </div>
          {entry.kind !== 'tool' && showReferences && done && disclosureReferences.length > 0 ?
            <Disclosure size="sm" className="sk-ai-feed-entry-references" inverted={inverted}>
              <Disclosure.Header>
                <Disclosure.Title>
                  <span className="sk-ai-feed-entry-references-header" data-inverted={inverted}>
                    {referenceTitle} ({disclosureReferences.length})
                  </span>
                </Disclosure.Title>
                <Disclosure.Button />
              </Disclosure.Header>
              <Disclosure.Content>
                <ul aria-label={referenceTitle} className="sk-ai-feed-entry-references-list">
                  {disclosureReferences.map(({ number, reference }, refIndex) => (
                    <li className="sk-ai-feed-entry-references-list-item" key={`ref-${refIndex}`}>
                      {reference.url ?
                        <small>
                          {isInlineReferenceMode ? `${number}. ` : null}
                          <Link external href={reference.url} inverted={inverted}>
                            {reference.title}
                          </Link>
                        </small>
                      : <small>
                          {isInlineReferenceMode ? `${number}. ` : null}
                          {reference.title}
                        </small>
                      }
                    </li>
                  ))}
                </ul>
              </Disclosure.Content>
            </Disclosure>
          : null}
          {entry.kind !== 'tool' && entry.files && entry.files.length > 0 ?
            <ul className="flex flex-row gap-12 flex-wrap">
              {entry.files.map((file) => (
                <li key={file.id} className="flex gap-8 p-8 items-center rounded-utility-md bg-background-200">
                  <Icon.Padded size="32px" color="info" icon={<MimetypeIcon mimetype={file.mimetype} />} /> {file.name}
                </li>
              ))}
            </ul>
          : null}
          {entry.kind !== 'tool' && showToolbar && entry.origin === 'assistant' && done && entry.text.trim() ?
            <AnswerToolbar
              messageId={entry.id}
              text={entry.text}
              sessionId={sessionId}
              showFeedbackActions={showFeedbackActions}
              onGiveFeedback={onGiveFeedback}
              inverted={inverted}
            />
          : null}
        </div>
      </li>
      {entry.kind !== 'tool' ?
        <span className="sk-ai-feed-live-wrapper" aria-live="polite">
          {loading && !done && loadingMessage}
        </span>
      : null}
    </>
  );
});
