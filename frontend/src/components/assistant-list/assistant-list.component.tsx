import { AssistantPublic, AssistantSparse } from '@data-contracts/backend/data-contracts';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { cx } from '@sk-web-gui/react';
import { useShallow } from 'zustand/shallow';
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
  const [pinnedAssistantIds, togglePinnedAssistantId] = useLocalStorage(
    useShallow((state) => [state.pinnedAssistantIds, state.togglePinnedAssistantId])
  );

  const handlePin = (assistantId: string) => {
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
            onPin={handlePin}
            onOpenAssistant={onOpenAssistant}
            active={assistant.active}
          />
        ))}
      </ul>
    </div>
  );
};
