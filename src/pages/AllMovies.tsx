import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getAllMovies } from "@/shared/api/all-movies";
import { getAllGenres } from "@/shared/api/all-genres";
import { getAllCountries } from "@/shared/api/all-countries";
import { getAllLanguages } from "@/shared/api/all-languages";

import {
  PaginatedMoviesResponse,
  MoviesQueryParams,
} from "@/shared/interfaces/all-movies.interface";
import { GenresResponse } from "@/shared/interfaces/all-genres.interface";
import { CountriesResponse } from "@/shared/interfaces/all-countrys.interface";
import { AllLanguagesResponse } from "@/shared/interfaces/all-languages.interface";

import MovieCardWithState from "@/components/shared/MovieCardWithState";
import MoviesLoader from "@/components/shared/MoviesLoader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, ChevronsUpDown, Filter, RotateCcw } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AllMovies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Função para extrair parâmetros da URL
  const getUrlParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      page: params.get('page') ? Number(params.get('page')) : 1,
      search: params.get('search') || "",
      genre: params.get('genre') || "",
      country: params.get('country') || "",
      language: params.get('language') || "",
    };
  };
  
  // Inicializa estados com valores da URL
  const urlParams = getUrlParams();
  const [currentPage, setCurrentPage] = useState(urlParams.page);
  const [movies, setMovies] = useState<PaginatedMoviesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(urlParams.search);

  // Filter states inicializados com valores da URL
  const [selectedGenre, setSelectedGenre] = useState<string>(urlParams.genre);
  const [selectedCountry, setSelectedCountry] = useState<string>(urlParams.country);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(urlParams.language);

  const [availableGenres, setAvailableGenres] = useState<GenresResponse | null>(null);
  const [availableCountries, setAvailableCountries] = useState<CountriesResponse | null>(null);
  const [availableLanguages, setAvailableLanguages] = useState<AllLanguagesResponse | null>(null);

  const [isGenrePopoverOpen, setIsGenrePopoverOpen] = useState(false);
  const [isCountryPopoverOpen, setIsCountryPopoverOpen] = useState(false);
  const [isLanguagePopoverOpen, setIsLanguagePopoverOpen] = useState(false);

  // Fetch data for filters
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [genresData, countriesData, languagesData] = await Promise.all([
          getAllGenres(),
          getAllCountries(),
          getAllLanguages(),
        ]);

        setAvailableGenres(genresData);
        setAvailableCountries(countriesData);
        setAvailableLanguages(languagesData);
      } catch (error) {
        console.error("Erro ao buscar dados para os filtros:", error);
      }
    };

    fetchFilterData();
  }, []);

  // Fetch movies based on filters
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const queryParams: MoviesQueryParams = {
          page: currentPage,
          search: searchTerm,
          genre: selectedGenre,
          country: selectedCountry,
          language: selectedLanguage,
        };

        const data = await getAllMovies(queryParams);
        setMovies(data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [
    currentPage,
    searchTerm,
    selectedGenre,
    selectedCountry,
    selectedLanguage,
  ]);

  // Sincroniza filtros com a URL
  useEffect(() => {
    // Se viermos da navegação de MovieDetails com clearFilters, não atualizamos a URL
    if (location.state && location.state.clearFilters) {
      // Limpa o estado para não afetar futuras navegações
      navigate(location.pathname, { replace: true, state: {} });
      return;
    }
    
    // Constrói os parâmetros de URL com base nos filtros ativos
    const params = new URLSearchParams();
    
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (searchTerm) params.set('search', searchTerm);
    if (selectedGenre) params.set('genre', selectedGenre);
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedLanguage) params.set('language', selectedLanguage);
    
    // Atualiza a URL sem recarregar a página
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    
    // Apenas atualiza se a URL for diferente para evitar loops
    if (newUrl !== `${location.pathname}${location.search}`) {
      navigate(newUrl, { replace: true });
    }
  }, [currentPage, searchTerm, selectedGenre, selectedCountry, selectedLanguage, navigate, location.pathname, location.search, location.state]);

  const clearFilter = (filter: "genre" | "country" | "language") => {
    if (filter === "genre") setSelectedGenre("");
    if (filter === "country") setSelectedCountry("");
    if (filter === "language") setSelectedLanguage("");
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    // Limpa todos os filtros
    setSelectedGenre("");
    setSelectedCountry("");
    setSelectedLanguage("");
    setSearchTerm("");
    setCurrentPage(1);
    
    // Atualiza a URL para remover todos os parâmetros
    navigate("/filmes", { replace: true });
  };

  const hasActiveFilters = selectedGenre || selectedCountry || selectedLanguage || searchTerm;

  const renderActiveFilters = () => {
    const filters = [
      {
        type: "search" as const,
        value: searchTerm,
        label: `"${searchTerm}"`,
      },
      {
        type: "genre" as const,
        value: selectedGenre,
        label: availableGenres?.items.find((g) => g.slug === selectedGenre)
          ?.nomePt,
      },
      {
        type: "country" as const,
        value: selectedCountry,
        label: availableCountries?.items.find((c) => c.slug === selectedCountry)
          ?.nomePt,
      },
      {
        type: "language" as const,
        value: selectedLanguage,
        label: availableLanguages?.items.find(
          (l) => l.slug === selectedLanguage
        )?.nomePt,
      },
    ];

    return (
      <>
        {filters.map(
          (filter) =>
            filter.value && (
              <Badge
                key={filter.type}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1.5 text-sm"
              >
                <span className="font-medium">
                  {filter.type === "search" ? "Busca" : 
                   filter.type === "genre" ? "Gênero" :
                   filter.type === "country" ? "País" : "Idioma"}:
                </span>
                <span>{filter.label || filter.value}</span>
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                  onClick={() => {
                    if (filter.type === "search") {
                      setSearchTerm("");
                    } else {
                      clearFilter(filter.type);
                    }
                    setCurrentPage(1);
                  }}
                />
              </Badge>
            )
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold text-primary mr-4">
              Todos os Filmes
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore nosso catálogo completo de cinema sáfico
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Filtros</h2>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Limpar todos
                  </Button>
                )}
              </div>

              <Separator />

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Buscar por título
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Digite o nome do filme..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Genre Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Gênero
                  </label>
                  <Popover
                    open={isGenrePopoverOpen}
                    onOpenChange={setIsGenrePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isGenrePopoverOpen}
                        className="w-full justify-between h-11"
                      >
                        {selectedGenre
                          ? availableGenres?.items.find(
                              (genre) => genre.slug === selectedGenre
                            )?.nomePt
                          : "Todos os gêneros"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar gênero..." />
                        <CommandList>
                          <CommandEmpty>Nenhum gênero encontrado.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setSelectedGenre("");
                                setCurrentPage(1);
                                setIsGenrePopoverOpen(false);
                              }}
                            >
                              Todos os gêneros
                            </CommandItem>
                            {availableGenres?.items.map((genre) => (
                              <CommandItem
                                key={genre.slug}
                                onSelect={() => {
                                  setSelectedGenre(
                                    selectedGenre === genre.slug ? "" : genre.slug
                                  );
                                  setCurrentPage(1);
                                  setIsGenrePopoverOpen(false);
                                }}
                              >
                                {genre.nomePt} ({genre.count})
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Country Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    País
                  </label>
                  <Popover
                    open={isCountryPopoverOpen}
                    onOpenChange={setIsCountryPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCountryPopoverOpen}
                        className="w-full justify-between h-11"
                      >
                        {selectedCountry
                          ? availableCountries?.items.find(
                              (country) => country.slug === selectedCountry
                            )?.nomePt
                          : "Todos os países"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar país..." />
                        <CommandList>
                          <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setSelectedCountry("");
                                setCurrentPage(1);
                                setIsCountryPopoverOpen(false);
                              }}
                            >
                              Todos os países
                            </CommandItem>
                            {availableCountries?.items.map((country) => (
                              <CommandItem
                                key={country.slug}
                                onSelect={() => {
                                  setSelectedCountry(
                                    selectedCountry === country.slug
                                      ? ""
                                      : country.slug
                                  );
                                  setCurrentPage(1);
                                  setIsCountryPopoverOpen(false);
                                }}
                              >
                                {country.nomePt} ({country.count})
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Language Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Idioma
                  </label>
                  <Popover
                    open={isLanguagePopoverOpen}
                    onOpenChange={setIsLanguagePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isLanguagePopoverOpen}
                        className="w-full justify-between h-11"
                      >
                        {selectedLanguage
                          ? availableLanguages?.items.find(
                              (lang) => lang.slug === selectedLanguage
                            )?.nomePt
                          : "Todos os idiomas"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar idioma..." />
                        <CommandList>
                          <CommandEmpty>Nenhum idioma encontrado.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                setSelectedLanguage("");
                                setCurrentPage(1);
                                setIsLanguagePopoverOpen(false);
                              }}
                            >
                              Todos os idiomas
                            </CommandItem>
                            {availableLanguages?.items.map((lang) => (
                              <CommandItem
                                key={lang.slug}
                                onSelect={() => {
                                  setSelectedLanguage(
                                    selectedLanguage === lang.slug ? "" : lang.slug
                                  );
                                  setCurrentPage(1);
                                  setIsLanguagePopoverOpen(false);
                                }}
                              >
                                {lang.nomePt} ({lang.count})
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        Filtros ativos
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {[selectedGenre, selectedCountry, selectedLanguage, searchTerm].filter(Boolean).length} filtro(s)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {renderActiveFilters()}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

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
          <MoviesLoader message="Carregando catálogo de filmes..." showMovieCards={true} />
        ) : movies?.data && movies.data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.data.map((movie) => (
                <MovieCardWithState key={movie.id} movie={movie} />
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
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from(
                      { length: Math.min(5, movies.totalPages) },
                      (_, i) => {
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
                      }
                    )}

                    {movies.totalPages > 5 &&
                      currentPage < movies.totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < movies.totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={
                          currentPage === movies.totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
       
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
