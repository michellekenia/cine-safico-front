import { useState, useEffect } from "react";
import { Film, Heart, Sparkles, Star, Play, Camera } from "lucide-react";

interface MoviesLoaderProps {
  message?: string;
  showMovieCards?: boolean;
}

const MoviesLoader = ({ 
  message = "Carregando catálogo de filmes...",
  showMovieCards = true 
}: MoviesLoaderProps) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  
  const icons = [Film, Heart, Sparkles, Star, Camera, Play];
  const IconComponent = icons[currentIcon];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 1000);

    const cardInterval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 6);
    }, 300);

    return () => {
      clearInterval(iconInterval);
      clearInterval(cardInterval);
    };
  }, []);

  const MovieCardSkeleton = ({ index }: { index: number }) => (
    <div className={`bg-card rounded-lg overflow-hidden h-full flex flex-col transition-all duration-500 ${
      index === currentCard ? 'scale-105 shadow-lg' : 'opacity-60'
    }`}>
      {/* Poster skeleton */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-2 right-2">
          <IconComponent className="w-6 h-6 text-primary/40 animate-pulse" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title skeleton */}
        <div className="h-14 mb-3 flex items-start">
          <div className="w-full space-y-2">
            <div className="h-4 bg-muted/60 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
            <div className="h-4 bg-muted/40 rounded animate-pulse" style={{ width: `${40 + Math.random() * 30}%` }} />
          </div>
        </div>
        
        {/* Rating skeleton */}
        <div className="h-6 flex items-center space-x-1 mb-3">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Heart key={i} className="w-4 h-4 text-muted/40" />
            ))}
          </div>
          <div className="w-8 h-4 bg-muted/40 rounded animate-pulse ml-2" />
        </div>
        
        {/* Footer skeleton */}
        <div className="flex items-center justify-between text-sm mt-auto">
          <div className="w-16 h-4 bg-muted/40 rounded animate-pulse" />
          <div className="w-12 h-6 bg-muted/40 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold text-primary mr-4">
              Todos os Filmes
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore nosso catálogo completo de cinema sáfico
          </p>
        </div>

        {/* Main loader */}
        <div className="flex flex-col items-center justify-center space-y-8 py-16">
          {/* Central animation */}
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-20 h-20 rounded-full border-4 border-primary/10 animate-spin" style={{ animationDuration: "4s" }} />
            
            {/* Middle ring */}
            <div className="absolute inset-3 rounded-full border-2 border-accent/20 animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }} />
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse" />
            
            {/* Central icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-primary animate-bounce" />
            </div>
          </div>

          {/* Floating film elements */}
          <div className="relative w-40 h-12">
            <div className="absolute top-0 left-0 w-3 h-3 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: "0ms" }} />
            <div className="absolute top-0 right-0 w-3 h-3 bg-accent/60 rounded-full animate-ping" style={{ animationDelay: "800ms" }} />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: "1600ms" }} />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent/40 rounded-full animate-ping" style={{ animationDelay: "400ms" }} />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: "1200ms" }} />
          </div>

          {/* Message */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              {message}
            </h3>
            
            {/* Progress bar */}
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" 
                   style={{ 
                     width: "100%",
                     animation: "progress-slide 3s ease-in-out infinite"
                   }} 
              />
            </div>
            
            <p className="text-muted-foreground">
              Descobrindo histórias incríveis para você...
            </p>
          </div>

          {/* Decorative dots */}
          <div className="flex space-x-3">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" 
                style={{ animationDelay: `${i * 100}ms` }} 
              />
            ))}
          </div>
        </div>

        {/* Movie cards skeleton */}
        {showMovieCards && (
          <div className="mt-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {[...Array(12)].map((_, index) => (
                <MovieCardSkeleton key={index} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* A animação de progresso é controlada pelo Tailwind e CSS global */}
      </div>
    </div>
  );
};

export default MoviesLoader;
