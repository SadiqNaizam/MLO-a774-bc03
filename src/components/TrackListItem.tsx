import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Music2, ThumbsUp } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Assuming shadcn DropdownMenu

interface TrackListItemProps {
  trackNumber?: number | string;
  title: string;
  artist?: string;
  album?: string;
  duration?: string; // e.g., "3:45"
  imageUrl?: string;
  isPlaying?: boolean;
  isActive?: boolean; // e.g., currently selected but not necessarily playing
  isLiked?: boolean;
  onPlayClick?: () => void;
  onPauseClick?: () => void;
  onItemClick?: () => void; // For selecting or navigating
  onLikeClick?: () => void;
  onAddToQueueClick?: () => void;
  onAddToPlaylistClick?: () => void;
  className?: string;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  trackNumber,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying = false,
  isActive = false,
  isLiked = false,
  onPlayClick,
  onPauseClick,
  onItemClick,
  onLikeClick,
  onAddToQueueClick,
  onAddToPlaylistClick,
  className,
}) => {
  console.log(`Rendering TrackListItem: ${title}, Playing: ${isPlaying}, Active: ${isActive}`);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying && onPauseClick) {
      onPauseClick();
    } else if (!isPlaying && onPlayClick) {
      onPlayClick();
    }
  };
  
  // Doraemon theme: active/hover states could use yellow or light blue
  const activeClasses = "bg-blue-100 border-yellow-400"; // Doraemon: yellow accent for active
  const hoverClasses = "hover:bg-blue-50 transition-colors duration-150";

  return (
    <div
      className={cn(
        "flex items-center p-2 md:p-3 space-x-3 md:space-x-4 rounded-md cursor-pointer border-2 border-transparent",
        hoverClasses,
        isActive ? activeClasses : "",
        className
      )}
      onClick={onItemClick}
      role="button"
      tabIndex={0}
      aria-label={`Track: ${title} by ${artist}`}
    >
      {trackNumber && (
        <div className="text-xs md:text-sm text-gray-500 w-6 text-center group-hover:hidden">
          {isPlaying ? <Music2 className="h-4 w-4 text-yellow-500 animate-pulse" /> : trackNumber}
        </div>
      )}

      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-10 h-10 md:w-12 md:h-12 rounded object-cover flex-shrink-0" />
      )}

      <div className={cn("flex-grow min-w-0", imageUrl ? "" : "ml-2")}>
        <p className={cn("text-sm md:text-base font-medium truncate", isPlaying || isActive ? "text-yellow-600" : "text-gray-800")}>
          {title}
        </p>
        {artist && <p className="text-xs md:text-sm text-gray-500 truncate">{artist}</p>}
      </div>

      {album && <p className="text-xs md:text-sm text-gray-500 truncate hidden md:block flex-shrink-0 w-1/4">{album}</p>}
      
      {onLikeClick && (
        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onLikeClick(); }} className={cn("ml-auto hidden group-hover:flex md:flex flex-shrink-0", isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400")}>
          <ThumbsUp size={18} />
        </Button>
      )}

      {duration && <p className="text-xs md:text-sm text-gray-500 w-12 text-right tabular-nums flex-shrink-0">{duration}</p>}

      {(onPlayClick || onPauseClick) && (
         <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className={cn("ml-2 flex-shrink-0", isPlaying ? "text-yellow-500" : "text-gray-500 hover:text-yellow-600")}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
      )}
      
      {(onAddToQueueClick || onAddToPlaylistClick) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="ml-1 flex-shrink-0 text-gray-500 hover:text-gray-700">
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            {onAddToQueueClick && <DropdownMenuItem onClick={onAddToQueueClick}>Add to Queue</DropdownMenuItem>}
            {onAddToPlaylistClick && <DropdownMenuItem onClick={onAddToPlaylistClick}>Add to Playlist</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default TrackListItem;