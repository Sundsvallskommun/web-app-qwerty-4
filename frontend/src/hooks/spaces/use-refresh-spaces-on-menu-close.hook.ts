import { useEffect, useRef } from 'react';
import { refreshSpacesInBackground } from './space-loading.service';

export const useRefreshSpacesOnMenuClose = (open: boolean, active: boolean) => {
  const previousOpenRef = useRef(open);

  useEffect(() => {
    const wasOpen = previousOpenRef.current;
    previousOpenRef.current = open;

    if (!active) {
      return;
    }

    if (wasOpen && !open) {
      void refreshSpacesInBackground();
    }
  }, [active, open]);
};
