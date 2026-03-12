import { AssistantList } from '@components/assistant-list/assistant-list.component';
import { useAssistants } from '@hooks/assistants/use-assistants.hook';
import { Accordion, Button, Icon } from '@sk-web-gui/react';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchAssistant } from './search-assistant.component';
import { useRouter } from 'next/navigation';

interface SpaceMenuProps {
  onClose?: () => void;
}

export const SpaceMenu: React.FC<SpaceMenuProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { data: personal } = useAssistants({ personal: true, shared: false, include_default: true });
  const { data: shared } = useAssistants({ shared: true, include_default: false });
  const router = useRouter();

  const handleOpenAssistant = (assistantId: string) => {
    router.push(`/assistant/${assistantId}`);
  };

  return (
    <div className="w-full flex flex-col gap-8 py-8 px-8 overflow-y-auto max-w-screen">
      <SearchAssistant onClose={onClose} />
      <Accordion size="sm">
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
        <Accordion.Item>
          <Accordion.Item.Header>
            <Accordion.Item.Icon icon={<Icon icon={<User />} />} />
            <Accordion.Item.Title className="capitalize">{t('common:shared')}</Accordion.Item.Title>
            <Accordion.Item.Button iconButton variant="tertiary" showBackground={false}>
              {(open: boolean) => <Icon icon={open ? <ChevronUp /> : <ChevronDown />} />}
            </Accordion.Item.Button>
          </Accordion.Item.Header>
          <Accordion.Item.Content className="mx-0 !px-0">
            <AssistantList list={shared} onOpenAssistant={handleOpenAssistant} />
          </Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
