import { useState, useMemo } from "react";
import { movies, getAllGenres } from "@/data/movies";
import MovieCard from "@/components/shared/MovieCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";

const AllMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const genres = getAllGenres();

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter(movie =>
        movie.genre.some(g => g === selectedGenre)
      );
    }

    // Sort movies
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "year":
          return b.year - a.year;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold text-primary mr-4">Todos os Filmes</h1>
            <div className="venus-symbol text-3xl opacity-30" />
          </div>
          <p className="text-lg text-muted-foreground">
            Explore nosso catálogo completo de cinema sáfico
          </p>
        </div>

        {/* Filters */}
        <div className="filter-bar mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar filmes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Genre Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os gêneros</SelectItem>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Título (A-Z)</SelectItem>
                <SelectItem value="year">Ano (Mais recente)</SelectItem>
                <SelectItem value="rating">Avaliação (Maior)</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex-1"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex-1"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredAndSortedMovies.length} filme(s) encontrado(s)
          </p>
        </div>

        {/* Movies Grid/List */}
        {filteredAndSortedMovies.length > 0 ? (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedMovies.map((movie) => (
              <div key={movie.id} className={viewMode === "list" ? "flex gap-4 p-4 bg-card rounded-lg" : ""}>
                {viewMode === "list" ? (
                  <>
                    <div className="w-24 h-36 flex-shrink-0">
                      <img
                        src={movie.poster}
                        alt={`Poster do filme ${movie.title}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-1">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{movie.year} • {movie.director}</p>
                      <p className="text-sm text-foreground mb-2 line-clamp-2">{movie.synopsis}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={i < Math.floor(movie.rating) ? "text-accent" : "text-muted-foreground"}
                            >
                              ♥
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({movie.rating})</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <MovieCard movie={movie} showGenre />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="venus-symbol text-4xl mb-4 opacity-20" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum filme encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMovies;