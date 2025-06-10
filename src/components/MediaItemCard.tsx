import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MediaItemType = 'album' | 'track' | 'playlist' | 'artist';

interface MediaItemCardProps {
  id: string | number;
  imageUrl?: string;
  title: string;
  subtitle?: string; // e.g., artist name, or "Playlist" / "Album"
  itemType: MediaItemType;
  onPlayClick?: (id: string | number) => void;
  onPrimaryClick?: (id: string | number) => void; // e.g. view details
  onAddToLibraryClick?: (id: string | number) => void;
  className?: string;
}

const MediaItemCard: React.FC<MediaItemCardProps> = ({
  id,
  imageUrl,
  title,
  subtitle,
  itemType,
  onPlayClick,
  onPrimaryClick,
  onAddToLibraryClick,
  className,
}) => {
  console.log(`Rendering MediaItemCard: ${title} (Type: ${itemType})`);

  const handlePrimaryClick = () => {
    if (onPrimaryClick) onPrimaryClick(id);
    else if (onPlayClick) onPlayClick(id); // Fallback to play if no primary click
    console.log(`Primary action on ${itemType} ${id}: ${title}`);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if play button is clicked
    if (onPlayClick) onPlayClick(id);
    console.log(`Play ${itemType} ${id}: ${title}`);
  };

  const handleAddToLibrary = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToLibraryClick) onAddToLibraryClick(id);
    console.log(`Add to library ${itemType} ${id}: ${title}`);
  };
  
  // Doraemon theme hint: playful animation with yellow border on hover
  const hoverClasses = "transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-105 hover:border-yellow-400 border-2 border-transparent";

  return (
    <Card
      className={cn("w-full overflow-hidden rounded-lg group", hoverClasses, className)}
      onClick={handlePrimaryClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${itemType}: ${title}`}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={`${title} ${itemType} art`}
            className="object-cover w-full h-full rounded-t-lg"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-yellow-500 hover:text-black"
            // Doraemon theme hint: Play button could be red accent
          >
            <PlayCircle className="h-8 w-8" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <CardTitle className="text-base font-semibold truncate leading-tight">{title}</CardTitle>
        {subtitle && <CardDescription className="text-xs truncate">{subtitle}</CardDescription>}
      </CardContent>
      {onAddToLibraryClick && (
        <CardFooter className="p-3 pt-0">
          <Button variant="outline" size="sm" className="w-full" onClick={handleAddToLibrary}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Library
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MediaItemCard;