import { useChatTarget } from '@hooks/chat-targets/use-chat-target.hook';
import { usePinnedAssistants } from '@hooks/assistants/use-pinned-assistants.hook';
import { cx } from '@sk-web-gui/react';
import type { ChatTarget, ChatTargetSparse } from '../../types/chat-target';
import { AssistantListItem } from './assistant-list-item.component';

type ListItem = (ChatTarget | ChatTargetSparse) & {
  active?: boolean;
};
interface AssistantListProps extends React.ComponentPropsWithoutRef<'ul'> {
  list: Array<ListItem>;
  onOpenAssistant?: (id: string) => void;
}

export const AssistantList: React.FC<AssistantListProps> = (props) => {
  const { list, className, onOpenAssistant, ...rest } = props;
  const { data: personalAssistant } = useChatTarget('personal');
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
