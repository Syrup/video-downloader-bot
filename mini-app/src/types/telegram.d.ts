// Telegram Web App types
export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  bottomBarColor: string;
  isClosingConfirmationEnabled: boolean;
  sendData: (data: string) => void;
  close: () => void;
  expand: () => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  showPopup: (params: any, callback?: (buttonId: string) => void) => void;
  showScanQrPopup: (params: any, callback?: (text: string) => void) => void;
  closeScanQrPopup: () => void;
  readTextFromClipboard: (callback?: (text: string) => void) => void;
  requestWriteAccess: (callback?: (granted: boolean) => void) => void;
  requestContact: (callback?: (granted: boolean) => void) => void;
  ready: () => void;
  switchInlineQuery: (query: string, choose_chat_types?: any[]) => void;
  openLink: (url: string, options?: any) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string, callback?: (status: string) => void) => void;
  shareToStory: (media_url: string, params?: any) => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBottomBarColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  onEvent: (eventType: string, callback: Function) => void;
  offEvent: (eventType: string, callback: Function) => void;
  MainButton: any;
  BackButton: any;
  SettingsButton: any;
  HapticFeedback: any;
  CloudStorage: any;
  BiometricManager: any;
}

export interface DownloadRequest {
  action: 'download';
  url: string;
  format?: 'mp4' | 'webm' | 'avi';
  quality?: 'best' | 'worst' | string;
  withWatermark?: boolean;
}

export interface DownloadProgress {
  downloadId: string;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  progress?: number;
  speed?: string;
  eta?: string;
  error?: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  duration: number;
  uploader: string;
  thumbnail?: string;
  url: string;
}