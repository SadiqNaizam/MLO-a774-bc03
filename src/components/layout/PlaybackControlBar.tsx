import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'; // Assuming shadcn/ui Slider
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle, ListMusic
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackInfo {
  id: string | number;
  title?: string;
  artist?: string;
  albumArtUrl?: string;
}

interface PlaybackControlBarProps {
  currentTrack?: TrackInfo;
  isPlaying: boolean;
  progress: number; // 0-100
  duration: number; // in seconds
  volume: number; // 0-100
  isMuted: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number) => void; // value 0-100
  onVolumeChange: (value: number) => void; // value 0-100
  onMuteToggle: () => void;
  onRepeatToggle: () => void;
  onShuffleToggle: () => void;
  onQueueToggle?: () => void; // Optional: to show/hide queue
  className?: string;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const PlaybackControlBar: React.FC<PlaybackControlBarProps> = ({
  currentTrack,
  isPlaying,
  progress,
  duration,
  volume,
  isMuted,
  isRepeat,
  isShuffle,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onRepeatToggle,
  onShuffleToggle,
  onQueueToggle,
  className,
}) => {
  console.log("Rendering PlaybackControlBar, track:", currentTrack?.title, "playing:", isPlaying);

  const handleSeek = (values: number[]) => {
    onSeek(values[0]);
  };

  const handleVolumeChange = (values: number[]) => {
    onVolumeChange(values[0]);
  };
  
  // Doraemon theme hints: light blue background, red/blue accent buttons, rounded shapes
  const themeBaseClass = "bg-blue-100 border-t border-blue-200"; // Light blue base
  const accentButtonClass = "text-red-600 hover:text-red-700"; // Red accent for play
  const primaryButtonClass = "text-blue-600 hover:text-blue-700"; // Blue primary for other controls

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 h-20 md:h-24 p-2 md:p-4 flex items-center justify-between z-50 shadow-t-lg",
        themeBaseClass,
        className
      )}
    >
      {/* Track Info */}
      <div className="flex items-center space-x-2 md:space-x-3 w-1/4 md:w-1/3 min-w-0">
        {currentTrack?.albumArtUrl ? (
          <AspectRatio ratio={1/1} className="w-12 h-12 md:w-14 md:h-14 rounded overflow-hidden flex-shrink-0">
            <img src={currentTrack.albumArtUrl} alt={currentTrack.title || 'Album art'} className="object-cover w-full h-full" />
          </AspectRatio>
        ) : (
          <div className="w-12 h-12 md:w-14 md:h-14 rounded bg-blue-200 flex-shrink-0"></div>
        )}
        <div className="min-w-0">
          <p className="text-xs md:text-sm font-semibold text-blue-800 truncate">{currentTrack?.title || 'No track selected'}</p>
          <p className="text-xs text-blue-600 truncate">{currentTrack?.artist || 'Unknown artist'}</p>
        </div>
      </div>

      {/* Playback Controls & Progress */}
      <div className="flex flex-col items-center justify-center w-1/2 md:w-1/3 space-y-1 md:space-y-0">
        <div className="flex items-center space-x-1 md:space-x-2">
          <Button variant="ghost" size="icon" onClick={onShuffleToggle} className={cn(isShuffle ? primaryButtonClass : "text-gray-500", "rounded-full")}>
            <Shuffle size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPrevious} className={cn(primaryButtonClass, "rounded-full")}>
            <SkipBack size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPlayPause} className={cn(accentButtonClass, "rounded-full w-10 h-10 md:w-12 md:h-12")}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className={cn(primaryButtonClass, "rounded-full")}>
            <SkipForward size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRepeatToggle} className={cn(isRepeat ? primaryButtonClass : "text-gray-500", "rounded-full")}>
            <Repeat size={18} />
          </Button>
        </div>
        <div className="w-full flex items-center space-x-2 px-2 md:px-0">
          <span className="text-xs text-blue-500 w-8 text-right tabular-nums">{formatTime(progress / 100 * duration)}</span>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            onValueChange={handleSeek}
            className="flex-grow [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:nth-child(2)]:w-3 [&>span:nth-child(2)]:h-3"
            // Doraemon theme: Slider could be yellow or red accent
            // trackClassName="bg-yellow-400" thumbClassName="bg-red-500" 
          />
          <span className="text-xs text-blue-500 w-8 text-left tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-1 md:space-x-2 w-1/4 md:w-1/3">
        {onQueueToggle && (
          <Button variant="ghost" size="icon" onClick={onQueueToggle} className={cn(primaryButtonClass, "rounded-full hidden md:inline-flex")}>
            <ListMusic size={20} />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={onMuteToggle} className={cn(primaryButtonClass, "rounded-full")}>
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-16 md:w-24 hidden sm:block [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:nth-child(2)]:w-3 [&>span:nth-child(2)]:h-3"
        />
      </div>
    </footer>
  );
};

export default PlaybackControlBar;