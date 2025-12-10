import { Play, Clock, User, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { VideoInfo } from '../types/telegram';

interface VideoPreviewProps {
  videoInfo: VideoInfo;
  onDownload: () => void;
  isLoading?: boolean;
}

export const VideoPreview = ({ videoInfo, onDownload, isLoading = false }: VideoPreviewProps) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const openOriginalVideo = () => {
    window.open(videoInfo.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Thumbnail */}
      {videoInfo.thumbnail && (
        <div className="relative aspect-video bg-muted">
          <img
            src={videoInfo.thumbnail}
            alt={videoInfo.title}
            className="w-full h-full object-cover transition-all duration-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3 transition-all duration-200 hover:scale-110">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        </div>
      )}

      {/* Video Info */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2 transition-colors duration-200">
          {videoInfo.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-200">
            <User className="h-4 w-4" />
            <span>{videoInfo.uploader}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-200">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(videoInfo.duration)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={openOriginalVideo}
            variant="outline"
            className="flex-1 transition-all duration-200 hover:scale-[1.02]"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Original
          </Button>

          <Button
            onClick={onDownload}
            disabled={isLoading}
            className="flex-1 transition-all duration-200 hover:scale-[1.02]"
          >
            <Play className="h-4 w-4 mr-2" />
            {isLoading ? 'Downloading...' : 'Download'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};