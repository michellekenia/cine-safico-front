import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MovieCard from '@/components/shared/MovieCard';
import { MovieListItem } from '@/shared/interfaces/all-movies.interface';

interface MovieCardWithStateProps {
  movie: MovieListItem;
  showGenre?: boolean;
}

/**
 * Componente de card de filme que preserva o estado de navegação
 * Este componente é um wrapper para o MovieCard existente que adiciona
 * o estado da navegação para que o botão de voltar funcione corretamente
 */
const MovieCardWithState: React.FC<MovieCardWithStateProps> = ({ movie, showGenre }) => {
  const location = useLocation();
  
  // Armazenamos a informação necessária para voltar à página com os filtros corretos
  const navigationState = {
    from: location.pathname + location.search,
    fromFilmes: true,
    filterPath: location.search
  };
  
  return (
    <Link 
      to={`/filme/${movie.slug}`}
      state={navigationState}
      className="group h-full"
    >
      <div className="movie-card bg-card rounded-lg overflow-hidden h-full flex flex-col">
        {/* Este componente renderiza o mesmo conteúdo do MovieCard */}
        {/* mas sem o Link, já que o Link está neste componente */}
        <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0">
          <img
            src={movie.posterImage}
            alt={`Poster do filme ${movie.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <div className="h-14 mb-3 flex items-start">
            <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-accent transition-colors leading-tight">
              {movie.title}
            </h3>
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
