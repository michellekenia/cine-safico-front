import { Link } from "react-router-dom";
import { HomeMovies } from "@/shared/interfaces/home.interface";
import { MovieListItem } from "@/shared/interfaces/all-movies.interface";
import { MovieDetail } from "@/shared/interfaces/movies-details.interface";
import { Heart } from "lucide-react";

// Tipo unificado para todas as possíveis estruturas de filmes da API
type MovieType = MovieDetail | MovieListItem | HomeMovies;

interface MovieCardProps {
  movie: MovieType;
  showGenre?: boolean;
}

const MovieCard = ({ movie, showGenre = false }: MovieCardProps) => {
  // Funções auxiliares para acessar propriedades de forma segura
  const getPoster = (): string => {
    if ('posterImage' in movie) return movie.posterImage;
    return '';
  };

  const getTitle = (): string => {
    return movie.title || '';
  };

  const getRating = (): number | null => {
    if (!('rating' in movie)) return null;
    const rating = movie.rating as string | number;
    return typeof rating === 'string' ? parseFloat(rating) : Number(rating);
  };

  const getYear = (): string => {
    if ('releaseDate' in movie) return movie.releaseDate;
    return '';
  };

  const getGenres = (): string[] => {
    if ('genres' in movie && Array.isArray(movie.genres)) {
      return movie.genres.map(g => g.nome);
    }
    return [];
  };

  const getSlug = (): string => {
    // Priorizamos o slug da API para navegação
    if ('slug' in movie && movie.slug) return movie.slug;
    
    // Verificamos primeiro se a propriedade existe
    if ('id' in movie) {
      // Usamos type assertion após a verificação
      const id = movie['id' as keyof typeof movie];
      return String(id);
    }
    return '';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Heart key={i} className="w-4 h-4 fill-accent text-accent" />);
    }

    if (hasHalfStar) {
      stars.push(<Heart key="half" className="w-4 h-4 text-accent" />);
    }

    while (stars.length < 5) {
      stars.push(<Heart key={`empty-${stars.length}`} className="w-4 h-4 text-muted-foreground" />);
    }

    return stars;
  };

  return (
    <Link to={`/filme/${getSlug()}`} className="group h-full">
      <div className="movie-card bg-card rounded-lg overflow-hidden h-full flex flex-col">
        {/* Poster Section - Fixed Height */}
        <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0">
          <img
            src={getPoster()}
            alt={`Poster do filme ${getTitle()}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content Section - Flexible Height with Fixed Structure */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title - Fixed Height Container */}
          <div className="h-14 mb-3 flex items-start">
            <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-accent transition-colors leading-tight">
              {getTitle()}
            </h3>
          </div>
          
          {/* Rating Section - Fixed Height */}
          <div className="h-6 flex items-center space-x-1 mb-3">
            {renderStars(getRating() || 0)}
            <span className="text-sm text-muted-foreground ml-2">
              ({getRating()})
            </span>
          </div>
          
          {/* Footer Section - Fixed Height */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
            <span className="truncate">{getYear()}</span>
            {showGenre && getGenres().length > 0 && (
              <span className="text-xs bg-muted px-2 py-1 rounded flex-shrink-0 ml-2">
                {getGenres()[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;