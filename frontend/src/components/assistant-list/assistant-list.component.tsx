import { AssistantPublic, AssistantSparse } from '@data-contracts/backend/data-contracts';
import { useAssistant } from '@hooks/assistants/use-assistant.hook';
import { usePinnedAssistants } from '@hooks/assistants/use-pinned-assistants.hook';
import { cx } from '@sk-web-gui/react';
import { AssistantListItem } from './assistant-list-item.component';

type ListItem = (AssistantPublic | AssistantSparse) & {
  active?: boolean;
};
interface AssistantListProps extends React.ComponentPropsWithoutRef<'ul'> {
  list: Array<ListItem>;
  onOpenAssistant?: (id: string) => void;
}

export const AssistantList: React.FC<AssistantListProps> = (props) => {
  const { list, className, onOpenAssistant, ...rest } = props;
  const { data: personalAssistant } = useAssistant('personal');
  const { pinnedAssistantIds, togglePinnedAssistantId } = usePinnedAssistants();

  const handlePin = (assistantId: string) => {
    if (assistantId === personalAssistant?.id) {
      return;
    }

    togglePinnedAssistantId(assistantId);
  };

  return (
    <div className="h-full">
      <ul className={cx('flex flex-col gap-12 w-full', className)} {...rest}>
        {list?.map((assistant) => (
          <AssistantListItem
            key={assistant.id}
            assistant={assistant}
            pinned={pinnedAssistantIds.includes(assistant.id)}
            onPin={assistant.id === personalAssistant?.id ? undefined : handlePin}
            onOpenAssistant={onOpenAssistant}
            active={assistant.active}
          />
        ))}
      </ul>
    </div>
  );
};
