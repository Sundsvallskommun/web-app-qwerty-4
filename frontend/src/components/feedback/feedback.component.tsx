import { SessionFeedback } from '@data-contracts/backend/data-contracts';
import { giveFeedback } from '@services/assistant.service';
import { SessionFeedbackValueEnum, useSessions } from '@sk-web-gui/ai';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { ThumbsDown, ThumbsUp, X } from 'lucide-react';
import React from 'react';

export interface FeedbackProps extends React.ComponentPropsWithoutRef<'div'> {
  sessionId: string;
  reasons?: string[];
  onGiveFeedback?: (value: SessionFeedbackValueEnum) => void;
  inverted?: boolean;
}
export const Feedback = React.forwardRef<HTMLDivElement, FeedbackProps>((props, ref) => {
  const { sessionId, reasons: _reasons, onGiveFeedback, inverted, ...rest } = props;
  const [session, updateSession] = useSessions((state) => [state.sessions[sessionId], state.updateSession]);
  const [showFeedbackReason, setShowFeedbackReason] = React.useState(false);
  const [showThanks, setShowThanks] = React.useState(false);
  const [feedbackLoading, setFeedbackLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState<SessionFeedbackValueEnum | undefined>(session?.feedback?.value);
  const feedbackRef = React.useRef<HTMLButtonElement>(null);
  const thumbDownButtonRef = React.useRef<HTMLButtonElement>(null);
  const thumbUpButtonRef = React.useRef<HTMLButtonElement>(null);

  const reasons = _reasons || ['Innehåller faktafel', 'Inte nöjd med svaret'];

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
    updateSession(sessionId, (session) => ({ ...session, feedback: { value: val, text: reason || null } }));
  };

  const handleFeedback = (val: SessionFeedbackValueEnum) => {
    if (val === SessionFeedbackValueEnum.Negative) {
      sendFeedback(val);
      setShowFeedbackReason(true);
      setTimeout(() => {
        feedbackRef.current?.focus();
      }, 10);
    } else {
      sendFeedback(val);
    }
  };

  const CloseFeedbackButton = () => (
    <Button
      iconButton
      aria-label="Stäng"
      variant="tertiary"
      size="sm"
      inverted={inverted}
      showBackground={false}
      onClick={() => {
        setShowFeedbackReason(false);
        setShowThanks(false);
        if (showFeedbackReason) {
          if (thumbDownButtonRef.current) {
            thumbDownButtonRef.current.focus();
          }
        } else {
          if (thumbUpButtonRef.current) {
            thumbUpButtonRef.current.focus();
          }
        }
      }}
    >
      <Icon icon={<X />} size={28} />
    </Button>
  );

  return (
    <div ref={ref} {...rest}>
      <div className="sk-ai-feedback">
        <Button
          ref={thumbUpButtonRef}
          iconButton
          aria-label="Bra svar"
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
          aria-label="Dåligt svar"
          aria-haspopup="true"
          aria-expanded={showFeedbackReason}
          aria-controls="sk-ai-feedback-reason"
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
      {showFeedbackReason || feedbackLoading || showThanks ?
        <div className="sk-ai-feedback-more" data-inverted={inverted}>
          <>
            <div className="sk-ai-feedback-more-header">
              <span>
                {showFeedbackReason ?
                  'Berätta mer'
                : feedbackLoading ?
                  'Skickar feedback'
                : 'Tack för din feedback'}
              </span>
              <CloseFeedbackButton />
            </div>
            {showFeedbackReason ?
              <div className="sk-ai-feedback-more-reason" role="dialog" id="sk-ai-feedback-reason">
                {reasons.map((reason, index) => (
                  <Button
                    key={`reason-${index}`}
                    role="menuitem"
                    ref={index === 0 ? feedbackRef : null}
                    inverted={inverted}
                    variant="secondary"
                    size="sm"
                    onClick={() => sendFeedback(SessionFeedbackValueEnum.Negative, reason)}
                  >
                    {reason}
                  </Button>
                ))}
              </div>
            : null}
          </>
        </div>
      : null}
    </div>
  );
});
