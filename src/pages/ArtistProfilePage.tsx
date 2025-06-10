import React, { useState } from 'react';
import ThemedCollapsibleSidebar from '@/components/layout/ThemedCollapsibleSidebar';
import PlaybackControlBar from '@/components/layout/PlaybackControlBar';
import TrackListItem from '@/components/TrackListItem';
import MediaItemCard, { MediaItemType } from '@/components/MediaItemCard';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Search, Music, ListMusic, Mic2, Settings, LogOut, UserCircle, Play, UserPlus, CheckCircle } from 'lucide-react';

const artistProfile = {
  id: 'art1',
  name: 'DJ Dora',
  imageUrl: 'https://picsum.photos/seed/djdora/300/300',
  bio: 'DJ Dora, known for her iconic blue and white outfit and a magical pocket full of futuristic beats, spins tracks that take listeners on an adventure through time and space. Her music is a blend of J-Pop, electronic, and happy hardcore, guaranteed to make you smile.',
  monthlyListeners: '1,234,567',
  isFollowed: false,
  topTracks: [
    { id: 'djt1', title: 'Bell Beat Drop', artist: 'DJ Dora', album: 'Pocket Grooves', duration: '3:05', imageUrl: 'https://picsum.photos/seed/track_bell/100/100', isLiked: true },
    { id: 'djt2', title: 'Gadget Symphony No. 4', artist: 'DJ Dora', album: 'Future Sounds', duration: '4:12', imageUrl: 'https://picsum.photos/seed/track_gadgetsymphony/100/100' },
    { id: 'djt3', title: 'Blue Rhapsody', artist: 'DJ Dora', album: 'Pocket Grooves', duration: '2:55', imageUrl: 'https://picsum.photos/seed/track_bluerhapsody/100/100' },
  ],
  albums: [
    { id: 'dja1', title: 'Pocket Grooves', subtitle: 'Album', itemType: 'album' as MediaItemType, imageUrl: 'httpsum.photos/seed/album_pocketgrooves/200/200' },
    { id: 'dja2', title: 'Future Sounds', subtitle: 'Album', itemType: 'album' as MediaItemType, imageUrl: 'https://picsum.photos/seed/album_futuresounds/200/200' },
  ],
  relatedArtists: [
     { id: 'rel1', title: 'MC Noby', subtitle: 'Artist', itemType: 'artist' as MediaItemType, imageUrl: 'https://picsum.photos/seed/artist_mcnoby/200/200' },
     { id: 'rel2', 'title': 'Sue Beats', subtitle: 'Artist', itemType: 'artist' as MediaItemType, imageUrl: 'https://picsum.photos/seed/artist_suebeats/200/200' },
  ]
};

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/search-results', label: 'Search', icon: Search },
  { href: '/playlist-view', label: 'My Playlist', icon: ListMusic },
  { href: '/artist-profile', label: 'Favorite Artist', icon: Mic2 },
  { href: '/album-view', label: 'Cool Album', icon: Music },
];

const ArtistProfilePage = () => {
  console.log('ArtistProfilePage loaded');
  const [isFollowed, setIsFollowed] = useState(artistProfile.isFollowed);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const playArtistTrack = (track: any, index: number) => {
    setCurrentTrack({ ...track, trackNumber: index + 1 });
    setIsPlaying(true);
    setProgress(0);
  };
  
  const playTopTracks = () => {
    if(artistProfile.topTracks.length > 0) {
      playArtistTrack(artistProfile.topTracks[0], 0);
      console.log("Playing top tracks for", artistProfile.name);
    }
  }

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
          {/* Artist Header */}
          <div className="relative h-64 md:h-80 bg-gradient-to-b from-blue-400 to-yellow-200">
            <img src={artistProfile.imageUrl} alt={artistProfile.name} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white shadow-lg">{artistProfile.name}</h1>
              <p className="text-lg text-yellow-300 font-semibold mt-1">{artistProfile.monthlyListeners} monthly listeners</p>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md px-8" onClick={playTopTracks}>
                <Play className="mr-2 h-5 w-5 fill-white" /> Play
              </Button>
              <Button 
                variant={isFollowed ? "default" : "outline"} 
                size="lg" 
                onClick={() => setIsFollowed(!isFollowed)}
                className={isFollowed ? "bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md" : "border-blue-500 text-blue-700 hover:bg-blue-100 rounded-full shadow-md"}
              >
                {isFollowed ? <CheckCircle className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
                {isFollowed ? 'Following' : 'Follow'}
              </Button>
            </div>

            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4">
                <CardDescription className="text-blue-700 leading-relaxed">{artistProfile.bio}</CardDescription>
              </CardContent>
            </Card>

            <Tabs defaultValue="topTracks" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-blue-100 text-blue-700">
                <TabsTrigger value="topTracks" className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-800">Top Tracks</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-800">Albums</TabsTrigger>
                <TabsTrigger value="relatedArtists" className="data-[state=active]:bg-yellow-300 data-[state=active]:text-yellow-800">Related Artists</TabsTrigger>
              </TabsList>
              <TabsContent value="topTracks" className="mt-4">
                <div className="space-y-1">
                  {artistProfile.topTracks.map((track, index) => (
                    <TrackListItem
                      key={track.id}
                      trackNumber={index + 1}
                      {...track}
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      isActive={currentTrack?.id === track.id}
                      onPlayClick={() => playArtistTrack(track, index)}
                      onPauseClick={() => setIsPlaying(false)}
                      onItemClick={() => playArtistTrack(track, index)}
                      className="bg-white/70 rounded-md hover:bg-blue-100/80"
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="albums" className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {artistProfile.albums.map(album => (
                    <MediaItemCard
                      key={album.id}
                      {...album}
                      onPlayClick={() => console.log('Play album', album.id)}
                      onPrimaryClick={() => console.log('View album', album.id)}
                      className="bg-white/70"
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="relatedArtists" className="mt-4">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {artistProfile.relatedArtists.map(artist => (
                    <MediaItemCard
                      key={artist.id}
                      {...artist}
                      onPrimaryClick={() => console.log('View artist', artist.id)}
                      className="bg-white/70"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        <PlaybackControlBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={currentTrack ? 220 : 0}
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

export default ArtistProfilePage;