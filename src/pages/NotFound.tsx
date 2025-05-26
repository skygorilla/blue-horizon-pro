import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-background p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="inline-flex items-center justify-center rounded-full bg-red-100 p-4 mb-6">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="display-large mb-2">404</h1>
        <p className="title-medium text-muted-foreground mb-6">Oops! Page not found</p>
        <p className="body-medium mb-6">The page you're looking for doesn't exist or has been moved.</p>
        
        <Button asChild>
          <a href="/">
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
