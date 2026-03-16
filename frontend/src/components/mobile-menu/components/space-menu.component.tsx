import { AssistantButton } from '@components/assistant-button/assistant-button.component';
import { AssistantList } from '@components/assistant-list/assistant-list.component';
import { AssistantTree } from '@components/assistant-tree/assistant-tree.component';
import { useAssistant } from '@hooks/assistants/use-assistant.hook';
import { useAssistants } from '@hooks/assistants/use-assistants.hook';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { Avatar, Divider } from '@sk-web-gui/react';
import { getAssistantAvatar } from '@utils/get-assistant-avatar';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { SearchAssistant } from '../../search-assistant/search-assistant.component';

interface SpaceMenuProps {
  onClose?: () => void;
}

export const SpaceMenu: React.FC<SpaceMenuProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { data: personalAssistant } = useAssistant('personal');
  const { data: otherAssistants } = useAssistants({ shared: true, personal: true, include_default: false });
  const [pinnedAssistantIds] = useLocalStorage(useShallow((state) => [state.pinnedAssistantIds]));

  const router = useRouter();
  const pinnedAssistants = useMemo(
    () =>
      otherAssistants?.filter(
        (assistant) => pinnedAssistantIds.includes(assistant.id) && assistant.id !== personalAssistant?.id
      ) ?? [],
    [otherAssistants, personalAssistant?.id, pinnedAssistantIds]
  );

  const handleOpenAssistant = (assistantId: string) => {
    router.push(`/assistant/${assistantId}`);
    onClose?.();
  };

  return (
    <div className="w-full flex flex-col gap-8 overflow-hidden max-w-screen">
      <div className="py-8 px-8">
        <SearchAssistant onClose={onClose} />
      </div>
      <div className="overflow-y-auto h-full flex flex-col gap-8 py-8 px-8">
        <AssistantButton
          showLabel
          size="md"
          label={personalAssistant?.name || t('assistants:personal_assistant')}
          image={
            <Avatar
              initials="AI"
              size="md"
              imageUrl={getAssistantAvatar(personalAssistant, true)}
              className="rounded-button-sm"
            />
          }
          onClick={() => handleOpenAssistant('personal')}
        />
        {pinnedAssistants.length > 0 && (
          <>
            <AssistantList list={pinnedAssistants} onOpenAssistant={handleOpenAssistant} />
          </>
        )}
        <Divider />
        <AssistantTree />
      </div>
    </div>
  );
};



