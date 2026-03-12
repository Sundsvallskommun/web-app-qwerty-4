'use client';
import { uploadFile } from '@services/file.service';
import { ChatInput } from '@sk-web-gui/ai';
import { CustomOnChangeEventUploadFile, FileUpload, Icon, useSnackbar } from '@sk-web-gui/react';
import { Paperclip } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Attachment } from '../assistant-input.component';

interface ToolbarAttachmentProps {
  onAttached: (attachment: Attachment) => void;
}

export const ToolbarAttachment: React.FC<ToolbarAttachmentProps> = ({ onAttached }) => {
  const message = useSnackbar();
  const { t } = useTranslation();

  const handleChange = (event: CustomOnChangeEventUploadFile) => {
    uploadFile(event.target.value[0].file)
      .then((res) => {
        onAttached({ id: res.id, name: res.name });
      })
      .catch(() => {
        message({ message: t('file:upload.error'), status: 'error' });
      });
  };

  return (
    <FileUpload.Button onChange={handleChange} appendFiles={[]}>
      <ChatInput.Toolbar.Button label="Bifoga dokument">
        <Icon icon={<Paperclip />} />
      </ChatInput.Toolbar.Button>
    </FileUpload.Button>
  );
};
