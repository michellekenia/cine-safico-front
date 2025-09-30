import { useState, useEffect } from "react";
import { getAllMovies } from "@/shared/api/all-movies";
import { getAllGenres } from "@/shared/api/all-genres";
import { PaginatedMoviesResponse, MoviesQueryParams } from "@/shared/interfaces/all-movies.interface";
import { GenresResponse } from "@/shared/interfaces/all-genres.interface";
import MovieCard from "@/components/shared/MovieCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const AllMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<PaginatedMoviesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [availableGenres, setAvailableGenres] = useState<GenresResponse | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getAllGenres();
        setAvailableGenres(genresData);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const queryParams: MoviesQueryParams = {
          page: currentPage,
        };

        if (searchTerm) {
          queryParams.search = searchTerm;
        }

        if (selectedGenre) {
          queryParams.genre = selectedGenre;
        }

        const data = await getAllMovies(queryParams);
        setMovies(data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchTerm, selectedGenre]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold text-primary mr-4">Todos os Filmes</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore nosso catálogo completo de cinema sáfico
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search and Genre Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar filmes..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative w-full">
              <Command
                className="border rounded-lg w-full"
                shouldFilter={isCommandOpen}
              >
                <CommandInput 
                  placeholder="Filtrar por gênero..." 
                  onFocus={() => setIsCommandOpen(true)}
                  onClick={() => setIsCommandOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsCommandOpen(false);
                    }
                  }}
                  className="h-10 text-base"
                />
                {isCommandOpen && (
                  <>
                    {/* Overlay para capturar cliques fora */}
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsCommandOpen(false)}
                    />
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50">
                      <CommandList className="relative w-full bg-background border rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
                        <CommandEmpty className="py-6 text-base text-center">
                          Nenhum gênero encontrado.
                        </CommandEmpty>
                        <CommandGroup>
                          {availableGenres?.items.map((genre) => (
                            <CommandItem
                              key={genre.slug}
                              onSelect={() => {
                                setSelectedGenre(selectedGenre === genre.slug ? "" : genre.slug);
                                setCurrentPage(1);
                                setIsCommandOpen(false);
                              }}
                              className="px-4 py-3 text-base cursor-pointer hover:bg-muted focus:bg-muted"
                            >
                              <div className={`${
                                selectedGenre === genre.slug ? 'text-primary font-medium' : ''
                              }`}>
                                {genre.nomePt} ({genre.count})
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </div>
                  </>
                )}
              </Command>
            </div>
          </div>

          {/* Selected Genre */}
          {selectedGenre && (
            <div className="flex flex-wrap gap-2">
              {(() => {
                const genre = availableGenres?.items.find(g => g.slug === selectedGenre);
                return (
                  <Badge
                    key={selectedGenre}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {genre?.nomePt || selectedGenre}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setSelectedGenre("");
                        setCurrentPage(1);
                      }}
                    />
                  </Badge>
                );
              })()}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            {movies?.total} filme(s) encontrado(s)
            {movies?.totalPages > 1 && (
              <span className="ml-2">
                • Página {currentPage} de {movies.totalPages}
              </span>
            )}
          </p>
        </div>

        {/* Movies Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p>Carregando filmes...</p>
          </div>
        ) : movies?.data && movies.data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.data.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie}
                />
              ))}
            </div>

            {/* Pagination */}
            {movies?.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, movies.totalPages) }, (_, i) => {
                      let pageNumber;
                      if (movies.totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= movies.totalPages - 2) {
                        pageNumber = movies.totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNumber);
                            }}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {movies.totalPages > 5 && currentPage < movies.totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < movies.totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === movies.totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
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