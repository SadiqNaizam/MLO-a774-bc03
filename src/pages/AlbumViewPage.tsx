import React, { useState } from 'react';
import ThemedCollapsibleSidebar from '@/components/layout/ThemedCollapsibleSidebar';
import PlaybackControlBar from '@/components/layout/PlaybackControlBar';
import TrackListItem from '@/components/TrackListItem';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, Music, ListMusic, Mic2, Settings, LogOut, UserCircle, Play, PlusCircle, CalendarDays, Disc } from 'lucide-react';

const albumDetails = {
  id: 'alb1',
  title: 'Doraemon\'s Greatest Gadget Anthems',
  artist: 'The Future Cats',
  artistId: 'art1', // Link to artist profile
  releaseYear: new Date().getFullYear() - 1, // Last year
  coverArtUrl: 'https://picsum.photos/seed/doraemonalbum/400/400',
  tracks: [
    { id: 'track_a1', title: 'Hoptercopter High', artist: 'The Future Cats', duration: '3:20', imageUrl: 'https://picsum.photos/seed/track_hop/100/100' },
    { id: 'track_a2', title: 'Small Light, Big World', artist: 'The Future Cats', duration: '2:55', imageUrl: 'https://picsum.photos/seed/track_light/100/100', isLiked: true },
    { id: 'track_a3', title: 'Translation Gummy Talk', artist: 'The Future Cats', duration: '4:10', imageUrl: 'https://picsum.photos/seed/track_gummy/100/100' },
    { id: 'track_a4', title: 'Dress-Up Camera Flash', artist: 'The Future Cats', duration: '3:00', imageUrl: 'https://picsum.photos/seed/track_camera/100/100' },
    { id: 'track_a5', title: 'Time Furoshiki Flow', artist: 'The Future Cats', duration: '3:45', imageUrl: 'https://picsum.photos/seed/track_furoshiki/100/100', isLiked: true },
  ],
  isAddedToLibrary: false,
};

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/search-results', label: 'Search', icon: Search },
  { href: '/playlist-view', label: 'My Playlist', icon: ListMusic },
  { href: '/artist-profile', label: 'Favorite Artist', icon: Mic2 },
  { href: '/album-view', label: 'Cool Album', icon: Music },
];

const AlbumViewPage = () => {
  console.log('AlbumViewPage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isAdded, setIsAdded] = useState(albumDetails.isAddedToLibrary);

  const playAlbumTrack = (track: any, index: number) => {
    setCurrentTrack({ ...track, album: albumDetails.title, trackNumber: index + 1, albumArtUrl: albumDetails.coverArtUrl });
    setIsPlaying(true);
    setProgress(0);
    console.log(`Playing track ${index + 1} from album: ${track.title}`);
  };

  const playEntireAlbum = () => {
    if (albumDetails.tracks.length > 0) {
      playAlbumTrack(albumDetails.tracks[0], 0);
      console.log('Playing entire album:', albumDetails.title);
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <ThemedCollapsibleSidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
         <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-blue-200">
           <div className="w-1/3">
            <Input type="search" placeholder="Search music..." className="bg-blue-50 border-blue-300 focus:bg-white" />
          </div>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-yellow-400">
                <AvatarImage src="https://picsum.photos/seed/useravatar/40/40" alt="User" />
                <AvatarFallback className="bg-blue-500 text-white">U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {/* ... other menu items */}
              <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:text-red-600 focus:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <ScrollArea className="flex-1 pb-[100px]">
          <Card className="m-4 md:m-6 bg-gradient-to-br from-yellow-100 via-blue-100 to-blue-200 border-blue-300 shadow-xl">
            <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
              <img src={albumDetails.coverArtUrl} alt={albumDetails.title} className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover shadow-2xl border-4 border-white" />
              <div className="flex-1 pt-2 text-center md:text-left">
                <CardDescription className="text-sm text-blue-600 font-medium mb-1 uppercase tracking-wider flex items-center justify-center md:justify-start">
                    <Disc className="w-4 h-4 mr-2"/> Album
                </CardDescription>
                <CardTitle className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-2">{albumDetails.title}</CardTitle>
                <p className="text-xl text-blue-700 font-semibold mb-1">
                  By <a href={`/artist/${albumDetails.artistId}`} className="hover:underline hover:text-yellow-500">{albumDetails.artist}</a>
                </p>
                <p className="text-md text-blue-600 flex items-center justify-center md:justify-start">
                    <CalendarDays className="w-4 h-4 mr-2"/> Released: {albumDetails.releaseYear}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button size="lg" onClick={playEntireAlbum} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg px-8 py-3 text-base">
                        <Play className="mr-2 h-5 w-5 fill-white" /> Play Album
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={() => setIsAdded(!isAdded)}
                        className="w-full sm:w-auto border-blue-500 text-blue-700 hover:bg-blue-100 rounded-full shadow-lg px-8 py-3 text-base"
                    >
                        <PlusCircle className="mr-2 h-5 w-5" /> {isAdded ? 'Added to Library' : 'Add to Library'}
                    </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Tracklist</h3>
              <div className="space-y-1">
                {albumDetails.tracks.map((track, index) => (
                  <TrackListItem
                    key={track.id}
                    trackNumber={index + 1}
                    title={track.title}
                    artist={track.artist} // Usually same as album artist, can be omitted if redundant
                    duration={track.duration}
                    imageUrl={track.imageUrl} // Individual track images can be different
                    isLiked={track.isLiked}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    isActive={currentTrack?.id === track.id}
                    onPlayClick={() => playAlbumTrack(track, index)}
                    onPauseClick={() => setIsPlaying(false)}
                    onItemClick={() => playAlbumTrack(track, index)}
                    className="bg-white/60 backdrop-blur-sm rounded-lg hover:bg-blue-100/70 transition-colors"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollArea>

        <PlaybackControlBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={currentTrack ? 190 : 0}
          volume={volume}
          isMuted={false} isRepeat={false} isShuffle={false}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log('Next')}
          onPrevious={() => console.log('Prev')}
          onSeek={setProgress}
          onVolumeChange={setVolume}
          onMuteToggle={() => {}} onRepeatToggle={() => {}} onShuffleToggle={() => {}}
        />
      </div>
    </div>
  );
};

export default AlbumViewPage;