import { getFeaturedMovies, getMoviesByGenre } from "@/mocks/movies";

// Components
import MovieCard from "@/components/shared/MovieCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";

import { Link } from "react-router-dom";

// React
import { useEffect, useState } from "react";

// Interface
import { HomeMovies } from "@/shared/interfaces/home.interface";

// Api
import { getHighLightsMovies, getGenresMovies } from "../shared/api/home-movies";


const Home = () => {
  const [highlightMovies, setHighlightMovies] = useState<HomeMovies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actionMovies, setActionMovies] = useState<HomeMovies[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<HomeMovies[]>([]);
  const [comedyMovies, setComedyMovies] = useState<HomeMovies[]>([]);
  

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const highlightsResponse = await getHighLightsMovies();
        setHighlightMovies(highlightsResponse);

        const [actionResponse, horrorResponse, comedyResponse] = await Promise.all([
          getGenresMovies('action'),
          getGenresMovies('horror'),
          getGenresMovies('comedy')
        ]);

        setActionMovies(actionResponse);
        setHorrorMovies(horrorResponse);
        setComedyMovies(comedyResponse);
      } catch (err) {
        setError('Erro ao carregar os filmes');
        console.error('Erro:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl font-semibold text-accent">Carregando filmes...</div>
        </div>
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
              <div className="venus-symbol text-6xl mb-4 opacity-20" />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Cine Sáfico
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                Descubra e celebre o cinema LGBTQ+ feminino. 
                Histórias autênticas, representação genuína.
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
                <h2 className="text-3xl font-bold text-foreground">Destaques</h2>
                <Link to="/filmes" className="flex items-center text-accent hover:underline">
                  Ver todos
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="genre-scroll">
                {highlightMovies.map((movie) => (
                  <div key={movie.slug} className="min-w-[200px] md:min-w-[250px]">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          </section>

      {/* Action Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Action</h2>
            <Link to="/filmes?genre=Drama" className="flex items-center text-accent hover:underline">
              Ver todos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="genre-scroll">
            {isLoading ? (
              <div className="w-full text-center">Carregando...</div>
            ) : error ? (
              <div className="w-full text-center text-red-500">{error}</div>
            ) : (
              actionMovies.slice(0, 6).map((movie) => (
                <div key={movie.slug} className="min-w-[200px] md:min-w-[250px]">
                  <MovieCard movie={movie} showGenre />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Horror Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Terror</h2>
            <Link to="/filmes?genre=Romance" className="flex items-center text-accent hover:underline">
              Ver todos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="genre-scroll">
            {isLoading ? (
              <div className="w-full text-center">Carregando...</div>
            ) : error ? (
              <div className="w-full text-center text-red-500">{error}</div>
            ) : (
              horrorMovies.slice(0, 6).map((movie) => (
                <div key={movie.slug} className="min-w-[200px] md:min-w-[250px]">
                  <MovieCard movie={movie} showGenre />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Comedy Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Comédia</h2>
            <Link to="/filmes?genre=Comédia" className="flex items-center text-accent hover:underline">
              Ver todos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="genre-scroll">
            {isLoading ? (
              <div className="w-full text-center">Carregando...</div>
            ) : error ? (
              <div className="w-full text-center text-red-500">{error}</div>
            ) : (
              comedyMovies.slice(0, 6).map((movie) => (
                <div key={movie.slug} className="min-w-[200px] md:min-w-[250px]">
                  <MovieCard movie={movie} showGenre />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
};

export default Home;