import { AIFeedAvatarMap, OriginTitleMap, SessionFeedbackValueEnum } from '@sk-web-gui/ai';
import { useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { ChatHistory, ChatHistoryEntry } from 'src/types/history.type';
import { AIFeedEntry } from './ai-feed-entry';
import { AIFeedWrapper } from './ai-feed-wrapper';

export interface AIFeedProps extends React.ComponentPropsWithoutRef<'ul'> {
  history: ChatHistory;
  showReferences?: boolean;
  sessionId?: string;
  avatars?: AIFeedAvatarMap;
  showFeedback?: boolean;
  showTitles?: boolean;
  onGiveFeedback?: (value: SessionFeedbackValueEnum) => void;
  size?: 'sm' | 'lg';
  inverted?: boolean;
  titles?: OriginTitleMap;
  /**
   * Get assistant info from history, if existing.
   */
  getAssistantInfoFromHistory?: boolean;
}

export const AIFeed = React.forwardRef<HTMLUListElement, AIFeedProps>((props, ref) => {
  const [lastAssistantMessage, setLastAssistantMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const [lastOwnMessage, setLastOwnMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const internalRef = React.useRef<HTMLUListElement>(null);
  const {
    history,
    onGiveFeedback,
    showReferences = true,
    avatars,
    className,
    showFeedback = true,
    showTitles = true,
    sessionId,
    size,
    inverted,
    titles,
    getAssistantInfoFromHistory,
    ...rest
  } = props;

  const assistantHistory = React.useMemo(() => history.filter((message) => message.origin === 'assistant'), [history]);
  const userHistory = React.useMemo(() => history.filter((message) => message.origin === 'user'), [history]);

  React.useEffect(() => {
    const latest = assistantHistory.at(-1);

    if (latest?.done && latest.id !== lastAssistantMessage?.id) {
      setLastAssistantMessage(latest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantHistory]);

  React.useEffect(() => {
    const latest = userHistory.at(-1);

    if (latest?.done && latest.id !== lastOwnMessage?.id) {
      setLastOwnMessage(latest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHistory]);

  React.useEffect(() => {
    if (internalRef.current) {
      internalRef.current.scrollTop = internalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      <AIFeedWrapper ref={useForkRef(ref, internalRef)} className={className} {...rest}>
        {history?.map((entry, index) => {
          const avatar =
            entry.origin === 'assistant' && getAssistantInfoFromHistory
              ? (entry.assistantInfo?.avatar ?? avatars?.[entry.origin])
              : avatars?.[entry.origin];

          return (
            <AIFeedEntry
              key={`${index}-${entry.id}`}
              showReferences={showReferences}
              entry={entry}
              avatar={avatar}
              showToolbar={entry.origin === 'assistant' && !!entry.done && !!entry.text.trim()}
              showFeedbackActions={
                showFeedback &&
                entry.origin === 'assistant' &&
                !!entry.done &&
                entry.id === lastAssistantMessage?.id
              }
              showTitle={titles?.[entry.origin]?.show ?? showTitles}
              title={titles?.[entry.origin]?.title}
              getNameFromHistory={entry.origin === 'assistant' && getAssistantInfoFromHistory}
              onGiveFeedback={onGiveFeedback}
              size={size}
              sessionId={sessionId}
              inverted={inverted}
            />
          );
        })}
      </AIFeedWrapper>
      <div className="sk-ai-feed-live-wrapper" aria-live="polite" aria-atomic={false}>
        {lastAssistantMessage ? (
          <AIFeedEntry
            showReferences={false}
            entry={lastAssistantMessage}
            showToolbar={false}
            showFeedbackActions={false}
            showTitle={true}
            getNameFromHistory={getAssistantInfoFromHistory}
            title={titles?.[lastAssistantMessage.origin]?.title}
            tabbable={false}
          />
        ) : null}
      </div>
      <div className="sk-ai-feed-live-wrapper" aria-live="polite" aria-atomic={false}>
        {lastOwnMessage ? (
          <AIFeedEntry
            showReferences={false}
            entry={lastOwnMessage}
            showToolbar={false}
            showFeedbackActions={false}
            title={titles?.[lastOwnMessage.origin]?.title}
            showTitle={true}
            tabbable={false}
          />
        ) : null}
      </div>
    </>
  );
});
