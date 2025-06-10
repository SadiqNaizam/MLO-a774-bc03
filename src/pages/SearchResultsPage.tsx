import React, { useState } from 'react';
import ThemedCollapsibleSidebar from '@/components/layout/ThemedCollapsibleSidebar';
import PlaybackControlBar from '@/components/layout/PlaybackControlBar';
import TrackListItem from '@/components/TrackListItem';
import MediaItemCard, { MediaItemType } from '@/components/MediaItemCard';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Home, Search, Music, ListMusic, Mic2, Settings, LogOut, UserCircle } from 'lucide-react';

// Placeholder Data
const mockTracks = [
  { id: 't1', title: 'Found It!', artist: 'Searcher Band', album: 'Discovery Vol. 1', duration: '3:45', imageUrl: 'https://picsum.photos/seed/track1/100/100', isLiked: true },
  { id: 't2', title: 'Search Anthem', artist: 'The Seekers', album: 'Keywords', duration: '4:02', imageUrl: 'https://picsum.photos/seed/track2/100/100' },
  { id: 't3', title: 'Lost & Found', artist: 'Explorer', album: 'Maps', duration: '2:58', imageUrl: 'https://picsum.photos/seed/track3/100/100', isLiked: false },
];

const mockAlbums: Array<{ id: string; title: string; subtitle: string; itemType: MediaItemType; imageUrl: string }> = [
  { id: 'a1', title: 'Album Hits', subtitle: 'Various Artists', itemType: 'album', imageUrl: 'https://picsum.photos/seed/albumresult1/200/200' },
  { id: 'a2', title: 'Keyword Collection', subtitle: 'Searcher Band', itemType: 'album', imageUrl: 'https://picsum.photos/seed/albumresult2/200/200' },
];

const mockArtists: Array<{ id: string; title: string; subtitle: string; itemType: MediaItemType; imageUrl: string }> = [
  { id: 'ar1', title: 'Searcher Band', subtitle: 'Artist', itemType: 'artist', imageUrl: 'https://picsum.photos/seed/artistresult1/200/200' },
  { id: 'ar2', title: 'The Seekers', subtitle: 'Artist', itemType: 'artist', imageUrl: 'https://picsum.photos/seed/artistresult2/200/200' },
];

const mockPlaylists = mockAlbums.map(a => ({ ...a, itemType: 'playlist' as MediaItemType, title: `${a.title} Playlist`}));


const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/search-results', label: 'Search', icon: Search },
  { href: '/playlist-view', label: 'My Playlist', icon: ListMusic },
  { href: '/artist-profile', label: 'Favorite Artist', icon: Mic2 },
  { href: '/album-view', label: 'Cool Album', icon: Music },
];

const SearchResultsPage = () => {
  console.log('SearchResultsPage loaded');
  const [searchTerm, setSearchTerm] = useState('Your Query'); // Assume query passed or default
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const playDemoTrack = (track: any) => {
    setCurrentTrack({ id: track.id, title: track.title, artist: track.artist, albumArtUrl: track.imageUrl });
    setIsPlaying(true);
    setProgress(0);
  };


  return (
    <div className="flex h-screen bg-blue-50">
      <ThemedCollapsibleSidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-blue-200">
          <div className="w-1/3">
            <Input
              type="search"
              placeholder="Search again..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-blue-50 border-blue-300 focus:bg-white"
            />
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

        <ScrollArea className="flex-1 p-4 md:p-6 pb-[100px]">
          <h1 className="text-2xl font-semibold text-blue-700 mb-4">Results for "{searchTerm}"</h1>
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-blue-100 text-blue-700">
              <TabsTrigger value="tracks" className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-800">Tracks</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-800">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-800">Artists</TabsTrigger>
              <TabsTrigger value="playlists" className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-800">Playlists</TabsTrigger>
            </TabsList>
            <TabsContent value="tracks" className="mt-4">
              <div className="space-y-2">
                {mockTracks.map((track, index) => (
                  <TrackListItem
                    key={track.id}
                    trackNumber={index + 1}
                    {...track}
                    onPlayClick={() => playDemoTrack(track)}
                    onItemClick={() => console.log('View track details', track.id)}
                    onLikeClick={() => console.log('Like track', track.id)}
                    onAddToQueueClick={() => console.log('Add to queue', track.id)}
                    className="bg-white rounded-md shadow-sm hover:bg-blue-100"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mockAlbums.map(album => (
                  <MediaItemCard
                    key={album.id}
                    {...album}
                    onPlayClick={() => playDemoTrack(album)}
                    onPrimaryClick={() => console.log('View album', album.id)}
                    className="bg-white"
                  />
                ))}
              </div>
            </TabsContent>
             <TabsContent value="artists" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mockArtists.map(artist => (
                  <MediaItemCard
                    key={artist.id}
                    {...artist}
                    onPrimaryClick={() => console.log('View artist', artist.id)}
                    className="bg-white"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="playlists" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mockPlaylists.map(playlist => (
                  <MediaItemCard
                    key={playlist.id}
                    {...playlist}
                    onPlayClick={() => playDemoTrack(playlist)}
                    onPrimaryClick={() => console.log('View playlist', playlist.id)}
                    className="bg-white"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <Pagination className="mt-8 justify-center">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </ScrollArea>

        <PlaybackControlBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={currentTrack ? 180 : 0}
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

export default SearchResultsPage;