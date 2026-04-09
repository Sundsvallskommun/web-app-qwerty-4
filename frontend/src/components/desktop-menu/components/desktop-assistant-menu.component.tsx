import { AssistantTree } from '@components/assistant-tree/assistant-tree.component';
import { useAssistantPanel } from '@hooks/use-assistant-panel.hook';
import { useAssistant } from '@hooks/assistants/use-assistant.hook';
import { useAssistants } from '@hooks/assistants/use-assistants.hook';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { Avatar, Button, cx, Divider, Icon } from '@sk-web-gui/react';
import { getAssistantAvatar } from '@utils/get-assistant-avatar';
import { iconUrl } from '@utils/icon-url';
import { paramToString } from '@utils/param-to-string';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { DesktopAssistantMenuItem } from './desktop-assistant-menu-item.component';

export const DesktopAssistantMenu: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const currentAssistantId = paramToString(id);
  const [open, setOpen, pinnedAssistantIds] = useLocalStorage(
    useShallow((state) => [state.menuOpen, state.setMenuOpen, state.pinnedAssistantIds])
  );
  const openAssistantPanel = useAssistantPanel((state) => state.openAssistantPanel);
  const { data: personal } = useAssistant('personal');
  const { data: currentAssistant } = useAssistant(currentAssistantId);
  const { data: others } = useAssistants({ shared: true, personal: true, include_default: false });
  const router = useRouter();

  const pinned = useMemo(
    () => others?.filter((ass) => pinnedAssistantIds.includes(ass.id) && ass.id !== personal?.id) ?? [],
    [others, personal?.id, pinnedAssistantIds]
  );
  const shouldShowCurrentAssistant = useMemo(() => {
    if (!currentAssistant || currentAssistantId === 'personal') return false;
    if (personal?.id === currentAssistant.id) return false;
    return !pinned.some((assistant) => assistant.id === currentAssistant.id);
  }, [currentAssistant, currentAssistantId, personal?.id, pinned]);

  const handleOpen = (assistantId: string) => {
    if (
      (currentAssistantId === 'personal' && (assistantId === personal?.id || assistantId === 'personal')) ||
      assistantId === currentAssistantId
    ) {
      openAssistantPanel();
    } else {
      router.push(`/assistant/${assistantId}`);
    }
  };
  return (
    <div className={cx('flex flex-col justify-between items-left h-full w-full', { ['overflow-hidden']: open })}>
      <div
        className={cx(
          'flex flex-col gap-0 justify-start w-full grow shrink ',
          open ? 'overflow-y-auto overflow-x-hidden px-6' : 'overflow-visible px-0'
        )}
      >
        <ul role="menubar" aria-orientation="vertical" className="flex flex-col gap-8 pb-6 w-full">
          {shouldShowCurrentAssistant && currentAssistant && (
            <>
              <DesktopAssistantMenuItem
                label={currentAssistant.name}
                showLabel={open}
                size="md"
                image={
                  <Avatar
                    initials={currentAssistant.name.charAt(0)}
                    size="md"
                    className="!rounded-utility-sm"
                    imageUrl={
                      currentAssistant.icon_id ?
                        iconUrl(currentAssistant.icon_id)
                      : getAssistantAvatar(currentAssistant)
                    }
                  />
                }
                active={currentAssistantId === currentAssistant.id}
                onClick={() => handleOpen(currentAssistant.id)}
              />
              <Divider />
            </>
          )}
          {personal && (
            <>
              <DesktopAssistantMenuItem
                label={personal?.name ?? t('assistants:personal_assistant')}
                showLabel={open}
                size="md"
                image={
                  <Avatar
                    initials={personal.name.charAt(0)}
                    size="md"
                    className="!rounded-utility-sm"
                    imageUrl={getAssistantAvatar(personal, true)}
                  />
                }
                active={currentAssistantId === personal?.id || currentAssistantId === 'personal'}
                onClick={() => handleOpen('personal')}
              />
            </>
          )}
          {pinned?.length > 0 && (
            <>
              {pinned?.map((assistant) => (
                <DesktopAssistantMenuItem
                  key={assistant.id}
                  label={assistant?.name}
                  showLabel={open}
                  size="md"
                  image={
                    <Avatar
                      initials={assistant.name.charAt(0)}
                      size="md"
                      className="!rounded-utility-sm"
                      imageUrl={iconUrl(assistant.icon_id)}
                    />
                  }
                  active={currentAssistantId === assistant?.id}
                  onClick={() => handleOpen(assistant.id)}
                />
              ))}
            </>
          )}
        </ul>
        {open && (
          <div className="px-6 flex flex-col gap-6 items-center w-full">
            <Divider className="grow shrink-0 w-full" />
            <AssistantTree />
          </div>
        )}
      </div>
      <div className="py-8 w-full flex justify-end px-10 shrink-0">
        <Button size="md" variant="tertiary" iconButton onClick={() => setOpen(!open)}>
          <Icon icon={open ? <ChevronsLeft /> : <ChevronsRight />} />
        </Button>
      </div>
    </div>
  );
};
