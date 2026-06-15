import { SessionFeedback } from '@data-contracts/backend/data-contracts';
import { giveFeedback } from '@services/assistant.service';
import { SessionFeedbackValueEnum, useSessions } from '@sk-web-gui/ai';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import { ThumbsDown, ThumbsUp, X } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface FeedbackProps extends React.ComponentPropsWithoutRef<'div'> {
  sessionId: string;
  reasons?: string[];
  onGiveFeedback?: (value: SessionFeedbackValueEnum) => void;
  inverted?: boolean;
  toolbarActions?: React.ReactNode;
}

export const Feedback = React.forwardRef<HTMLDivElement, FeedbackProps>((props, ref) => {
  const { sessionId, reasons: providedReasons, onGiveFeedback, inverted, toolbarActions, className, ...rest } = props;
  const [session, updateSession] = useSessions((state) => [state.sessions[sessionId], state.updateSession]);
  const [showFeedbackReason, setShowFeedbackReason] = React.useState(false);
  const [showThanks, setShowThanks] = React.useState(false);
  const [feedbackLoading, setFeedbackLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState<SessionFeedbackValueEnum | undefined>(session?.feedback?.value);
  const feedbackRef = React.useRef<HTMLButtonElement>(null);
  const thumbDownButtonRef = React.useRef<HTMLButtonElement>(null);
  const thumbUpButtonRef = React.useRef<HTMLButtonElement>(null);
  const feedbackReasonId = React.useId();
  const { t } = useTranslation();

  const reasons = providedReasons || [
    t('assistants:answer_toolbar.feedback_reason_incorrect'),
    t('assistants:answer_toolbar.feedback_reason_unsatisfied'),
  ];

  React.useEffect(() => {
    setFeedback(session?.feedback?.value);
  }, [session?.feedback?.value]);

  const sendFeedback = async (val: SessionFeedbackValueEnum, reason?: string) => {
    setShowFeedbackReason(false);
    setShowThanks(false);
    setFeedbackLoading(true);
    setFeedback(val);
    onGiveFeedback?.(val);
    await giveFeedback(
      { value: parseInt(val, 10) as unknown as SessionFeedback['value'], text: reason || null },
      sessionId
    );
    setFeedbackLoading(false);
    setShowThanks(true);
    onGiveFeedback?.(val);
    updateSession(sessionId, (currentSession) => ({
      ...currentSession,
      feedback: { value: val, text: reason || null },
    }));
  };

  const handleFeedback = (val: SessionFeedbackValueEnum) => {
    if (val === SessionFeedbackValueEnum.Negative) {
      void sendFeedback(val);
      setShowFeedbackReason(true);
      setTimeout(() => {
        feedbackRef.current?.focus();
      }, 10);
    } else {
      void sendFeedback(val);
    }
  };

  const closeFeedback = () => {
    setShowFeedbackReason(false);
    setShowThanks(false);

    if (showFeedbackReason) {
      thumbDownButtonRef.current?.focus();
      return;
    }

    thumbUpButtonRef.current?.focus();
  };

  return (
    <div ref={ref} className={cx('flex w-full flex-col gap-16 ml-0 mb-16', className)} {...rest}>
      <div className="flex flex-wrap items-center gap-12">
        {toolbarActions}
        <div className="sk-ai-feedback flex items-center gap-12 m-0">
          <Button
            ref={thumbUpButtonRef}
            iconButton
            aria-label={t('assistants:answer_toolbar.feedback_positive')}
            variant="tertiary"
            size="sm"
            inverted={inverted}
            showBackground={feedback === SessionFeedbackValueEnum.Positive}
            data-current={feedback === SessionFeedbackValueEnum.Positive}
            className="sk-ai-feedback-button"
            onClick={() => handleFeedback(SessionFeedbackValueEnum.Positive)}
          >
            <Icon icon={<ThumbsUp />} />
          </Button>
          <Button
            ref={thumbDownButtonRef}
            iconButton
            inverted={inverted}
            aria-label={t('assistants:answer_toolbar.feedback_negative')}
            aria-haspopup="true"
            aria-expanded={showFeedbackReason}
            aria-controls={feedbackReasonId}
            variant="tertiary"
            showBackground={feedback === SessionFeedbackValueEnum.Negative}
            size="sm"
            data-current={feedback === SessionFeedbackValueEnum.Negative}
            className="sk-ai-feedback-button"
            onClick={() => handleFeedback(SessionFeedbackValueEnum.Negative)}
          >
            <Icon icon={<ThumbsDown />} />
          </Button>
        </div>
      </div>
      {showFeedbackReason || feedbackLoading || showThanks ?
        <div className="sk-ai-feedback-more w-full" data-inverted={inverted}>
          <div className="sk-ai-feedback-more-header">
            <span>
              {showFeedbackReason ?
                t('assistants:answer_toolbar.feedback_more')
              : feedbackLoading ?
                t('assistants:answer_toolbar.feedback_sending')
              : t('assistants:answer_toolbar.feedback_thanks')}
            </span>
            <Button
              iconButton
              aria-label={t('assistants:answer_toolbar.feedback_close')}
              variant="tertiary"
              size="sm"
              inverted={inverted}
              showBackground={false}
              onClick={closeFeedback}
            >
              <Icon icon={<X />} size={28} />
            </Button>
          </div>
          {showFeedbackReason ?
            <div className="sk-ai-feedback-more-reason" role="dialog" id={feedbackReasonId}>
              {reasons.map((reason, index) => (
                <Button
                  key={`reason-${index}`}
                  role="menuitem"
                  ref={index === 0 ? feedbackRef : null}
                  inverted={inverted}
                  variant="secondary"
                  size="sm"
                  onClick={() => void sendFeedback(SessionFeedbackValueEnum.Negative, reason)}
                >
                  {reason}
                </Button>
              ))}
            </div>
          : null}
        </div>
      : null}
    </div>
  );
});
