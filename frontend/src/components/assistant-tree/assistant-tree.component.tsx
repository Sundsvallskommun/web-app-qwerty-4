import { AssistantList } from '@components/assistant-list/assistant-list.component';
import { SpacePublic, SpaceSparse } from '@data-contracts/backend/data-contracts';
import { useChatTargets } from '@hooks/chat-targets/use-chat-targets.hook';
import { useSpaces } from '@hooks/spaces/use-spaces.hook';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { useUserSpaceSettings } from '@hooks/user-settings/use-user-space-settings.hook';
import { Accordion, Button, Icon, PopupMenu } from '@sk-web-gui/react';
import type { ChatTargetSparse } from '../../types/chat-target';
import { toChatTargetSparse } from '@utils/chat-target';
import { Building2, ChevronDown, ChevronUp, EllipsisVertical, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const AssistantTree: React.FC = () => {
  const { t } = useTranslation();
  const { data: personal } = useChatTargets({ personal: true, shared: false, org: false, include_default: false });
  const { data: shared } = useChatTargets({ personal: false, shared: true, org: false, include_default: false });
  const { data: org } = useChatTargets({ personal: false, shared: false, org: true, include_default: false });
  const { data: spaces, hydrating } = useSpaces();
  const { groupSharedAssistantsBySpace, hiddenSpaceIds, setSpaceVisible } = useUserSpaceSettings();
  const [openSharedAssistantSpaceIds, toggleOpenSharedAssistantSpaceId] = useLocalStorage(
    useShallow((state) => [state.openSharedAssistantSpaceIds, state.toggleOpenSharedAssistantSpaceId])
  );
  const router = useRouter();

  const handleOpenAssistant = (assistantId: string) => {
    router.push(`/assistant/${assistantId}`);
  };

  const sharedAssistantsBySpace = useMemo(() => {
    return spaces
      .filter(
        (space: SpaceSparse | SpacePublic) =>
          !space.personal && !space.organization && !hiddenSpaceIds.includes(space.id)
      )
      .map((space: SpaceSparse | SpacePublic) => ({
        id: space.id,
        name: space.name,
        assistants: [
          ...(space.applications?.assistants.items ?? []).map((assistant) => toChatTargetSparse(assistant)),
          ...(space.applications?.group_chats.items ?? []).map((groupChat) => toChatTargetSparse(groupChat)),
        ] as ChatTargetSparse[],
      }))
      .filter((space) => space.assistants.length > 0);
  }, [hiddenSpaceIds, spaces]);

  const renderGroupedSharedAssistants = () => {
    if (sharedAssistantsBySpace.length === 0) {
      return <AssistantList list={shared} onOpenAssistant={handleOpenAssistant} />;
    }

    return (
      <div className="w-full flex flex-col gap-4">
        {sharedAssistantsBySpace.map((space) => {
          const open = openSharedAssistantSpaceIds.includes(space.id);
          return (
            <div key={space.id} className="w-full">
              <div className="w-full flex text-primitives-gray-400 items-center gap-4">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => toggleOpenSharedAssistantSpaceId(space.id)}
                  className="min-w-0 grow flex items-center gap-6 py-4 focus-visible:outline-none focus-visible:ring ring-ring rounded-button-sm"
                >
                  <div className="text-small truncate">{space.name}</div>
                  <div className="flex-1 h-px bg-divider" />
                  <Icon className="mr-6 shrink-0" size="20px" icon={open ? <ChevronUp /> : <ChevronDown />} />
                </button>
                <span className="relative">
                  <PopupMenu size="sm" align="start" position="left">
                    <PopupMenu.Button
                      iconButton
                      variant="ghost"
                      showBackground={false}
                      className="!w-auto !min-w-0"
                      aria-label={t('common:user_menu.space_actions', { space: space.name })}
                    >
                      <Icon icon={<EllipsisVertical />} />
                    </PopupMenu.Button>
                    <PopupMenu.Panel>
                      <PopupMenu.Items>
                        <PopupMenu.Item closeOnClick={false}>
                          <Button
                            variant="tertiary"
                            showBackground={false}
                            className="w-full justify-start"
                            onClick={() => setSpaceVisible(space.id, false)}
                          >
                            {t('common:user_menu.hide_space')}
                          </Button>
                        </PopupMenu.Item>
                      </PopupMenu.Items>
                    </PopupMenu.Panel>
                  </PopupMenu>
                </span>
              </div>
              {open && <AssistantList list={space.assistants} onOpenAssistant={handleOpenAssistant} />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Accordion size="sm" className="grow w-full">
      {personal.length > 0 && (
        <Accordion.Item>
          <Accordion.Item.Header>
            <Accordion.Item.Icon icon={<Icon icon={<User />} />} />
            <Accordion.Item.Title className="capitalize">{t('common:personal')}</Accordion.Item.Title>
            <Accordion.Item.Button iconButton variant="tertiary" showBackground={false}>
              {(open: boolean) => <Icon icon={open ? <ChevronUp /> : <ChevronDown />} />}
            </Accordion.Item.Button>
          </Accordion.Item.Header>
          <Accordion.Item.Content className="mx-0 !px-0">
            <AssistantList list={personal} onOpenAssistant={handleOpenAssistant} />
          </Accordion.Item.Content>
        </Accordion.Item>
      )}
      {shared.length > 0 && (
        <Accordion.Item>
          <Accordion.Item.Header>
            <Accordion.Item.Icon icon={<Icon icon={<Users />} />} />
            <Accordion.Item.Title className="capitalize">{t('common:shared')}</Accordion.Item.Title>
            <Accordion.Item.Button iconButton variant="tertiary" showBackground={false}>
              {(open: boolean) => <Icon icon={open ? <ChevronUp /> : <ChevronDown />} />}
            </Accordion.Item.Button>
          </Accordion.Item.Header>
          <Accordion.Item.Content className="mx-0 !px-0">
            {groupSharedAssistantsBySpace ?
              renderGroupedSharedAssistants()
            : <AssistantList list={shared} onOpenAssistant={handleOpenAssistant} />}
            {hydrating && (
              <div className="px-4 py-8 text-small text-dark-secondary">{t('assistants:loading_more')}</div>
            )}
          </Accordion.Item.Content>
        </Accordion.Item>
      )}
      {shared.length === 0 && hydrating && (
        <div className="px-4 py-8 text-small text-dark-secondary">{t('assistants:loading_more')}</div>
      )}
      {org.length > 0 && (
        <Accordion.Item>
          <Accordion.Item.Header>
            <Accordion.Item.Icon icon={<Icon icon={<Building2 />} />} />
            <Accordion.Item.Title className="capitalize">{t('common:organization')}</Accordion.Item.Title>
            <Accordion.Item.Button iconButton variant="tertiary" showBackground={false}>
              {(open: boolean) => <Icon icon={open ? <ChevronUp /> : <ChevronDown />} />}
            </Accordion.Item.Button>
          </Accordion.Item.Header>
          <Accordion.Item.Content className="mx-0 !px-0">
            <AssistantList list={org} onOpenAssistant={handleOpenAssistant} />
          </Accordion.Item.Content>
        </Accordion.Item>
      )}
    </Accordion>
  );
};
