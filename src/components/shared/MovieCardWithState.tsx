import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MovieCard from '@/components/shared/MovieCard';
import { MovieListItem } from '@/shared/interfaces/all-movies.interface';
import { HomeMovies } from '@/shared/interfaces/home.interface';
import { Heart } from "lucide-react";

// União de tipos para aceitar tanto MovieListItem quanto HomeMovies
type MovieProp = MovieListItem | HomeMovies;

interface MovieCardWithStateProps {
  movie: MovieProp;
  showGenre?: boolean;
}

/**
 * Componente de card de filme que preserva o estado de navegação
 * Este componente é um wrapper para o MovieCard existente que adiciona
 * o estado da navegação para que o botão de voltar funcione corretamente
 */
const MovieCardWithState: React.FC<MovieCardWithStateProps> = ({ movie, showGenre }) => {
  const location = useLocation();
  
  // Função auxiliar para obter o slug do filme de forma segura
  const getSlug = (): string => {
    if ('slug' in movie && movie.slug) {
      return movie.slug;
    }
    if ('id' in movie) {
      return String(movie.id);
    }
    return '';
  };
  
  // Função para renderizar as estrelas de rating
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
  
  // Armazenamos a informação necessária para voltar à página com os filtros corretos
  const navigationState = {
    from: location.pathname + location.search,
    fromFilmes: true,
    filterPath: location.search
  };
  
  return (
    <Link 
      to={`/filme/${getSlug()}`}
      state={navigationState}
      className="group h-full"
    >
      <div className="movie-card bg-card rounded-lg overflow-hidden h-full flex flex-col">
        {/* Este componente renderiza o mesmo conteúdo do MovieCard */}
        {/* mas sem o Link, já que o Link está neste componente */}
        <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0 bg-muted">
          <img
            src={movie.posterImage}
            alt={`Poster do filme ${movie.title}`}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.objectFit = 'contain';
              target.style.backgroundColor = 'var(--muted)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <div className="h-14 mb-3 flex items-start">
            <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-accent transition-colors leading-tight">
              {movie.title}
            </h3>
          </div>
          
          {/* Rating Section - Exibindo estrelas de rating */}
          <div className="h-6 flex items-center space-x-1 mb-3">
            {('rating' in movie && movie.rating) ? 
              renderStars(typeof movie.rating === 'string' ? parseFloat(movie.rating) : Number(movie.rating)) 
              : renderStars(0)
            }
            <span className="text-sm text-muted-foreground ml-2">
              {('rating' in movie && movie.rating) ? 
                `(${movie.rating})` 
                : "(0)"
              }
            </span>
          </div>
          
          <div className="mt-auto">
            <div className="text-sm text-muted-foreground">
              {movie.releaseDate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCardWithState;
