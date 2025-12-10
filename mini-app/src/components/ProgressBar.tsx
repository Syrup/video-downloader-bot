import { Download, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number; // 0-100
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  speed?: string;
  eta?: string;
  filename?: string;
}

export const ProgressBar = ({ progress, status, speed, eta, filename }: ProgressBarProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Download className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Preparing download...';
      case 'downloading':
        return `Downloading... ${progress}%`;
      case 'completed':
        return 'Download completed!';
      case 'failed':
        return 'Download failed';
      default:
        return 'Unknown status';
    }
  };

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground truncate transition-colors duration-200">
              {filename || 'Video Download'}
            </h3>
            <p className="text-sm text-muted-foreground transition-colors duration-200">{getStatusText()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress
          value={Math.min(progress, 100)}
          className="transition-all duration-300"
        />

        {/* Progress Details */}
        {status === 'downloading' && (speed || eta) && (
          <div className="flex justify-between text-xs text-muted-foreground mt-2 transition-colors duration-200">
            {speed && <span>Speed: {speed}</span>}
            {eta && <span>ETA: {eta}</span>}
          </div>
        )}

        {/* Status-specific messages */}
        {status === 'completed' && (
          <div className="mt-2 text-sm text-green-600 font-medium transition-colors duration-200">
            ✅ Video downloaded successfully!
          </div>
        )}

        {status === 'failed' && (
          <div className="mt-2 text-sm text-red-600 font-medium transition-colors duration-200">
            ❌ Download failed. Please try again.
          </div>
        )}
      </CardContent>
    </Card>
  );
};