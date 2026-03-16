import { FileImage, File, FileCode, FileMusic, FileText } from 'lucide-react';

export const MimetypeIcon: React.FC<{ mimetype: string }> = ({ mimetype }) => {
  if (mimetype?.includes('image')) {
    return <FileImage />;
  }
  if (mimetype?.includes('markdown')) {
    return <FileCode />;
  }
  if (mimetype?.includes('audio')) {
    return <FileMusic />;
  }
  if (mimetype?.includes('text') || mimetype?.includes('pdf') || mimetype?.includes('word')) {
    return <FileText />;
  }

  return <File />;
};
