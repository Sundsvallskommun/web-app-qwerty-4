import { appURL } from '@utils/app-url';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const NOTIFICATION_PREVIEW_LENGTH = 180;
interface NotifyAnswerOptions {
  id: string;
  title: string;
  body: string;
  icon?: string;
  targetUrl?: string;
}

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

const getNotificationBody = (text: string) => {
  const normalizedText = text.replace(/\s+/g, ' ').trim();

  if (normalizedText.length <= NOTIFICATION_PREVIEW_LENGTH) {
    return normalizedText;
  }

  return `${normalizedText.slice(0, NOTIFICATION_PREVIEW_LENGTH - 3).trimEnd()}...`;
};

const getAppIconUrl = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return appURL(`${basePath}/icon-192x192.png`);
};

const getServiceWorkerUrl = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${basePath}/sw.js`;
};

const getServiceWorkerScope = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return basePath ? `${basePath}/` : '/';
};

export const useBackgroundAnswerNotification = () => {
  const notificationRef = useRef<Notification | null>(null);
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [isStandalonePwa, setIsStandalonePwa] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);
    const handleVisibilityChange = () => setIsDocumentHidden(document.visibilityState === 'hidden');

    setIsWindowFocused(document.hasFocus());
    handleVisibilityChange();

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    const updateStandaloneState = () => {
      const navigatorWithStandalone = navigator as NavigatorWithStandalone;
      setIsStandalonePwa(standaloneQuery.matches || navigatorWithStandalone.standalone === true);
    };

    updateStandaloneState();

    standaloneQuery.addEventListener?.('change', updateStandaloneState);

    return () => {
      standaloneQuery.removeEventListener?.('change', updateStandaloneState);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register(getServiceWorkerUrl(), {
        scope: getServiceWorkerScope(),
        updateViaCache: 'none',
      })
      .then((registration) => {
        setServiceWorkerRegistration(registration);
      })
      .catch(() => {
        setServiceWorkerRegistration(null);
      });
  }, []);

  useEffect(() => {
    return () => {
      notificationRef.current?.close();
      notificationRef.current = null;
    };
  }, []);

  const isSupported = typeof window !== 'undefined' && 'Notification' in window;
  const isBackground = useMemo(() => isDocumentHidden || !isWindowFocused, [isDocumentHidden, isWindowFocused]);

  const requestPermission = useCallback(async () => {
    if (!isSupported || Notification.permission !== 'default') {
      return isSupported ? Notification.permission : 'denied';
    }

    try {
      return await Notification.requestPermission();
    } catch {
      return Notification.permission;
    }
  }, [isSupported]);

  const notifyAnswer = useCallback(
    async ({ id, title, body, icon, targetUrl }: NotifyAnswerOptions) => {
      if (!isSupported || Notification.permission !== 'granted') {
        return;
      }

      const notificationOptions = {
        body: getNotificationBody(body),
        icon: icon || getAppIconUrl(),
        tag: id,
        data: {
          url: targetUrl,
        },
      };

      if (isStandalonePwa && serviceWorkerRegistration) {
        try {
          await serviceWorkerRegistration.showNotification(title, notificationOptions);
          return;
        } catch {
          // Fall back to the regular browser notification path below.
        }
      }

      notificationRef.current?.close();

      const notification = new Notification(title, notificationOptions);

      notification.onclick = () => {
        window.focus();
        if (targetUrl && window.location.href !== targetUrl) {
          window.location.href = targetUrl;
        }
        notification.close();
      };

      notificationRef.current = notification;
    },
    [isStandalonePwa, isSupported, serviceWorkerRegistration]
  );

  return {
    isBackground,
    requestPermission,
    notifyAnswer,
  };
};
