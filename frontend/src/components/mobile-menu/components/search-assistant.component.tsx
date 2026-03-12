import { cx, SearchField } from '@sk-web-gui/react';
import { Button, Icon } from '@sk-web-gui/react';
import { ChevronLeft } from 'lucide-react';

import { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssistants } from '@hooks/assistants/use-assistants.hook';
import { AssistantList } from '@components/assistant-list/assistant-list.component';
import { useRouter } from 'next/navigation';

interface SearchAssistantProps {
  onClose?: () => void;
}

export const SearchAssistant: React.FC<SearchAssistantProps> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { data: assistants } = useAssistants({ personal: false, shared: true, include_default: false });
  const { data: personalassistants } = useAssistants({ personal: true, shared: false, include_default: true });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const matches = useMemo(() => {
    const list = [...(assistants || []), ...(personalassistants || [])];
    if (!list.length) return [];
    if (!searchValue) return [...list].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    const q = searchValue.trim().toLowerCase();
    return [...list]
      .filter((a) => a.name && a.name.toLowerCase().includes(q))
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }, [assistants, personalassistants, searchValue]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof assistants> = {} as any;
    matches.forEach((a) => {
      const key = (a.name?.charAt(0) || '').toUpperCase();
      if (!map[key]) map[key] = [] as any;
      map[key].push(a);
    });
    const keys = Object.keys(map).sort();
    return { map, keys };
  }, [matches]);

  const handleClose = () => {
    if (open) {
      setSearchValue('');
      setOpen(false);
    } else {
      onClose?.();
    }
  };

  const handleOpen = (assistantId: string) => {
    router.push(`/assistant/${assistantId}`);
    handleClose();
  };

  return (
    <div className="relative">
      <div
        className={cx(
          open ? 'fixed top-0 bottom-0 left-0 right-0 py-16 px-16 z-50 overflow-hidden bg-background-200' : 'relative'
        )}
      >
        <div className="flex gap-8 items-center">
          <SearchField
            size="md"
            ref={inputRef as any}
            showResetButton={true}
            showSearchButton={false}
            value={searchValue}
            className="grow shrink"
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              setFocused(true);
              setOpen(true);
            }}
            onBlur={() => setFocused(false)}
            onReset={() => {
              setSearchValue('');
              if (!focused) setOpen(false);
            }}
            placeholder={t('assistants:find_assistant')}
          />
          <Button
            className="grow-0 shrink-0"
            size="sm"
            variant="tertiary"
            iconButton
            onClick={handleClose}
            aria-label={t('assistants:back')}
          >
            <Icon icon={<ChevronLeft />} />
          </Button>
        </div>

        {open && (
          <div className="w-full flex flex-col gap-8 py-8 overflow-y-auto">
            {matches.length > 0 ?
              grouped.keys.map((key) => (
                <div key={key} className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-small font-semibold text-gray-600">{key}</div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <AssistantList list={grouped.map[key]} onOpenAssistant={handleOpen} />
                </div>
              ))
            : searchValue ?
              <div className="text-sm text-gray-500">{t('assistants:no_results')}</div>
            : <div className="text-sm text-gray-500">{t('assistants:search_hint')}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
