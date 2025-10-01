import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieBySlug } from "@/shared/api/movie-details";
import { MovieDetail } from "@/shared/interfaces/movies-details.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Calendar, Clock, User, Tv, Loader2 } from "lucide-react";


const MovieDetails = () => {
  const { id: slugOrId } = useParams();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // Estados para API
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Buscar dados da API
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!slugOrId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const slug = slugOrId.toString();
        console.log("Buscando filme com slug:", slug);
        
        const data = await getMovieBySlug(slug);
        setMovie(data);
      } catch (error: any) {
        console.error("Erro ao buscar detalhes do filme:", error);
        setError(error.message || "Erro ao carregar detalhes do filme");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [slugOrId]);
  
  const getMovieProperty = {
    poster: () => movie?.posterImage || '',
    year: () => movie?.releaseDate || '',
    genres: () => {
      if (movie?.genres) {
        return movie.genres.map(g => g.nome);
      }
      return [];
    },
    synopsis: () => {
      if (movie) {
        return movie.synopsisPt || movie.synopsisEn || 'Sinopse não disponível';
      }
      return '';
    },
    streamingPlatforms: () => movie?.streamingServices || [],
    cast: () => [] 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-accent mb-4" />
          <p className="text-lg font-medium text-foreground">Carregando filme...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="venus-symbol text-4xl mb-6 opacity-20" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Filme não encontrado</h1>
          <p className="text-muted-foreground mb-4">
            Não foi possível encontrar um filme com o identificador "{slugOrId}".
            {error && (
              <span className="block mt-2 text-sm text-red-500">
                Erro: {error}
              </span>
            )}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button variant="default" onClick={() => navigate("/filmes")}>
              Ver todos os filmes
            </Button>
          </div>
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
                src={getMovieProperty.poster()}
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
              {getMovieProperty.genres().map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Movie Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{getMovieProperty.year()}</span>
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
                    {renderRatingHearts(typeof movie.rating === 'string' ? parseFloat(movie.rating) : movie.rating)}
                    <span className="text-lg font-semibold text-foreground">
                      {movie.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* User Rating */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Sua Avaliação
                </p>
                
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
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {renderRatingHearts(userRating, false)}
                      <span className="text-sm text-accent ml-1">
                        {userRating}/5
                      </span>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs text-accent hover:text-accent/80 transition-colors underline"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Sinopse</h2>
              <p className="text-foreground leading-relaxed">
                {getMovieProperty.synopsis()}
              </p>
            </div>

            {/* Streaming Platforms */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                <Tv className="w-5 h-5 mr-2" />
                Onde Assistir
              </h2>
              <div className="flex flex-wrap gap-2">
                {getMovieProperty.streamingPlatforms().map((platform) => (
                  <Badge key={platform} variant="outline" className="px-3 py-1">
                    {platform}
                  </Badge>
                ))}
                {getMovieProperty.streamingPlatforms().length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Informações de streaming não disponíveis no momento
                  </p>
                )}
              </div>
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
                  {getMovieProperty.cast().map((actor, index) => (
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