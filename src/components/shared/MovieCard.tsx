import { Link } from "react-router-dom";
import { Movie } from "@/data/movies";
import { Heart, Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  showGenre?: boolean;
}

const MovieCard = ({ movie, showGenre = false }: MovieCardProps) => {
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
    <Link to={`/filme/${movie.id}`} className="group">
      <div className="movie-card bg-card rounded-lg overflow-hidden">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={`Poster do filme ${movie.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Venus symbol overlay */}
          <div className="venus-symbol absolute top-2 right-2 text-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(movie.rating)}
            <span className="text-sm text-muted-foreground ml-2">
              ({movie.rating})
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{movie.year}</span>
            {showGenre && movie.genre.length > 0 && (
              <span className="text-xs bg-muted px-2 py-1 rounded">
                {movie.genre[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;