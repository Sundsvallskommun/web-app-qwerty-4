import { Button, Icon, PopupMenu } from '@sk-web-gui/react';
import { AtSign } from 'lucide-react';
import { MentionedAssistant } from '@components/ai-feed/at-assistant-util';

interface ToolbarAssistantMentionProps {
  assistants: MentionedAssistant[];
  disabled?: boolean;
  onSelect: (assistant: MentionedAssistant) => void;
}

export const ToolbarAssistantMention: React.FC<ToolbarAssistantMentionProps> = ({
  assistants,
  disabled = false,
  onSelect,
}) => {
  return (
    <span className="relative">
      <PopupMenu size="sm" align="start" position="over">
        <PopupMenu.Button
          variant="tertiary"
          size="sm"
          iconButton
          disabled={disabled || assistants.length === 0}
          aria-label="Nämn en assistent"
        >
          <Icon icon={<AtSign />} />
        </PopupMenu.Button>
        <PopupMenu.Panel>
          <PopupMenu.Items>
            {assistants.map((assistant) => (
              <PopupMenu.Item key={assistant.id}>
                <Button
                  variant="tertiary"
                  showBackground={false}
                  className="w-full justify-start"
                  onClick={() => onSelect(assistant)}
                >
                  @{assistant.name}
                </Button>
              </PopupMenu.Item>
            ))}
          </PopupMenu.Items>
        </PopupMenu.Panel>
      </PopupMenu>
    </span>
  );
};
