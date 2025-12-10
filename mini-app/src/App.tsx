import { useState } from 'react';
import { Download, History, Settings, Sparkles } from 'lucide-react';
import { useTelegram } from './hooks/useTelegram';
import { useViewTransition, type NavigationDirection } from './hooks/useViewTransition';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { UrlInput } from './components/UrlInput';
import { ProgressBar } from './components/ProgressBar';
import { VideoPreview } from './components/VideoPreview';
import ErrorBoundary from './components/ErrorBoundary';
import type { VideoInfo } from './types/telegram';

type AppState = 'input' | 'preview' | 'downloading' | 'completed' | 'error';

function AppContent() {
  const { isReady, sendDownloadRequest, showSuccess, showError, user } = useTelegram();
  const { startTransition } = useViewTransition();
  const [appState, setAppState] = useState<AppState>('input');
  const [currentUrl, setCurrentUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'download' | 'history' | 'settings'>('download');

  const handleUrlSubmit = async (url: string) => {
    setCurrentUrl(url);
    setAppState('downloading');
    setDownloadProgress(0);

    try {
      // Validate URL format
      const urlPattern = /https?:\/\/(?:www\.)?(?:vt|vm)\.tiktok\.com\/[A-Za-z0-9]+\/?|https?:\/\/(?:www\.)?tiktok\.com\/@[A-Za-z0-9._]+\/video\/\d+|https?:\/\/(?:www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?|https?:\/\/(?:www\.)?facebook\.com\/reel\/[A-Za-z0-9]+\/?|https?:\/\/(?:www\.)?facebook\.com\/reels\/[A-Za-z0-9]+\/?/;

      if (!urlPattern.test(url)) {
        throw new Error('Invalid video URL. Please check the URL and try again.');
      }

      // Simulate getting video info (in real implementation, this would come from bot)
      const mockVideoInfo: VideoInfo = {
        id: 'mock-id',
        title: 'Sample Video Title',
        duration: 120,
        uploader: 'Sample Creator',
        thumbnail: 'https://via.placeholder.com/320x180',
        url: url
      };

      setVideoInfo(mockVideoInfo);
      setAppState('preview');

      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setAppState('completed');
            showSuccess('Video downloaded successfully!');
            return 100;
          }
          return prev + 10;
        });
      }, 500);

    } catch (error) {
      console.error('URL processing error:', error);
      setAppState('error');
      showError(error instanceof Error ? error.message : 'Failed to process video URL');
    }
  };

  const handleDownload = async () => {
    if (!currentUrl) return;

    setAppState('downloading');
    setDownloadProgress(0);

    try {
      // Send download request to bot
      sendDownloadRequest(currentUrl, {
        format: 'mp4',
        quality: 'best',
        withWatermark: false
      });

      // Simulate progress (in real app, this would come from bot updates)
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setAppState('completed');
            showSuccess('Video downloaded successfully!');
            return 100;
          }
          return prev + 15;
        });
      }, 600);
    } catch (error) {
      console.error('Download error:', error);
      setAppState('error');
      showError('Failed to start download. Please try again.');
    }
  };

  const resetApp = () => {
    setAppState('input');
    setCurrentUrl('');
    setVideoInfo(null);
    setDownloadProgress(0);
  };

  const handleTabChange = (newTab: 'download' | 'history' | 'settings') => {
    if (newTab === activeTab) return;

    // Determine navigation direction based on tab order
    const tabOrder = ['download', 'history', 'settings'];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(newTab);
    const direction: NavigationDirection = newIndex > currentIndex ? 'forward' : 'backward';

    startTransition(() => {
      setActiveTab(newTab);
    }, direction);
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Mini App...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border transition-all duration-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary transition-colors duration-200" />
              <h1 className="text-xl font-bold text-foreground transition-colors duration-200">Video Downloader</h1>
            </div>
            <div className="flex items-center space-x-3">
              <ModeToggle />
              {user && (
                <div className="text-sm text-muted-foreground transition-colors duration-200">
                  Hi, {user.first_name}!
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6" style={{ viewTransitionName: 'main-content' }}>
        {activeTab === 'download' && (
          <div className="space-y-6">
            {appState === 'input' && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2 transition-colors duration-200">
                  Download Videos
                </h2>
                <p className="text-muted-foreground transition-colors duration-200">
                  Paste a TikTok, Instagram, or Facebook video URL to get started
                </p>
              </div>
            )}

            {appState === 'input' && (
              <UrlInput onSubmit={handleUrlSubmit} />
            )}

            {appState === 'preview' && videoInfo && (
              <VideoPreview
                videoInfo={videoInfo}
                onDownload={handleDownload}
              />
            )}

            {(appState === 'downloading' || appState === 'completed' || appState === 'error') && (
              <div className="space-y-4">
                <ProgressBar
                  progress={downloadProgress}
                  status={appState === 'error' ? 'failed' : appState === 'completed' ? 'completed' : 'downloading'}
                  speed={appState === 'downloading' ? '2.1 MB/s' : undefined}
                  eta={appState === 'downloading' ? '00:15' : undefined}
                  filename={videoInfo?.title}
                />

                {appState === 'completed' && (
                  <button
                    onClick={resetApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Download Another Video
                  </button>
                )}

                {appState === 'error' && (
                  <button
                    onClick={resetApp}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="text-center py-12">
            <History className="h-16 w-16 text-muted-foreground mx-auto mb-4 transition-colors duration-200" />
            <h3 className="text-lg font-medium text-foreground mb-2 transition-colors duration-200">Download History</h3>
            <p className="text-muted-foreground transition-colors duration-200">Your download history will appear here</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground transition-colors duration-200">Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground transition-colors duration-200">Download Quality</span>
                <select className="border border-border rounded px-3 py-1 bg-background text-foreground transition-colors duration-200">
                  <option>Best</option>
                  <option>High</option>
                  <option>Medium</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-foreground transition-colors duration-200">Format</span>
                <select className="border border-border rounded px-3 py-1 bg-background text-foreground transition-colors duration-200">
                  <option>MP4</option>
                  <option>WebM</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="watermark" className="rounded border-border bg-background transition-colors duration-200" />
                <label htmlFor="watermark" className="text-foreground transition-colors duration-200">Include watermark</label>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border transition-all duration-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {[
              { id: 'download', label: 'Download', icon: Download },
              { id: 'history', label: 'History', icon: History },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id as any)}
                className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  activeTab === id
                    ? 'text-primary bg-primary/8 border border-primary/25 shadow-md shadow-primary/10 ring-1 ring-primary/20 animate-bounce-in'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/40 hover:border-accent/30'
                }`}
                style={{ viewTransitionName: `tab-${id}` }}
              >
                <Icon className="h-5 w-5 transition-transform duration-200" />
                <span className="text-xs font-medium transition-colors duration-200">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed nav */}
      <div className="pb-20"></div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="video-downloader-theme">
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
