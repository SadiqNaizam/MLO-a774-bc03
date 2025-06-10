import React, { useState } from 'react';
import ThemedCollapsibleSidebar from '@/components/layout/ThemedCollapsibleSidebar';
import PlaybackControlBar from '@/components/layout/PlaybackControlBar';
import TrackListItem from '@/components/TrackListItem';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Search, Music, ListMusic, Mic2, Settings, LogOut, UserCircle, Play, Shuffle, PlusCircle, Edit3 } from 'lucide-react';

const playlistDetails = {
  id: 'pl1',
  name: 'Doraemon\'s Pocket Mix',
  creator: 'Nobi Nobita',
  description: 'A collection of cheerful and adventurous tunes, perfect for any gadget-fueled escapade! Inspired by Doraemon.',
  coverArtUrl: 'https://picsum.photos/seed/doraemonplaylist/300/300',
  tags: ['Upbeat', 'Adventure', 'Anime', 'Fun'],
  isOwned: true, // To show edit button
  tracks: [
    { id: 'pt1', title: 'Gadget Groove', artist: 'Future Cat', album: 'Time Machine Hits', duration: '3:15', imageUrl: 'https://picsum.photos/seed/track_gadget/100/100', isLiked: true },
    { id: 'pt2', title: 'Anywhere Door Journey', artist: 'Teleporters', album: 'Dimension Hop', duration: '4:02', imageUrl: 'https://picsum.photos/seed/track_door/100/100' },
    { id: 'pt3', title: 'Friendship Power', artist: 'The Gang', album: 'Nobita\'s Adventures', duration: '2:50', imageUrl: 'https://picsum.photos/seed/track_friendship/100/100', isLiked: true },
    { id: 'pt4', title: 'Time Kerchief Twist', artist: 'Chronos', album: 'Epoch Beats', duration: '3:30', imageUrl: 'https://picsum.photos/seed/track_kerchief/100/100' },
  ]
};

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/search-results', label: 'Search', icon: Search },
  { href: '/playlist-view', label: 'My Playlist', icon: ListMusic },
  { href: '/artist-profile', label: 'Favorite Artist', icon: Mic2 },
  { href: '/album-view', label: 'Cool Album', icon: Music },
];

const PlaylistViewPage = () => {
  console.log('PlaylistViewPage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const playTrack = (track: any, index: number) => {
    setCurrentTrack({ ...track, trackNumber: index + 1 });
    setIsPlaying(true);
    setProgress(0);
     // Simulate playing entire playlist from this track
    console.log(`Playing playlist from track ${index + 1}: ${track.title}`);
  };

  const playEntirePlaylist = () => {
    if (playlistDetails.tracks.length > 0) {
      playTrack(playlistDetails.tracks[0], 0);
      console.log('Playing entire playlist:', playlistDetails.name);
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <ThemedCollapsibleSidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-blue-200">
          <div className="w-1/3">
            <Input type="search" placeholder="Search within playlist or library..." className="bg-blue-50 border-blue-300 focus:bg-white" />
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
          <Card className="m-4 md:m-6 bg-gradient-to-br from-blue-200 to-yellow-100 border-blue-300 shadow-xl">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
              <img src={playlistDetails.coverArtUrl} alt={playlistDetails.name} className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover shadow-lg border-2 border-white" />
              <div className="flex-1">
                <Badge variant="secondary" className="mb-1 bg-yellow-400 text-yellow-900">PLAYLIST</Badge>
                <CardTitle className="text-3xl md:text-4xl font-bold text-blue-800">{playlistDetails.name}</CardTitle>
                <CardDescription className="text-blue-600 mt-1">{playlistDetails.description}</CardDescription>
                <p className="text-sm text-blue-700 mt-1">Created by: <span className="font-semibold">{playlistDetails.creator}</span></p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {playlistDetails.tags.map(tag => <Badge key={tag} variant="outline" className="border-blue-400 text-blue-700">{tag}</Badge>)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex items-center space-x-2 mb-4">
                <Button size="lg" onClick={playEntirePlaylist} className="bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md">
                  <Play className="mr-2 h-5 w-5 fill-white" /> Play All
                </Button>
                <Button variant="outline" size="lg" className="border-blue-500 text-blue-700 hover:bg-blue-100 rounded-full shadow-md">
                  <Shuffle className="mr-2 h-5 w-5" /> Shuffle
                </Button>
                {playlistDetails.isOwned && (
                  <Button variant="ghost" size="icon" className="ml-auto text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full">
                    <Edit3 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <div className="space-y-1">
                {playlistDetails.tracks.map((track, index) => (
                  <TrackListItem
                    key={track.id}
                    trackNumber={index + 1}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    duration={track.duration}
                    imageUrl={track.imageUrl}
                    isLiked={track.isLiked}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    isActive={currentTrack?.id === track.id}
                    onPlayClick={() => playTrack(track, index)}
                    onPauseClick={() => setIsPlaying(false)}
                    onItemClick={() => playTrack(track, index)} // Or select without playing
                    onLikeClick={() => console.log('Like', track.id)}
                    onAddToQueueClick={() => console.log('Add to queue', track.id)}
                    className="bg-white/70 backdrop-blur-sm rounded-md hover:bg-blue-100/80 transition-colors"
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
          duration={currentTrack ? 200 : 0}
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

export default PlaylistViewPage;