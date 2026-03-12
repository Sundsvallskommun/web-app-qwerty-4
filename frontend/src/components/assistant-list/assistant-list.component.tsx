import { cx } from '@sk-web-gui/react';
import { AssistantPublic, AssistantSparse } from '@data-contracts/backend/data-contracts';
import { AssistantListItem } from './assistant-list-item.component';

interface AssistantListProps extends React.ComponentPropsWithoutRef<'ul'> {
  list: Array<AssistantPublic | AssistantSparse>;
  onOpenAssistant?: (id: string) => void;
}

export const AssistantList: React.FC<AssistantListProps> = (props) => {
  const { list, className, onOpenAssistant, ...rest } = props;
  const pinnedassistants = list.filter((ass) => ass.metadata_json?.pinned);

  const handlePin = (assistantId: string) => {
    // TODO: Handle pin
  };

  return (
    <div className="h-full overflow-y-auto">
      <ul className={cx('flex flex-col gap-12 w-full', className)} {...rest}>
        {list?.map((assistant) => (
          <AssistantListItem
            key={assistant.id}
            assistant={assistant}
            onPin={handlePin}
            onOpenAssistant={onOpenAssistant}
          />
        ))}
      </ul>
    </div>
  );
};
