import { ToolCallInfo } from '@data-contracts/backend/data-contracts';
import { Disclosure, Accordion, Icon, cx, Button, Label } from '@sk-web-gui/react';
import { useTranslation } from 'react-i18next';
import { Wrench, ChevronUp, ChevronDown } from 'lucide-react';
import { TypingBubble } from '@sk-web-gui/ai';

interface AIFeedToolCallProps {
  inverted?: boolean;
  toolCalls?: ToolCallInfo[];
  done?: boolean;
}

export const AIFeedToolCall: React.FC<AIFeedToolCallProps> = (props) => {
  const { inverted, toolCalls, done } = props;
  const { t } = useTranslation();

  const formatToolArguments = (value: unknown) => {
    if (value === undefined || value === null) {
      return '{}';
    }

    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  const getStatusColor = (toolCall: ToolCallInfo) => {
    switch (toolCall.result_status) {
      case 'succeeded':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'vattjom';
      case 'approved':
        return 'vattjom';
      case 'denied':
        return 'warning';
      case 'timeout_denied':
        return 'warning';
      default:
        return 'tertiary';
    }
  };

  return done ?
      <Disclosure size="sm" className="mb-0 pb-0" inverted={inverted} variant="alt">
        <Disclosure.Header>
          <Disclosure.Title className="text-small font-normal">
            <span className="inline-flex items-center gap-8 text-dark-secondary">
              <Icon icon={<Wrench />} size="1.6rem" />
              {t('assistants:tools.label')} ({toolCalls?.length})
            </span>
          </Disclosure.Title>
          <Disclosure.Button variant="tertiary" showBackground={false}>
            {(open: boolean) => <Icon size="1.6rem" icon={open ? <ChevronUp /> : <ChevronDown />} />}
          </Disclosure.Button>
        </Disclosure.Header>
        <Disclosure.Content className="!mt-0 mr-0">
          <Accordion size="sm" className="w-full mt-8">
            {toolCalls?.map((toolCall, index) => (
              <Accordion.Item key={toolCall.tool_call_id || `${toolCall.tool_name}-${index}`}>
                <Accordion.Item.Header>
                  <Accordion.Item.Title className="min-w-0">
                    <div className="min-w-0 flex flex-row gap-4 truncate text-small font-normal text-dark-secondary">
                      <span className="truncate font-bold text-small">{toolCall.server_name}</span>
                      {' • '}
                      {toolCall.tool_name}
                    </div>
                  </Accordion.Item.Title>
                  <Label className="capitalize" inverted color={getStatusColor(toolCall)}>
                    {t(`assistants:tools.status.${toolCall.result_status}`, {
                      defaultValue: t('assistants:tools.status.default'),
                    })}
                  </Label>
                  <Accordion.Item.Button iconButton variant="tertiary" showBackground={false}>
                    {(open: boolean) => <Icon size="1.6rem" icon={open ? <ChevronUp /> : <ChevronDown />} />}
                  </Accordion.Item.Button>
                </Accordion.Item.Header>
                <Accordion.Item.Content className="mx-0">
                  <pre className="overflow-x-auto rounded-utility-md bg-background-200 p-12 text-small">
                    {formatToolArguments(toolCall.arguments)}
                  </pre>
                </Accordion.Item.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </Disclosure.Content>
      </Disclosure>
    : <div className="flex">
        <TypingBubble className="w-fit">
          <span className="inline-flex items-center gap-8">
            <Icon className="animate-pulse" icon={<Wrench />} size="1.6rem" />
            <span className="font-bold">{t('assistants:tools.label')}</span> ({toolCalls?.length})
          </span>
        </TypingBubble>
      </div>;
};
