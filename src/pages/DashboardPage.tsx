import React, { useState } from 'react';
import ThemedCollapsibleSidebar from '@/components/layout/ThemedCollapsibleSidebar';
import Carousel from '@/components/Carousel';
import MediaItemCard, { MediaItemType } from '@/components/MediaItemCard';
import PlaybackControlBar from '@/components/layout/PlaybackControlBar';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Search, Music, ListMusic, Mic2, Settings, LogOut, UserCircle } from 'lucide-react';

// Placeholder data
const featuredSlides = [
  <MediaItemCard key="f1" id="f1" title="Summer Vibes Mix" subtitle="Playlist" itemType="playlist" imageUrl="https://picsum.photos/seed/summerplaylist/600/300" onPlayClick={() => console.log('Play f1')} onPrimaryClick={() => console.log('View f1')} />,
  <MediaItemCard key="f2" id="f2" title="New Pop Hits" subtitle="Album by PopStar" itemType="album" imageUrl="https://picsum.photos/seed/pophits/600/300" onPlayClick={() => console.log('Play f2')} onPrimaryClick={() => console.log('View f2')} />,
  <MediaItemCard key="f3" id="f3" title="Acoustic Mornings" subtitle="Playlist" itemType="playlist" imageUrl="https://picsum.photos/seed/acoustic/600/300" onPlayClick={() => console.log('Play f3')} onPrimaryClick={() => console.log('View f3')} />,
];

const newReleases: Array<{ id: string; title: string; subtitle: string; itemType: MediaItemType; imageUrl: string }> = [
  { id: 'nr1', title: 'Galaxy Tunes', subtitle: 'Cosmic Band', itemType: 'album', imageUrl: 'https://picsum.photos/seed/galaxy/200/200' },
  { id: 'nr2', title: 'Retro Beats', subtitle: 'DJ Oldschool', itemType: 'album', imageUrl: 'https://picsum.photos/seed/retro/200/200' },
  { id: 'nr3', title: 'Chillhop Essentials', subtitle: 'Various Artists', itemType: 'playlist', imageUrl: 'https://picsum.photos/seed/chillhop/200/200' },
  { id: 'nr4', title: 'Future Funk', subtitle: 'Synthwave Pro', itemType: 'album', imageUrl: 'https://picsum.photos/seed/futurefunk/200/200' },
];

const recommendedForYou = newReleases.slice(0,3).reverse(); // Re-use for simplicity

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/search-results', label: 'Search', icon: Search },
  { href: '/playlist-view', label: 'My Playlist', icon: ListMusic }, // Example link
  { href: '/artist-profile', label: 'Favorite Artist', icon: Mic2 }, // Example link
  { href: '/album-view', label: 'Cool Album', icon: Music }, // Example link
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const playDemoTrack = (item: any) => {
    setCurrentTrack({ id: item.id, title: item.title, artist: item.subtitle, albumArtUrl: item.imageUrl });
    setIsPlaying(true);
    setProgress(0);
    // Simulate playback
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return p + 5;
      });
    }, 1000);
  };


  return (
    <div className="flex h-screen bg-blue-50">
      <ThemedCollapsibleSidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-blue-200">
          <div className="w-1/3">
            <Input type="search" placeholder="Search music, artists, playlists..." className="bg-blue-50 border-blue-300 focus:bg-white" />
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
              <DropdownMenuSeparator />
              <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:text-red-600 focus:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content Area */}
        <ScrollArea className="flex-1 p-4 md:p-6 pb-[100px]"> {/* Padding bottom for PlaybackControlBar */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome Back!</h1>
            <Carousel slides={featuredSlides} className="rounded-lg overflow-hidden shadow-lg border border-blue-200" />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">New Releases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {newReleases.map(item => (
                <MediaItemCard
                  key={item.id}
                  {...item}
                  onPlayClick={() => playDemoTrack(item)}
                  onPrimaryClick={() => console.log(`View ${item.itemType}: ${item.title}`)}
                  onAddToLibraryClick={() => console.log(`Add ${item.title} to library`)}
                  className="bg-white"
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Recommended For You</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recommendedForYou.map(item => (
                <MediaItemCard
                  key={item.id}
                  {...item}
                  onPlayClick={() => playDemoTrack(item)}
                  onPrimaryClick={() => console.log(`View ${item.itemType}: ${item.title}`)}
                  className="bg-white"
                />
              ))}
            </div>
          </section>
        </ScrollArea>

        {/* Playback Control Bar */}
        <PlaybackControlBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={currentTrack ? 120 : 0} // Dummy duration
          volume={volume}
          isMuted={isMuted}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log('Next track')}
          onPrevious={() => console.log('Previous track')}
          onSeek={setProgress}
          onVolumeChange={setVolume}
          onMuteToggle={() => setIsMuted(!isMuted)}
          onRepeatToggle={() => setIsRepeat(!isRepeat)}
          onShuffleToggle={() => setIsShuffle(!isShuffle)}
          onQueueToggle={() => console.log('Toggle queue')}
        />
      </div>
    </div>
  );
};

export default DashboardPage;