'use client';

import { uploadFile } from '@services/file.service';
import { ChatInput, FilePublic } from '@sk-web-gui/ai';
import { CustomOnChangeEventUploadFile, FileUpload, Icon, useSnackbar } from '@sk-web-gui/react';
import { Paperclip } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ToolbarAttachmentProps {
  onAttached: (attachment: FilePublic) => void;
  disabled?: boolean;
}

export const ToolbarAttachment: React.FC<ToolbarAttachmentProps> = ({ onAttached, disabled = false }) => {
  const message = useSnackbar();
  const { t } = useTranslation();

  const handleChange = (event: CustomOnChangeEventUploadFile) => {
    if (disabled) return;

    uploadFile(event.target.value[0].file)
      .then(res => {
        onAttached({ id: res.id, name: res.name, mimetype: res.mimetype, size: res.size });
      })
      .catch(() => {
        message({ position: 'bottom', message: t('file:upload.error'), status: 'error' });
      });
  };

  if (disabled) {
    return (
      <ChatInput.Toolbar.Button label="Bifoga dokument" disabled>
        <Icon icon={<Paperclip />} />
      </ChatInput.Toolbar.Button>
    );
  }

  return (
    <FileUpload.Button onChange={handleChange} appendFiles={[]}>
      <ChatInput.Toolbar.Button label="Bifoga dokument">
        <Icon icon={<Paperclip />} />
      </ChatInput.Toolbar.Button>
    </FileUpload.Button>
  );
};
