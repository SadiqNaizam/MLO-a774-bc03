import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists
import DashboardPage from "./pages/DashboardPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import PlaylistViewPage from "./pages/PlaylistViewPage";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import AlbumViewPage from "./pages/AlbumViewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          {/* Consider dynamic paths like /playlist/:id in a real app */}
          <Route path="/playlist-view" element={<PlaylistViewPage />} /> 
          <Route path="/artist-profile" element={<ArtistProfilePage />} />
          <Route path="/album-view" element={<AlbumViewPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;