import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMovieById } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Calendar, Clock, User, Users } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const movie = getMovieById(Number(id));

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Filme não encontrado</h1>
          <Button onClick={() => navigate("/filmes")}>
            Voltar para todos os filmes
          </Button>
        </div>
      </div>
    );
  }

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    setIsEditing(false);
    // Here you would typically save the rating to a backend
    console.log(`Rating saved: ${rating}/5 for movie ${movie.title}`);
  };

  const renderRatingHearts = (rating: number, isInteractive = false) => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (isInteractive ? (hoverRating || userRating) : Math.floor(rating));
      hearts.push(
        <Heart
          key={i}
          className={`w-6 h-6 transition-all duration-200 ${
            filled ? "text-accent fill-accent" : "text-muted-foreground"
          } ${isInteractive ? "cursor-pointer hover:scale-110 hover:text-accent" : ""}`}
          onClick={isInteractive ? () => handleRatingClick(i) : undefined}
          onMouseEnter={isInteractive ? () => setHoverRating(i) : undefined}
          onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
        />
      );
    }
    return hearts;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        {/* Movie Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={movie.poster}
                alt={`Poster do filme ${movie.title}`}
                className="w-full h-full object-cover"
              />
              <div className="geometric-accent absolute top-4 right-4" />
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                {movie.title}
              </h1>
              <div className="geometric-accent-small" />
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Movie Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <User className="w-4 h-4 mr-2" />
                <span>{movie.director}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avaliação Geral</p>
                  <div className="flex items-center gap-2">
                    {renderRatingHearts(movie.rating)}
                    <span className="text-lg font-semibold text-foreground">
                      {movie.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* User Rating */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">
                    Sua Avaliação
                  </p>
                  {userRating > 0 && !isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs text-accent hover:text-accent/80 transition-colors underline"
                    >
                      Editar
                    </button>
                  )}
                </div>
                
                {isEditing || userRating === 0 ? (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Clique em uma estrela para avaliar:
                    </p>
                    <div className="flex items-center gap-2">
                      {renderRatingHearts(userRating, true)}
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="text-xs text-muted-foreground hover:text-accent transition-colors underline"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            setUserRating(0);
                            setIsEditing(false);
                          }}
                          className="text-xs text-destructive hover:text-destructive/80 transition-colors underline"
                        >
                          Remover Avaliação
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {renderRatingHearts(userRating, false)}
                    <span className="text-sm text-accent ml-2">
                      {userRating}/5
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Sinopse</h2>
              <p className="text-foreground leading-relaxed">
                {movie.synopsis}
              </p>
            </div>

            {/* Cast & Crew */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Direção</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Elenco Principal</h3>
                <div className="space-y-1">
                  {movie.cast.map((actor, index) => (
                    <p key={index} className="text-muted-foreground">
                      {actor}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="btn-primary"
            onClick={() => navigate("/filmes")}
          >
            Explorar Mais Filmes
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open(`mailto:saficocine@gmail.com?subject=Sobre ${movie.title}`, '_blank')}
          >
            Sugerir Correção
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;