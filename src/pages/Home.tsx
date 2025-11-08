// Components
import MovieCard from "@/components/shared/MovieCard";
import MovieCardWithState from "@/components/shared/MovieCardWithState";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";

import { Link } from "react-router-dom";

// React
import { useEffect, useState } from "react";

// Interface
import { GenreSections, HomeMovies } from "@/shared/interfaces/home.interface";
import { GenreItem } from "@/shared/interfaces/all-genres.interface";

import {
  getHighLightsMovies,
  getGenresMovies,
} from "@/shared/api/home-movies";
import { getAllGenres } from "@/shared/api/all-genres";
import useScrollToTop from "../hooks/useScrollToTop";

const Home = () => {
  useScrollToTop();

  const [highlightMovies, setHighlightMovies] = useState<HomeMovies[]>([]);
  const [genreSections, setGenreSections] = useState<GenreSections>({});
  const [genreSlugsMap, setGenreSlugsMap] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Busca os destaques, seções por gênero e todos os gêneros disponíveis
        const [highlightsResponse, sectionsResponse, allGenresResponse] = await Promise.all([
          getHighLightsMovies(),
          getGenresMovies(),
          getAllGenres()
        ]);

        setHighlightMovies(highlightsResponse);
        setGenreSections(sectionsResponse);
        
        // Cria um mapa de nome do gênero para seu slug
        const genreMap: Record<string, string> = {};
        allGenresResponse.items.forEach((genre: GenreItem) => {
          // Mapeia tanto o nome em português quanto o nome original para o slug
          genreMap[genre.nomePt.toLowerCase()] = genre.slug;
          genreMap[genre.nome.toLowerCase()] = genre.slug;
        });
        
        setGenreSlugsMap(genreMap);
      } catch (err) {
        setError("Erro ao carregar os filmes");
        console.error("Erro:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <Loader 
          message="Carregando filmes em destaque..." 
          size="lg" 
          variant="cinematic" 
        />
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl font-semibold text-red-500">{error}</div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-[70vh] flex items-center justify-center hero-gradient">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 text-center px-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Cine Sáfico
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                Descubra e celebre o cinema LGBTQ+ feminino. Histórias
                autênticas, representação genuína.
              </p>
              <Link to="/filmes">
                <Button size="lg" className="btn-hero">
                  <Play className="w-5 h-5 mr-2" />
                  Ver todos os filmes
                </Button>
              </Link>
            </div>
          </section>

          {/* Featured Movies */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                  Destaques
                </h2>
                <Link
                  to="/filmes"
                  className="flex items-center text-accent hover:underline"
                >
                  Ver todos
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="genre-scroll">
                {highlightMovies.map((movie) => (
                  <div
                    key={movie.slug}
                    className="w-[200px] md:w-[250px] flex-shrink-0"
                  >
                    {/* Usando MovieCardWithState para preservar o estado de navegação */}
                    <MovieCardWithState movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Seções por Gênero */}
          {Object.entries(genreSections).map(([genreName, movies], index) => {
            // Obtém o slug do gênero do nosso mapa, ou usa o nome em minúsculas como fallback
            const genreSlug = genreSlugsMap[genreName.toLowerCase()] || genreName.toLowerCase();
            
            return (
              <section key={genreName} className={index % 2 === 0 ? "py-16 bg-muted/30" : "py-16 bg-background"}>
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-foreground">{genreName}</h2>
                    <Link 
                      to={`/filmes?genre=${genreSlug}`} 
                      className="flex items-center text-accent hover:underline"
                    >
                      Ver todos
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                     <div className="genre-scroll">
                  {movies.map((movie) => (
                    <div key={movie.slug} className="w-[200px] md:w-[250px] flex-shrink-0">
                      {/* Usando MovieCardWithState para preservar o estado de navegação */}
                      <MovieCardWithState movie={movie} />
                    </div>
                  ))}
                </div>
                </div>
              </section>
            );
          })}      
        </>
      )}
    </div>
  );
};

export default Home;
