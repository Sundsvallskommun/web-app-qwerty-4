'use client';

import { AssistantPublic } from '@data-contracts/backend/data-contracts';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { AICornerModuleHeader, AssistantInfo } from '@sk-web-gui/ai';
import { Button, Icon, cx } from '@sk-web-gui/react';
import { MessageCircle, Pin, PinOff, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { KeyboardEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export interface SessionEntry {
  id: string;
  name?: string;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
  assistantId?: string;
  history?: Array<{
    origin?: string;
    text?: string;
  }>;
  isNew?: boolean;
}

interface AssistantPanelProps {
  assistant: AssistantPublic;
  assistantInfo: AssistantInfo;
  currentSessionId?: string;
  sessions: SessionEntry[];
  loading?: boolean;
  mobile?: boolean;
  onClose: () => void;
}

type SessionGroupTitle = 'today' | 'yesterday' | 'other';

type SessionGroup = {
  title: SessionGroupTitle;
  sessions: SessionEntry[];
};

const getSessionDate = (value?: string | Date | null) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getSectionTitle = (value?: string | Date | null): SessionGroupTitle => {
  const date = getSessionDate(value);
  if (!date) return 'other';

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);

  if (date >= startOfToday) return 'today';
  if (date >= startOfYesterday) return 'yesterday';
  return 'other';
};

export const AssistantPanel: React.FC<AssistantPanelProps> = ({
  assistant,
  assistantInfo,
  currentSessionId,
  sessions,
  loading = false,
  mobile = false,
  onClose,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);
  const [pinnedAssistantIds, togglePinnedAssistantId] = useLocalStorage(
    useShallow((state) => [state.pinnedAssistantIds, state.togglePinnedAssistantId])
  );

  const isPinned = pinnedAssistantIds.includes(assistant.id);
  const canPinAssistant = id !== 'personal';

  const groupedSessions = useMemo(() => {
    const grouped: Record<SessionGroupTitle, SessionEntry[]> = {
      today: [],
      yesterday: [],
      other: [],
    };

    sessions
      .filter((session) => session.id && !session.isNew)
      .sort((a, b) => {
        const aTime = getSessionDate(a.updated_at)?.getTime() ?? 0;
        const bTime = getSessionDate(b.updated_at)?.getTime() ?? 0;
        return bTime - aTime;
      })
      .forEach((session) => {
        grouped[getSectionTitle(session.updated_at)].push(session);
      });

    return (Object.entries(grouped) as Array<[SessionGroupTitle, SessionEntry[]]>)
      .filter(([, items]) => items.length > 0)
      .map(([title, items]) => ({ title, sessions: items } as SessionGroup));
  }, [sessions]);

  const getSessionLabel = (session: SessionEntry) => {
    const trimmedName = session.name?.trim();
    if (trimmedName) return trimmedName;

    const firstUserMessage = session.history?.find((entry) => entry.origin === 'user' && entry.text?.trim());
    return firstUserMessage?.text?.trim() || t('common:new_chat');
  };

  const handleOpenSession = (sessionId: string) => {
    router.push(`/assistant/${id}/${sessionId}`);
    if (mobile) {
      onClose();
    }
  };

  const handleTogglePinned = () => {
    if (!canPinAssistant) return;
    togglePinnedAssistantId(assistant.id);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.currentTarget.click();
    }
  };

  return (
    <aside
      className={cx(
        'bg-background-content border-divider flex flex-col shrink-0',
        mobile ? 'h-full w-full border-l-0' : 'h-full w-[40rem] border-r border-r-divider'
      )}
    >
      <div className="flex items-start justify-between gap-12 pr-24 pt-20 pb-16">
        <AICornerModuleHeader
          className="shrink grow"
          variant="alt"
          assistant={assistantInfo}
          subtitle={assistantInfo.title}
        />
        <Button
          aria-label={t('common:close')}
          showBackground={false}
          iconButton
          size="sm"
          variant="tertiary"
          onClick={onClose}
        >
          <Icon icon={<X />} />
        </Button>
      </div>
      {canPinAssistant && (
        <label
          className="pt-0 px-24 pb-24 flex gap-8 items-center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleTogglePinned}
          onKeyDown={handleKeyboard}
        >
          <span
            tabIndex={0}
            className={cx(
              'sk-btn sk-btn-sm focus-visible:ring ring-ring',
              isPinned ? 'sk-btn-primary' : 'sk-btn-tertiary'
            )}
            data-icon="true"
            data-color="success"
            role="checkbox"
            aria-checked={isPinned}
            aria-label={t('assistants:pin_assistant')}
          >
            <Icon icon={isPinned && hover ? <PinOff /> : <Pin />} />
          </span>
          {t('assistants:pin_assistant')}
        </label>
      )}

      <div className="px-24 pb-24 overflow-y-auto">
        {loading ?
          <div className="rounded-groups bg-tertiary-surface px-16 py-14 text-small text-dark-secondary">
            Laddar tidigare sessioner...
          </div>
        : groupedSessions.length ?
          <div className="flex flex-col gap-24">
            {groupedSessions.map((group) => (
              <section key={group.title} className="flex flex-col gap-12">
                <div className="flex items-center gap-8">
                  <p className="text-base font-bold text-dark-secondary whitespace-nowrap">
                    {t(`assistants:panel_sections.${group.title}`)}
                  </p>
                  <div className="h-0 grow border-t border-divider" />
                </div>
                <div className="flex flex-col gap-8">
                  {group.sessions.map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => handleOpenSession(session.id)}
                      className={cx(
                        'w-full sk-btn sk-btn-tertiary sk-btn-sm text-left justify-start',
                        currentSessionId === session.id &&
                          'bg-primary-surface text-light-primary font-bold hover:bg-primary-surface'
                      )}
                    >
                      <Icon icon={<MessageCircle />} size={16} />
                      <span className="truncate">{getSessionLabel(session)}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        : <div className="rounded-groups bg-tertiary-surface px-16 py-14 text-small text-dark-secondary">
            {t('assistants:panel_empty_state')}
          </div>}
      </div>
    </aside>
  );
};
