import { AssistantButton, AssistantButtonProps } from '@components/assistant-button/assistant-button.component';
import { useLocalStorage } from '@hooks/use-localstorage.hook';
import { Tooltip } from '@sk-web-gui/react';
import { useState } from 'react';

export const DesktopAssistantMenuItem: React.FC<AssistantButtonProps> = (props) => {
  const [hover, setHover] = useState<boolean>(false);
  const open = useLocalStorage((state) => state.menuOpen);

  return (
    <li className="relative w-full">
      <AssistantButton
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      />
      {hover && !open && (
        <Tooltip position="right" className="absolute left-full z-50">
          {props.label}
        </Tooltip>
      )}
    </li>
  );
};
