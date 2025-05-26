import React from 'react';
import { useTheme } from 'next-themes'; // Assuming next-themes is set up
import { Button } from '@/components/ui/button';
import { Sun, Moon, Search, Bell, MessageSquare, Settings, LogOut, Maximize, Minimize, Home } from 'lucide-react'; // Added Home
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '@/contexts/useAuth'; // Import useAuth

const AdminHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const { signOut } = useAuth(); // Get signOut function from auth context

  // System status data
  const systemStatus = {
    status: "operational", // Can be: operational, degraded, maintenance, outage
    uptime: "99.98%",
    lastChecked: new Date().toLocaleTimeString()
  };

  // Get status color based on system status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-blue-500';
      case 'outage':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded';
      case 'maintenance':
        return 'Maintenance';
      case 'outage':
        return 'Outage';
      default:
        return 'Unknown';
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const handleExitAdmin = async () => {
    await signOut();
    // No need to navigate here, signOut or AuthContext listener likely handles redirection
  };

  // Listen for fullscreen changes (e.g., user pressing Esc)
  React.useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return (
    <header className="bg-background border-b p-2 flex items-center justify-between text-foreground"> {/* Use theme-aware colors */}
      <div className="flex items-center">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" /> {/* Use theme-aware colors */}
          <input
            type="text"
            placeholder="Search Dashboard"
            className="pl-10 pr-4 py-2 bg-muted text-foreground rounded-md border focus:ring-1 focus:ring-primary focus:outline-none w-64" // Use theme-aware colors
          />
        </div>
      </div>

      <div className="flex items-center gap-2"> {/* Reduced gap slightly */}
        {/* System Status Indicator */}
        <div className="hidden md:flex items-center mr-3 bg-muted px-3 py-1 rounded"> {/* Use theme-aware colors */}
          <div className={`h-2 w-2 rounded-full ${getStatusColor(systemStatus.status)} mr-2`}></div>
          <span className="text-xs text-muted-foreground"> {/* Use theme-aware colors */}
            System {getStatusLabel(systemStatus.status)} | Uptime: {systemStatus.uptime}
          </span>
        </div>

        {/* Exit Admin Button */}
        <Button variant="outline" size="sm" onClick={handleExitAdmin} className="text-muted-foreground hover:text-foreground">
          <Home className="h-4 w-4 mr-1" />
          Exit Admin
        </Button>

        {/* Fullscreen Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="text-muted-foreground hover:text-foreground">
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <div className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span> {/* Use theme-aware colors */}
          </div>
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MessageSquare className="h-5 w-5" />
        </Button>

        {/* User Info - Simplified for space */}
        <div className="flex items-center gap-2 border-l pl-2 ml-1">
          <div className="h-8 w-8 rounded-full bg-muted overflow-hidden flex items-center justify-center">
             {/* Consider using an actual user avatar if available */}
            <img src="https://i.pravatar.cc/32" alt="User" className="h-full w-full object-cover" />
          </div>
           {/* Tooltip or dropdown could show full email/name on hover/click */}
        </div>

        {/* Settings & Logout - Consider moving to a dropdown menu under user avatar */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
           <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
           <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;