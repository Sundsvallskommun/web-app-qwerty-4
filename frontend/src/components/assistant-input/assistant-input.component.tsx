'use client';

import { FilePublic } from '@data-contracts/backend/data-contracts';
import { ChatHistory, ChatInput, InputSection } from '@sk-web-gui/ai';
import { Button, Icon, useThemeQueries } from '@sk-web-gui/react';
import { Mic, Plus } from 'lucide-react';
import { SubmitEvent, useEffect, useState } from 'react';
import { FileList } from './components/file-list.component';
import { ToolbarAttachment } from './components/toolbar-attachment.component';

interface AssistantInputProps {
  onSend: (query: string, files?: FilePublic[]) => void;
  history?: ChatHistory;
}

export const AssistantInput: React.FC<AssistantInputProps> = ({ onSend, history }) => {
  const [value, setValue] = useState<string>('');
  const [attachments, setAttachments] = useState<FilePublic[]>([]);
  const [untuched, setUntuched] = useState<boolean>(true);
  const { isMinMediumDevice } = useThemeQueries();

  const submit = () => {
    if (value || attachments.length) {
      onSend(value, attachments.length ? attachments : undefined);
      setValue('');
      setAttachments([]);
    }
  };

  useEffect(() => {
    if (!history?.length) {
      setUntuched(true);
    }
  }, [history]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      submit();
    }
  };

  const handleAddFile = (attachment: FilePublic) => {
    setAttachments([...attachments, attachment]);
  };
  const handleRemoveFile = (attachment: FilePublic) => {
    setAttachments([...attachments.filter((file) => file.id !== attachment.id)]);
  };

  return (
    <form className="sk-ai-inputsection md:max-w-[80rem] !py-0" onSubmit={handleSubmit}>
      <InputSection.Wrapper shadow={!isMinMediumDevice}>
        <ChatInput.Wrapper onFocus={() => setUntuched(false)}>
          <FileList files={attachments} onRemove={handleRemoveFile} />
          {untuched && !isMinMediumDevice && (
            <ChatInput.Submitbutton>
              <Button
                tabIndex={-1}
                showBackground={false}
                size="sm"
                iconButton
                variant="tertiary"
                aria-label="Fler val"
                onClick={() => setUntuched(false)}
              >
                <Icon icon={<Plus />} />
              </Button>
            </ChatInput.Submitbutton>
          )}
          <ChatInput.Textarea
            onFocus={() => setUntuched(false)}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={handleEnter}
            wrap={!untuched || isMinMediumDevice}
          ></ChatInput.Textarea>

          {(!untuched || isMinMediumDevice) && (
            <ChatInput.Toolbar>
              <ToolbarAttachment onAttached={handleAddFile} />
            </ChatInput.Toolbar>
          )}
          <div className="flex gap-0 md:gap-6 items-center">
            <Button variant="tertiary" showBackground={false} size="sm" iconButton>
              <Icon icon={<Mic />} />
            </Button>

            <ChatInput.Submitbutton disabled={!value && !attachments.length} type="submit" />
          </div>
        </ChatInput.Wrapper>
      </InputSection.Wrapper>
    </form>
  );
};
