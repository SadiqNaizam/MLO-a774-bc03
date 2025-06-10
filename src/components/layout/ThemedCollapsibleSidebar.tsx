import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Home, Music, Search, ListMusic, Mic2 } from 'lucide-react'; // Example icons

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType; // Lucide icon component
}

interface ThemedCollapsibleSidebarProps {
  navItems?: NavItem[];
  className?: string;
  // Add props for theme customization if needed, e.g., accentColor
}

const defaultNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/playlists', label: 'Playlists', icon: ListMusic },
  { href: '/artists', label: 'Artists', icon: Mic2 },
  { href: '/albums', label: 'Albums', icon: Music },
];

const ThemedCollapsibleSidebar: React.FC<ThemedCollapsibleSidebarProps> = ({
  navItems = defaultNavItems,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  console.log("Rendering ThemedCollapsibleSidebar, collapsed:", isCollapsed);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Doraemon theme hint: using a light blue background as a placeholder
  const themeClasses = "bg-blue-50 text-blue-800"; // Placeholder theme

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-blue-200 transition-all duration-300 ease-in-out",
        themeClasses,
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="p-2 flex items-center justify-between border-b border-blue-200">
        {!isCollapsed && (
          <Link to="/" className="font-bold text-xl text-blue-700 px-2">
            MusicApp
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggleCollapse} className="text-blue-700 hover:bg-blue-100">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                title={item.label}
                className={cn(
                  "flex items-center p-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-blue-100 hover:text-blue-700", // Doraemon theme: yellow accent on hover/active
                  isActive ? "bg-yellow-300 text-yellow-800 font-semibold" : "text-blue-600",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                <item.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {!isCollapsed && (
        <div className="p-4 mt-auto border-t border-blue-200">
          <p className="text-xs text-blue-500 text-center">© {new Date().getFullYear()} Your Music App</p>
        </div>
      )}
    </aside>
  );
};

export default ThemedCollapsibleSidebar;