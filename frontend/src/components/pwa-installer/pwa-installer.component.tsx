import { useSessionStorage } from '@hooks/use-sessionstorage.hook';
import { Button } from '@sk-web-gui/react';
import { Share, SquarePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const PWAInstaller: React.FC = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [useBrowser, setUserBrowser] = useSessionStorage(
    useShallow((state) => [state.useBrowser, state.setUseBrowser])
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone || useBrowser) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-background-content w-full h-full flex flex-col justify-center items-center text-center gap-12">
      <h1>Installera {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <Button>Lägg till på skrivbord / hemskärm</Button>
      {isIOS && (
        <p>
          För att installera på iOS, klicka på dela-knappen <Share className="inline" size="16px" />
          <br />
          och sedan "<SquarePlus className="inline" size="16px" /> Lägg till på hemskärm"
        </p>
      )}
      <div className="absolute bottom-32">
        <button className="sk-link sk-link-md" onClick={() => setUserBrowser(true)}>
          Fortsätt i webbläsare...
        </button>
      </div>
    </div>
  );
};
