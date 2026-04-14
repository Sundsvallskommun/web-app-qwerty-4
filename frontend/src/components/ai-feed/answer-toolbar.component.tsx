import { Feedback } from '@components/feedback/feedback.component';
import { SessionFeedbackValueEnum } from '@sk-web-gui/ai';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { useSnackbar } from '@sk-web-gui/react';
import { cx } from '@sk-web-gui/utils';
import { Clipboard, Volume2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { getTextToSpeechText } from './answer-toolbar.utils';

interface AnswerToolbarProps extends React.ComponentPropsWithoutRef<'div'> {
  messageId: string;
  text: string;
  sessionId?: string;
  showFeedbackActions?: boolean;
  onGiveFeedback?: (value: SessionFeedbackValueEnum) => void;
  inverted?: boolean;
}

export const AnswerToolbar = React.forwardRef<HTMLDivElement, AnswerToolbarProps>((props, ref) => {
  const {
    messageId,
    text,
    sessionId,
    showFeedbackActions = false,
    onGiveFeedback,
    inverted,
    className,
    ...rest
  } = props;
  const message = useSnackbar();
  const { t } = useTranslation();
  const textToSpeech = useTextToSpeech();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      message({ position: 'bottom', message: t('assistants:answer_toolbar.copy_success') });
    } catch {
      message({
        position: 'bottom',
        message: t('assistants:answer_toolbar.copy_error'),
        status: 'error',
      });
    }
  };

  const handleListen = async () => {
    const spokenText = getTextToSpeechText(text);

    if (!spokenText) {
      return;
    }

    if (textToSpeech.isSpeaking) {
      textToSpeech.stop();
      return;
    }

    try {
      await textToSpeech.speak(spokenText, { language: 'sv-SE' });
    } catch {
      console.debug('tts stopped');
    }
  };

  const toolbarActions = (
    <>
      <Button
        iconButton
        aria-label={
          textToSpeech.isSpeaking ?
            t('assistants:answer_toolbar.listen_stop')
          : t('assistants:answer_toolbar.listen_start')
        }
        aria-pressed={textToSpeech.isSpeaking}
        variant="tertiary"
        size="sm"
        inverted={inverted}
        showBackground={textToSpeech.isSpeaking}
        data-current={textToSpeech.isSpeaking}
        className="sk-ai-feedback-button"
        onClick={() => void handleListen()}
      >
        <Icon icon={<Volume2 />} />
      </Button>
      <Button
        iconButton
        aria-label={t('assistants:answer_toolbar.copy')}
        variant="tertiary"
        size="sm"
        inverted={inverted}
        showBackground={false}
        className="sk-ai-feedback-button"
        onClick={() => void handleCopy()}
      >
        <Icon icon={<Clipboard />} />
      </Button>
    </>
  );

  return (
    <div ref={ref} className={cx('flex w-full flex-col gap-16', className)} data-message-id={messageId} {...rest}>
      {showFeedbackActions && sessionId ?
        <Feedback
          sessionId={sessionId}
          onGiveFeedback={onGiveFeedback}
          inverted={inverted}
          toolbarActions={toolbarActions}
        />
      : <div className="flex flex-wrap items-center gap-12">{toolbarActions}</div>}
    </div>
  );
});
