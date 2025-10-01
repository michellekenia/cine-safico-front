import { useState, useEffect } from "react";
import { Film, Heart, Sparkles, Star } from "lucide-react";

interface LoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "cinematic";
}

const Loader = ({ 
  message = "Carregando filmes...", 
  size = "md",
  variant = "cinematic"
}: LoaderProps) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const icons = [Film, Heart, Sparkles, Star];
  const IconComponent = icons[currentIcon];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  if (variant === "minimal") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className={`${sizeClasses[size]} border-2 border-primary/20 border-t-primary rounded-full animate-spin`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Film className={`${size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"} text-primary animate-pulse`} />
          </div>
        </div>
        <p className={`${textSizeClasses[size]} text-muted-foreground font-medium`}>
          {message}
        </p>
      </div>
    );
  }

  if (variant === "default") {
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse`}>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-accent animate-spin" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className={`${size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"} text-white animate-bounce`} />
          </div>
        </div>
        <div className="text-center">
          <p className={`${textSizeClasses[size]} font-semibold text-foreground mb-2`}>
            {message}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  // Cinematic variant (default)
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      {/* Main Loader Animation */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-primary/10 animate-spin`} style={{ animationDuration: "3s" }} />
        
        {/* Middle ring */}
        <div className={`absolute inset-2 rounded-full border-2 border-accent/20 animate-spin`} style={{ animationDuration: "2s", animationDirection: "reverse" }} />
        
        {/* Inner pulsing circle */}
        <div className={`absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse`} />
        
        {/* Central icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <IconComponent className={`${size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"} text-primary animate-pulse`} />
        </div>
      </div>

      {/* Floating elements */}
      <div className="relative w-32 h-8">
        <div className="absolute top-0 left-0 w-2 h-2 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: "0ms" }} />
        <div className="absolute top-0 right-0 w-2 h-2 bg-accent/60 rounded-full animate-ping" style={{ animationDelay: "500ms" }} />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: "1000ms" }} />
      </div>

      {/* Message and progress */}
      <div className="text-center space-y-4">
        <h3 className={`${textSizeClasses[size]} font-bold text-foreground`}>
          {message}
        </h3>
        
        {/* Progress bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" 
               style={{ 
                 width: "100%",
                 animation: "progress 2s ease-in-out infinite"
               }} 
          />
        </div>
        
        {/* Subtitle */}
        <p className="text-sm text-muted-foreground">
          Preparando sua experiência cinematográfica...
        </p>
      </div>

      {/* Decorative elements */}
      <div className="flex space-x-2">
        <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
        <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "400ms" }} />
        <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
        <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "800ms" }} />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
