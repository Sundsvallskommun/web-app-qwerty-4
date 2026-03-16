import { AssistantButton } from '@components/assistant-button/assistant-button.component';
import { AssistantPublic, AssistantSparse } from '@data-contracts/backend/data-contracts';
import { Avatar, Button, cx, Icon } from '@sk-web-gui/react';
import { iconUrl } from '@utils/icon-url';
import { Pin, PinOff } from 'lucide-react';
import { useState } from 'react';

interface AssistantListItemProps extends React.ComponentPropsWithoutRef<'li'> {
  assistant: AssistantPublic | AssistantSparse;
  onOpenAssistant?: (id: string) => void;
  onPin?: (id: string) => void;
  active?: boolean;
  pinned?: boolean;
}

export const AssistantListItem: React.FC<AssistantListItemProps> = (props) => {
  const { assistant, onOpenAssistant, className, onPin, active, pinned = false, ...rest } = props;
  const [hover, setHover] = useState(false);

  return (
    <li key={assistant.id} className={cx('grow', className)} {...rest}>
      <AssistantButton
        size="md"
        className="w-full"
        label={assistant.name}
        active={active}
        onClick={() => onOpenAssistant?.(assistant.id)}
        image={
          <Avatar
            initials={assistant.name.charAt(0)}
            size="md"
            imageUrl={iconUrl(assistant.icon_id)}
            className="rounded-button-sm"
          />
        }
        showLabel
      >
        {onPin ?
          <Button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            size="md"
            showBackground={false}
            variant="tertiary"
            iconButton
            aria-pressed={pinned}
            className={cx(
              pinned ? 'opacity-100' : 'opacity-50 hover:opacity-100',
              'rounded-l-0 rounded-r-button-lg max-h-full h-full focus-visible:bg-background-content'
            )}
            onClick={(event) => {
              event.stopPropagation();
              onPin?.(assistant.id);
            }}
          >
            <Icon icon={pinned && hover ? <PinOff /> : <Pin />} />
          </Button>
        : <></>}
      </AssistantButton>
    </li>
  );
};