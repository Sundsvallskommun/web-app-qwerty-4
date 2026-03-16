import { FilePublic } from '@sk-web-gui/ai';
import { Chip } from '@sk-web-gui/react';

interface FileListProps {
  files: FilePublic[];
  onRemove: (file: FilePublic) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  return (
    files?.length > 0 && (
      <ul className="w-full flex flex-wrap p-4 gap-6">
        {files.map((file) => (
          <li key={file.id}>
            <Chip className="bg-background-200 border-0" onClick={() => onRemove(file)}>
              {file.name}
            </Chip>
          </li>
        ))}
      </ul>
    )
  );
};
