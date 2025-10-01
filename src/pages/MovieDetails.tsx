import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, Suspense } from "react";
import { getMovieBySlug } from "@/shared/api/movie-details";
import { MovieDetail } from "@/shared/interfaces/movies-details.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LinkBadge } from "@/components/ui/link-badge";
import LoadingBar from "@/components/ui/loading-bar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Heart, Calendar, Clock, Tv, Loader2, AlertCircle } from "lucide-react";


const MovieDetails = () => {
  const { id: slugOrId } = useParams();
  const navigate = useNavigate();
  
  // Estados para API
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingTime, setLoadingTime] = useState<number>(0);
  
  const fetchMovieDetails = useCallback(async () => {
    if (!slugOrId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const slug = slugOrId.toString();
      console.log("Buscando filme com slug:", slug);
      
      const timeoutPromise = new Promise<MovieDetail>((_, reject) => {
        setTimeout(() => reject(new Error('Tempo limite excedido. O servidor pode estar sobrecarregado.')), 40000);
      });
      
      const data = await Promise.race([
        getMovieBySlug(slug),
        timeoutPromise
      ]);
      
      if (!data || !data.title) {
        throw new Error('Dados incompletos recebidos da API');
      }
      
      setMovie(data);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Erro ao buscar detalhes do filme:", error);
      setError(error.message || "Erro ao carregar detalhes do filme");
      setIsLoading(false);
      
      setMovie(null);
    }
  }, [slugOrId]);

  // Buscar dados da API
  useEffect(() => {
    let timer: number | null = null;
    
    if (isLoading) {
      setLoadingTime(0);
      
      timer = window.setInterval(() => {
        setLoadingTime(prev => {
          const newValue = prev + 1;
          if (newValue === 20) {
            fetchMovieDetails();
          }
          return newValue;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isLoading, fetchMovieDetails]);

  useEffect(() => {
    let isActive = true;
    
    (async () => {
      try {
        if (isActive) {
          await fetchMovieDetails();
        }
      } catch (e) {
        console.error("Erro no useEffect:", e);
        if (isActive) {
          setIsLoading(false);
          setError("Ocorreu um erro inesperado. Por favor, tente novamente.");
        }
      }
    })();
    
    return () => {
      isActive = false;
    };
  }, [fetchMovieDetails]);
  
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
    streamingPlatforms: () => {
      if (!movie?.streamingServices) return [];
      return movie.streamingServices;
    },
    getStreamingName: (platform: string | { service: string, id: string, link?: string, scrapedMovieId?: string }) => {
      if (typeof platform === 'string') return platform;
      return platform.service || 'Desconhecido';
    },
    getStreamingLink: (platform: string | { service: string, id: string, link?: string, scrapedMovieId?: string }) => {
      if (typeof platform === 'string' || !platform.link) return null;
      return platform.link;
    },
    getStreamingKey: (platform: string | { id: string, service: string }) => {
      if (typeof platform === 'string') return platform;
      return platform.id || platform.service;
    },
    cast: () => [] 
  };

  // Componente de fallback para problemas de renderização
  const renderFallback = () => {

    const content = isLoading ? (
   
      <div className="text-center w-full max-w-md">
        <Loader2 className="w-10 h-10 animate-spin mx-auto text-accent mb-4" />
        <p className="text-lg font-medium text-foreground mb-6">Carregando filme...</p>
        <div className="w-full mb-2">
          <LoadingBar />
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          {loadingTime < 3 
            ? "Carregando detalhes do filme..." 
            : loadingTime < 10 
              ? "Isso pode levar alguns segundos. Estamos buscando os dados..." 
              : `Nosso servidor pode estar acordando. Tentando novamente em ${Math.max(0, 20 - loadingTime)} segundos...`}
        </p>
        <p className="text-xs text-muted-foreground">
          {loadingTime > 3 && `Tempo de carregamento: ${loadingTime} segundos`}
        </p>
        {loadingTime > 5 && (
          <Button 
            variant="ghost" 
            className="mt-6" 
            onClick={() => fetchMovieDetails()}
          >
            Tentar novamente
          </Button>
        )}
      </div>
    ) : error ? (
      // Estado de erro
      <div className="text-center max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Ops, algo deu errado</h1>
        <p className="text-muted-foreground mb-4">
          {error}
        </p>
        <div className="w-full mb-6 mt-4">
          <LoadingBar />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => fetchMovieDetails()}>
            Tentar novamente
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button variant="default" onClick={() => navigate("/filmes")}>
            Ver todos os filmes
          </Button>
        </div>
      </div>
    ) : !movie ? (
      // Filme não encontrado
      <div className="text-center max-w-md mx-auto">
        <div className="venus-symbol text-4xl mb-6 opacity-20" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Filme não encontrado</h1>
        <p className="text-muted-foreground mb-4">
          Não foi possível encontrar um filme com o identificador "{slugOrId}".
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
    ) : null;
    
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        {content}
      </div>
    );
  };

  if (isLoading || error || !movie) {
    return renderFallback();
  }

  // Função para avaliação própria - será implementada posteriormente
  /*
  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    setIsEditing(false);
    // Here you would typically save the rating to a backend
    console.log(`Rating saved: ${rating}/5 for movie ${movie.title}`);
  };
  */

  // avaliação geral
  const renderRatingHearts = (rating: number, isInteractive = false) => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= Math.floor(rating);
      hearts.push(
        <Heart
          key={i}
          className={`w-6 h-6 transition-all duration-200 ${
            filled ? "text-accent fill-accent" : "text-muted-foreground"
          }`}
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
          <div className="lg:col-span-1 flex flex-col">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-elegant mb-4">
              <img
                src={getMovieProperty.poster()}
                alt={`Poster do filme ${movie.title}`}
                className="w-full h-full object-cover"
              />
              <div className="geometric-accent absolute top-4 right-4" />
            </div>
            <div className="mt-6 flex justify-center">
              <Button 
                size="lg" 
                variant="default"
                className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                onClick={() => navigate("/filmes")}
                aria-label="Explorar mais filmes com temática lésbica"
              >
                Explorar Mais Filmes
              </Button>
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
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{getMovieProperty.year()}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>{movie.duration}</span>
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

              {/* User Rating - será implementado posteriormente
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
              */}
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
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  {getMovieProperty.streamingPlatforms().map((platform) => {
                    const link = getMovieProperty.getStreamingLink(platform);
                    const serviceName = getMovieProperty.getStreamingName(platform);
                    const key = getMovieProperty.getStreamingKey(platform);
                    
                    // Se tiver link, renderiza como LinkBadge com tooltip, senão como Badge regular
                    return link ? (
                      <Tooltip key={key}>
                        <TooltipTrigger asChild>
                          <LinkBadge
                            href={link}
                            variant="outline"
                            className="px-3 py-1 hover:border-accent hover:text-accent"
                          >
                            {serviceName}
                          </LinkBadge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Clique para assistir no {serviceName}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge
                        key={key}
                        variant="outline"
                        className="px-3 py-1"
                      >
                        {serviceName}
                      </Badge>
                    );
                  })}
                  {getMovieProperty.streamingPlatforms().length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      Informações de streaming não disponíveis no momento
                    </p>
                  )}
                </div>
              </TooltipProvider>
            </div>

            {/* Director */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Direção</h3>
              <p className="text-muted-foreground">{movie.director}</p>
            </div>
            
            {/* Additional Info - Countries and Languages */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                {/* Countries */}
                {movie.country && movie.country.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">País</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.country.map(country => (
                        <Badge key={country.id} variant="secondary">
                          {country.nomePt || country.nome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Languages */}
                {movie.language && movie.language.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Idioma</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.language.map(lang => (
                        <Badge key={lang.id} variant="secondary">
                          {lang.nomePt || lang.nome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Removido botão duplicado */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Botão "Explorar Mais Filmes" foi movido para abaixo do poster */}
          {/* Botão "Sugerir Correção" será implementado posteriormente
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open(`mailto:saficocine@gmail.com?subject=Sobre ${movie.title}`, '_blank')}
          >
            Sugerir Correção
          </Button>
          */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;