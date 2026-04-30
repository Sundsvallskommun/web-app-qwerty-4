import { AssistantList } from '@components/assistant-list/assistant-list.component';
import { AssistantSparse, SpacePublic, SpaceSparse } from '@data-contracts/backend/data-contracts';
import { useAssistants } from '@hooks/assistants/use-assistants.hook';
import { useSpaces } from '@hooks/spaces/use-spaces.hook';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { Accordion, Icon } from '@sk-web-gui/react';
import { User, ChevronUp, ChevronDown, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const AssistantTree: React.FC = () => {
  const { t } = useTranslation();
  const { data: personal } = useAssistants({ personal: true, shared: false, include_default: false });
  const { data: shared } = useAssistants({ shared: true, include_default: false });
  const { data: spaces } = useSpaces();
  const [groupSharedAssistantsBySpace, openSharedAssistantSpaceIds, toggleOpenSharedAssistantSpaceId] = useLocalStorage(
    useShallow((state) => [
      state.groupSharedAssistantsBySpace,
      state.openSharedAssistantSpaceIds,
      state.toggleOpenSharedAssistantSpaceId,
    ])
  );
  const router = useRouter();

  const handleOpenAssistant = (assistantId: string) => {
    router.push(`/assistant/${assistantId}`);
  };

  const sharedAssistantsBySpace = useMemo(() => {
    return spaces
      .filter((space: SpaceSparse | SpacePublic) => !space.personal)
      .map((space: SpaceSparse | SpacePublic) => ({
        id: space.id,
        name: space.name,
        assistants: (space.applications?.assistants.items ?? []) as AssistantSparse[],
      }))
      .filter((space) => space.assistants.length > 0);
  }, [spaces]);

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
              <button
                type="button"
                aria-expanded={open}
                onClick={() => toggleOpenSharedAssistantSpaceId(space.id)}
                className="w-full flex text-primitives-gray-400 items-center gap-6 py-4 focus-visible:outline-none focus-visible:ring ring-ring rounded-button-sm"
              >
                <div className="text-small">{space.name}</div>
                <div className="flex-1 h-px bg-divider" />
                <Icon className="mr-6" size="20px" icon={open ? <ChevronUp /> : <ChevronDown />} />
              </button>
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
          </Accordion.Item.Content>
        </Accordion.Item>
      )}
    </Accordion>
  );
};
