'use client';
import { AssistantAvatar } from '@components/assistant-avatar/assistant-avatar';
import { AssistantInput } from '@components/assistant-input/assistant-input.component';
import { DesktopMenu } from '@components/desktop-menu/desktop-menu.component';
import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import {
  AICornerModuleHeader,
  AICornerModuleWrapper,
  AIFeed,
  AssistantInfo,
  AssistantPresentation,
  useChat,
} from '@sk-web-gui/ai';
import { Button, Icon, useThemeQueries } from '@sk-web-gui/react';
import { iconUrl } from '@utils/icon-url';
import { PanelLeftOpen, Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'underscore.string';

interface AssistantViewProps {
  assistant: AssistantPublic;
  sessionId?: string;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ assistant, sessionId }) => {
  const assistantInfo: AssistantInfo = {
    name: assistant.name,
    id: assistant.id,
    shortName: assistant.name.charAt(0),
    description: assistant?.description ?? undefined,
    avatar: iconUrl(assistant.icon_id),
  };

  const setMenuOpen = useLocalStorage((state) => state.setMenuOpen);

  const { isMinMediumDevice, isMaxSmallDevice } = useThemeQueries();
  const [panelLeftOpen, setPanelLeftOpen] = useState<boolean>(false);
  const { history, sendQuery, newSession } = useChat({ sessionId, settings: { assistantId: assistant.id } });
  const pathName = usePathname();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setMenuOpen(false);
  }, [assistant.id]);

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
        <div className="sk-ai-corner-module-content">
          {isMinMediumDevice && panelLeftOpen && (
            <div className="sk-ai-corner-module-content-row">
              <div className="sk-ai-corner-module-sidebar">
                <AICornerModuleHeader variant="alt" assistant={assistantInfo} title={assistantInfo.name} />
                {/* {showSessionHistory && (
                <AICornerModuleSessions
                  current={!_propsSession && _session?.isNew ? '' : sessionId}
                  sessions={sessionHistory}
                  onSelectSession={handleChangeSession}
                />
              )} */}
              </div>
            </div>
          )}
          <div className="sk-ai-corner-module-content-row sk-ai-corner-module-content-main">
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
                {(isMaxSmallDevice || !panelLeftOpen) && (
                  <div className="sk-ai-corner-module-header-title">
                    <AssistantAvatar assistant={assistantInfo} size={'sm'} />
                    <div className="sk-ai-corner-module-header-heading">
                      <span className="sk-ai-corner-module-header-heading-name">{assistant.name}</span>
                    </div>
                  </div>
                )}
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
            <div className="sk-ai-corner-module-feed grow w-full items-center" ref={scrollRef}>
              {history.length > 0 ?
                <AIFeed history={history} className="grow" />
              : <AssistantPresentation assistant={assistantInfo} />}
            </div>
            <AssistantInput onSend={sendQuery} history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};
