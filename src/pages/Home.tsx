import { getFeaturedMovies, getMoviesByGenre } from "@/data/movies";
import MovieCard from "@/components/shared/MovieCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Play } from "lucide-react";

const Home = () => {
  const featuredMovies = getFeaturedMovies();
  const dramaMovies = getMoviesByGenre("Drama").slice(0, 6);
  const romanceMovies = getMoviesByGenre("Romance").slice(0, 6);
  const comedyMovies = getMoviesByGenre("Comédia").slice(0, 6);

  return (
    <div className="min-h-screen">
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
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="min-w-[200px] md:min-w-[250px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drama Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Drama</h2>
            <Link to="/filmes?genre=Drama" className="flex items-center text-accent hover:underline">
              Ver todos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="genre-scroll">
            {dramaMovies.map((movie) => (
              <div key={movie.id} className="min-w-[200px] md:min-w-[250px]">
                <MovieCard movie={movie} showGenre />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Romance Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Romance</h2>
            <Link to="/filmes?genre=Romance" className="flex items-center text-accent hover:underline">
              Ver todos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="genre-scroll">
            {romanceMovies.map((movie) => (
              <div key={movie.id} className="min-w-[200px] md:min-w-[250px]">
                <MovieCard movie={movie} showGenre />
              </div>
            ))}
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
            {comedyMovies.map((movie) => (
              <div key={movie.id} className="min-w-[200px] md:min-w-[250px]">
                <MovieCard movie={movie} showGenre />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;