import { useState } from 'react';
import { Link, Download, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export const UrlInput = ({ onSubmit, isLoading = false }: UrlInputProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (inputUrl: string): boolean => {
    const urlRegex = /https?:\/\/(?:www\.)?(?:vt|vm)\.tiktok\.com\/[A-Za-z0-9]+\/?|https?:\/\/(?:www\.)?tiktok\.com\/@[A-Za-z0-9._]+\/video\/\d+|https?:\/\/(?:www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?|https?:\/\/(?:www\.)?facebook\.com\/reel\/[A-Za-z0-9]+\/?|https?:\/\/(?:www\.)?facebook\.com\/reels\/[A-Za-z0-9]+\/?/g;

    return urlRegex.test(inputUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid TikTok, Instagram, or Facebook video URL');
      return;
    }

    setError('');
    onSubmit(url);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrl(clipboardText);
      setError('');
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Link className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste video URL here..."
          className="pl-10 pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          disabled={isLoading}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handlePaste}
          className="absolute inset-y-0 right-0 pr-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
          disabled={isLoading}
        >
          <span className="text-sm font-medium">Paste</span>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="transition-all duration-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading || !url.trim()}
        className="w-full transition-all duration-200 hover:scale-[1.02]"
        size="lg"
      >
        <Download className="h-4 w-4 mr-2" />
        {isLoading ? 'Processing...' : 'Download Video'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground transition-colors duration-200">
          Supports: TikTok, Instagram Reels, Facebook Reels
        </p>
      </div>
    </div>
  );
};