import { useEffect, useState } from 'react';
import type { TelegramWebApp, DownloadRequest } from '../types/telegram';

// Declare Telegram WebApp global
declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Get Telegram WebApp instance
    const tgWebApp = window.Telegram?.WebApp;

    if (tgWebApp) {
      setWebApp(tgWebApp);

      // Mark the app as ready
      tgWebApp.ready();
      setIsReady(true);

      // Set theme colors
      tgWebApp.setHeaderColor('#2481cc');
      tgWebApp.setBackgroundColor('#ffffff');

      // Handle theme changes
      const handleThemeChange = () => {
        const theme = tgWebApp.colorScheme;
        document.documentElement.setAttribute('data-theme', theme);
      };

      tgWebApp.onEvent('themeChanged', handleThemeChange);
      handleThemeChange(); // Set initial theme

      return () => {
        tgWebApp.offEvent('themeChanged', handleThemeChange);
      };
    }
  }, []);

  const sendDownloadRequest = (url: string, options: Partial<DownloadRequest> = {}) => {
    if (!webApp) return;

    const request: DownloadRequest = {
      action: 'download',
      url,
      format: 'mp4',
      quality: 'best',
      withWatermark: false,
      ...options
    };

    webApp.sendData(JSON.stringify(request));
  };

  const showSuccess = (message: string) => {
    if (webApp) {
      webApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  const showError = (message: string) => {
    if (webApp) {
      webApp.showAlert(`Error: ${message}`);
    } else {
      alert(`Error: ${message}`);
    }
  };

  const closeApp = () => {
    if (webApp) {
      webApp.close();
    }
  };

  const expandApp = () => {
    if (webApp) {
      webApp.expand();
    }
  };

  return {
    webApp,
    isReady,
    user: webApp?.initDataUnsafe?.user,
    sendDownloadRequest,
    showSuccess,
    showError,
    closeApp,
    expandApp
  };
};