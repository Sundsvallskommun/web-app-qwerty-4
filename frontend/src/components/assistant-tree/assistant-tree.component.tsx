import { AssistantList } from '@components/assistant-list/assistant-list.component';
import { useAssistants } from '@hooks/assistants/use-assistants.hook';
import { Accordion, Icon } from '@sk-web-gui/react';
import { User, ChevronUp, ChevronDown, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const AssistantTree: React.FC = () => {
  const { t } = useTranslation();
  const { data: personal } = useAssistants({ personal: true, shared: false, include_default: false });
  const { data: shared } = useAssistants({ shared: true, include_default: false });
  const router = useRouter();

  const handleOpenAssistant = (assistantId: string) => {
    router.push(`/assistant/${assistantId}`);
  };

  return (
    <Accordion size="sm">
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
            <AssistantList list={shared} onOpenAssistant={handleOpenAssistant} />
          </Accordion.Item.Content>
        </Accordion.Item>
      )}
    </Accordion>
  );
};
