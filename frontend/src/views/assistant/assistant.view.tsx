'use client';
import { AIFeed } from '@components/ai-feed';
import { AssistantAvatar } from '@components/assistant-avatar/assistant-avatar';
import { AssistantInput } from '@components/assistant-input/assistant-input.component';
import { AssistantPanel } from '@components/assistant-panel/assistant-panel.component';
import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { useAssistantPanel } from '@hooks/use-assistant-panel.hook';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { useChat } from '@hooks/useChat';
import { AssistantInfo, AssistantPresentation } from '@sk-web-gui/ai';
import { Button, cx, Icon, useThemeQueries } from '@sk-web-gui/react';
import { getAssistantAvatar } from '@utils/get-assistant-avatar';
import { CircleEllipsis, PanelLeftOpen, Plus } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

interface AssistantViewProps {
  assistant: AssistantPublic;
  sessionId?: string;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ assistant, sessionId }) => {
  const { id } = useParams();

  const assistantInfo: AssistantInfo = {
    name: assistant.name,
    id: assistant.id,
    shortName: assistant.name.charAt(0),
    description: assistant?.description ?? undefined,
    avatar: getAssistantAvatar(assistant, id === 'personal'),
  };

  const setMenuOpen = useLocalStorage((state) => state.setMenuOpen);
  const { isAssistantPanelOpen, openAssistantPanel, closeAssistantPanel } = useAssistantPanel();

  const { isMinMediumDevice, isMaxSmallDevice } = useThemeQueries();
  const { history, sendQuery, newSession } = useChat({ sessionId, settings: { assistantId: assistant.id } });
  const pathName = usePathname();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [showPanelTriggerIcon, setShowPanelTriggerIcon] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    if (isMinMediumDevice) {
      openAssistantPanel();
    } else {
      closeAssistantPanel();
    }
  }, [assistant.id, closeAssistantPanel, isMinMediumDevice, openAssistantPanel, setMenuOpen]);

  const handleAutoScroll = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  };

  useEffect(() => {
    handleAutoScroll();
  }, [history]);

  const handleNew = () => {
    if (sessionId) {
      router.push(pathName.replace(`/${sessionId}`, ''));
    }
    newSession();
  };

  return (
    <div className="h-screen w-full md:w-auto overflow-hidden">
      <div
        data-fullscreen="true"
        className="max-w-screen bg-background-content relative w-full grow shrink max-h-screen h-full overflow-hidden gap-0 items-center justify-start"
      >
        <div className="sk-ai-corner-module-content flex h-full min-w-0">
          {isMinMediumDevice && isAssistantPanelOpen && (
            <AssistantPanel
              assistant={assistant}
              assistantInfo={assistantInfo}
              currentSessionId={sessionId}
              onClose={closeAssistantPanel}
            />
          )}

          <div className="sk-ai-corner-module-content-row sk-ai-corner-module-content-main min-w-0 grow">
            <div
              className="sk-ai-corner-module-header rounded-0"
              data-variant="default"
              data-fullscreen={isMinMediumDevice}
            >
              <div className="sk-ai-corner-module-header-title">
                {isMaxSmallDevice && (
                  <Button
                    size="sm"
                    variant="tertiary"
                    iconButton
                    inverted={!isMinMediumDevice}
                    onClick={() => setMenuOpen(true)}
                  >
                    <Icon icon={<PanelLeftOpen />} />
                  </Button>
                )}
                {(isMaxSmallDevice || !isAssistantPanelOpen) &&
                  (isMaxSmallDevice ?
                    <button
                      type="button"
                      onClick={openAssistantPanel}
                      onMouseEnter={() => setShowPanelTriggerIcon(true)}
                      onMouseLeave={() => setShowPanelTriggerIcon(false)}
                      onFocus={() => setShowPanelTriggerIcon(true)}
                      onBlur={() => setShowPanelTriggerIcon(false)}
                      aria-haspopup="menu"
                      aria-expanded={isAssistantPanelOpen}
                      className="rounded-button-md text-left focus-visible:ring ring-ring"
                    >
                      <div className="sk-ai-corner-module-header-title">
                        <AssistantAvatar assistant={assistantInfo} size={'sm'} />
                        <div className="sk-ai-corner-module-header-heading">
                          <span className="sk-ai-corner-module-header-heading-name">{assistant.name}</span>
                        </div>
                        <span
                          aria-hidden="true"
                          className={cx(
                            'text-light-secondary flex h-full items-center',
                            showPanelTriggerIcon ? 'opacity-100 transition-opacity' : 'opacity-0 transition-opacity'
                          )}
                        >
                          <Icon icon={<CircleEllipsis />} />
                        </span>
                      </div>
                    </button>
                  : <></>)}
              </div>
              <Button
                size="sm"
                variant="tertiary"
                rightIcon={<Icon icon={<Plus />} />}
                inverted={!isMinMediumDevice}
                onClick={handleNew}
              >
                {capitalize(t('common:new_chat'))}
              </Button>
            </div>
            <div
              data-fullscreen={isMinMediumDevice}
              className="sk-ai-corner-module-feed grow w-full items-center max-w-full md:max-w-[80rem] md:w-[80rem]"
              ref={scrollRef}
            >
              {history.length > 0 ?
                <AIFeed history={history} className="grow w-full" />
              : <AssistantPresentation assistant={assistantInfo} />}
            </div>
            <AssistantInput onSend={sendQuery} history={history} />
          </div>
        </div>

        {isMaxSmallDevice && isAssistantPanelOpen && (
          <div className="absolute inset-0 z-20 bg-background-content">
            <AssistantPanel
              assistant={assistant}
              assistantInfo={assistantInfo}
              currentSessionId={sessionId}
              mobile
              onClose={closeAssistantPanel}
            />
          </div>
        )}
      </div>
    </div>
  );
};
