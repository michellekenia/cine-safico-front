export interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string[];
  director: string;
  cast: string[];
  synopsis: string;
  duration: string;
  streamingPlatforms: string[];
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Carol",
    poster: "https://a.ltrbxd.com/resized/sm/upload/wt/r4/hc/iz/pnzuLoE52EiTfjfqRex2uTkH7LB-0-1000-0-1500-crop.jpg?v=5c24b21874",
    rating: 4.5,
    year: 2015,
    genre: ["Drama", "Romance"],
    director: "Todd Haynes",
    cast: ["Cate Blanchett", "Rooney Mara", "Sarah Paulson"],
    synopsis: "Uma jovem fotógrafa se apaixona por uma mulher mais velha e elegante nos anos 1950.",
    duration: "118 min",
    streamingPlatforms: ["Netflix", "Amazon Prime Video", "Globoplay"]
  },
  {
    id: 2,
    title: "Imagine Me & You",
    poster: "https://a.ltrbxd.com/resized/film-poster/5/0/9/8/9/50989-imagine-me-you-0-1000-0-1500-crop.jpg?v=dd59ac719b",
    rating: 4.2,
    year: 2005,
    genre: ["Romance", "Comédia"],
    director: "Ol Parker",
    cast: ["Piper Perabo", "Lena Headey", "Matthew Goode"],
    synopsis: "Uma noiva recém-casada se apaixona pela florista de seu casamento.",
    duration: "90 min",
    streamingPlatforms: ["Amazon Prime Video", "Paramount+"]
  },
  {
    id: 3,
    title: "But I'm a Cheerleader",
    poster: "https://a.ltrbxd.com/resized/film-poster/3/8/8/0/0/38800-but-i-m-a-cheerleader-0-1000-0-1500-crop.jpg?v=fb07442029",
    rating: 4.0,
    year: 1999,
    genre: ["Comédia", "Romance"],
    director: "Jamie Babbit",
    cast: ["Natasha Lyonne", "Clea DuVall", "RuPaul"],
    synopsis: "Uma líder de torcida é enviada para um campo de 'cura' quando seus pais suspeitam que ela é lésbica.",
    duration: "85 min",
    streamingPlatforms: ["Tubi", "Pluto TV"]
  },
  {
    id: 4,
    title: "Girlfriends and Girlfriends",
    poster: "https://a.ltrbxd.com/resized/film-poster/8/5/2/7/2/0/852720-girlfriends-and-girlfriends-0-1000-0-1500-crop.jpg?v=a51d0a3d72",
    rating: 3.8,
    year: 2022,
    genre: ["Drama", "Romance"],
    director: "Celine Sciamma",
    cast: ["Noémie Merlant", "Adèle Haenel"],
    synopsis: "Duas jovens mulheres exploram sua sexualidade em um verão transformador.",
    duration: "95 min",
    streamingPlatforms: ["MUBI", "Netflix"]
  },
  {
    id: 5,
    title: "Boygenius: The Film",
    poster: "https://a.ltrbxd.com/resized/film-poster/9/9/7/4/0/0/997400-boygenius-the-film-0-1000-0-1500-crop.jpg?v=4f3c4cecdd",
    rating: 4.7,
    year: 2023,
    genre: ["Documentário", "Musical"],
    director: "Kristen Stewart",
    cast: ["Phoebe Bridgers", "Lucy Dacus", "Julien Baker"],
    synopsis: "Documentário sobre a formação e turnê do supergrupo musical boygenius.",
    duration: "72 min",
    streamingPlatforms: ["Hulu", "Disney+"]
  },
  {
    id: 6,
    title: "D.E.B.S.",
    poster: "https://a.ltrbxd.com/resized/film-poster/5/1/5/7/7/51577-d-e-b-s--0-460-0-690-crop.jpg?v=f3585ff569",
    rating: 3.9,
    year: 2004,
    genre: ["Comédia", "Ação"],
    director: "Angela Robinson",
    cast: ["Sara Foster", "Jordana Brewster", "Devon Aoki"],
    synopsis: "Estudantes-espiãs enfrentam um dilema quando uma delas se apaixona por uma criminosa.",
    duration: "91 min",
    streamingPlatforms: ["Tubi", "Crackle"]
  },
  {
    id: 7,
    title: "Bound",
    poster: "https://a.ltrbxd.com/resized/film-poster/4/7/2/8/9/47289-bound-0-1000-0-1500-crop.jpg?v=54e3ef63ae",
    rating: 4.3,
    year: 1996,
    genre: ["Thriller", "Crime"],
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Jennifer Tilly", "Gina Gershon", "Joe Pantoliano"],
    synopsis: "Uma ex-presidiária e a namorada de um mafioso planejam roubar dois milhões de dólares.",
    duration: "109 min",
    streamingPlatforms: ["Amazon Prime Video", "Apple TV", "Vudu"]
  },
  {
    id: 8,
    title: "The Watermelon Woman",
    poster: "https://a.ltrbxd.com/resized/film-poster/2/0/7/0/3/20703-the-watermelon-woman-0-1000-0-1500-crop.jpg?v=11ffcd731b",
    rating: 4.1,
    year: 1996,
    genre: ["Drama", "Comédia"],
    director: "Cheryl Dunye",
    cast: ["Cheryl Dunye", "Guinevere Turner", "Valarie Walker"],
    synopsis: "Uma cineasta negra investiga a vida de uma atriz dos anos 1930 conhecida apenas como 'The Watermelon Woman'.",
    duration: "90 min",
    streamingPlatforms: ["Kanopy", "Hoopla"]
  },
  {
    id: 9,
    title: "The Incredibly True Adventure of Two Girls in Love",
    poster: "https://a.ltrbxd.com/resized/film-poster/3/2/9/1/7/32917-the-incredibly-true-adventure-of-two-girls-in-love-0-1000-0-1500-crop.jpg?v=e5e0aa717b",
    rating: 4.0,
    year: 1995,
    genre: ["Romance", "Drama"],
    director: "Maria Maggenti",
    cast: ["Laurel Holloman", "Nicole Ari Parker", "Maggie Moore"],
    synopsis: "Duas adolescentes de origens diferentes se apaixonam em uma pequena cidade.",
    duration: "94 min",
    streamingPlatforms: ["Tubi", "Peacock"]
  },
  {
    id: 10,
    title: "Rafiki",
    poster: "https://a.ltrbxd.com/resized/film-poster/4/4/7/6/9/7/447697-rafiki-0-1000-0-1500-crop.jpg?v=91a8c8f1e0",
    rating: 4.4,
    year: 2018,
    genre: ["Drama", "Romance"],
    director: "Wanuri Kahiu",
    cast: ["Samantha Mugatsia", "Sheila Munyiva", "Jimmi Gathu"],
    synopsis: "Duas jovens mulheres quenianas se apaixonam apesar da pressão social e familiar.",
    duration: "83 min",
    streamingPlatforms: ["Netflix", "MUBI"]
  },
  {
    id: 11,
    title: "Disobedience",
    poster: "https://a.ltrbxd.com/resized/film-poster/3/5/3/5/2/2/353522-disobedience-0-1000-0-1500-crop.jpg?v=960376bc81",
    rating: 4.2,
    year: 2017,
    genre: ["Drama", "Romance"],
    director: "Sebastián Lelio",
    cast: ["Rachel Weisz", "Rachel McAdams", "Alessandro Nivola"],
    synopsis: "Uma mulher retorna à sua comunidade ortodoxa judaica e reacende um romance proibido.",
    duration: "114 min",
    streamingPlatforms: ["Amazon Prime Video", "Hulu", "Paramount+"]
  },
  {
    id: 12,
    title: "Elisa & Marcela",
    poster: "https://a.ltrbxd.com/resized/film-poster/4/6/4/4/8/4/464484-elisa-marcela-0-1000-0-1500-crop.jpg?v=c6eeb2aceb",
    rating: 3.7,
    year: 2019,
    genre: ["Drama", "Romance"],
    director: "Isabel Coixet",
    cast: ["Natalia de Molina", "Greta Fernández", "Sara Casasnovas"],
    synopsis: "Baseado na história real de duas mulheres que se casaram na Espanha de 1901.",
    duration: "120 min",
    streamingPlatforms: ["Netflix", "Filmin"]
  },
  {
    id: 13,
    title: "The Half of It",
    poster: "https://a.ltrbxd.com/resized/film-poster/5/2/4/6/6/3/524663-the-half-of-it-0-1000-0-1500-crop.jpg?v=c3fb22f042",
    rating: 4.6,
    year: 2020,
    genre: ["Romance", "Coming-of-age"],
    director: "Alice Wu",
    cast: ["Leah Lewis", "Daniel Diemer", "Alexxis Lemire"],
    synopsis: "Uma estudante tímida ajuda um atleta a conquistar a garota por quem ela secretamente se apaixonou.",
    duration: "104 min",
    streamingPlatforms: ["Netflix"]
  },
  {
    id: 14,
    title: "Happiest Season",
    poster: "https://a.ltrbxd.com/resized/film-poster/4/4/9/7/7/1/449771-happiest-season-0-1000-0-1500-crop.jpg?v=0d726c3471",
    rating: 4.1,
    year: 2020,
    genre: ["Romance", "Comédia"],
    director: "Clea DuVall",
    cast: ["Kristen Stewart", "Mackenzie Davis", "Alison Brie"],
    synopsis: "Uma mulher planeja pedir a namorada em casamento durante o Natal, mas descobre que ela não saiu do armário para a família.",
    duration: "102 min",
    streamingPlatforms: ["Hulu", "Amazon Prime Video"]
  },
  {
    id: 15,
    title: "Pariah",
    poster: "https://a.ltrbxd.com/resized/film-poster/6/0/3/2/8/60328-pariah-0-1000-0-1500-crop.jpg?v=d667d3dbe9",
    rating: 4.5,
    year: 2011,
    genre: ["Drama", "Coming-of-age"],
    director: "Dee Rees",
    cast: ["Adepero Oduye", "Kim Wayans", "Aasha Davis"],
    synopsis: "Uma adolescente negra luta para aceitar sua sexualidade enquanto navega pela pressão familiar e social.",
    duration: "86 min",
    streamingPlatforms: ["Max", "Tubi", "Crackle"]
  },
  {
    id: 16,
    title: "Set It Off",
    poster: "https://a.ltrbxd.com/resized/film-poster/4/7/1/9/6/47196-set-it-off-0-1000-0-1500-crop.jpg?v=0b2deddc94",
    rating: 4.3,
    year: 1996,
    genre: ["Crime", "Drama"],
    director: "F. Gary Gray",
    cast: ["Jada Pinkett Smith", "Queen Latifah", "Vivica A. Fox"],
    synopsis: "Quatro amigas de Los Angeles decidem roubar bancos para escapar da pobreza.",
    duration: "123 min",
    streamingPlatforms: ["Netflix", "Hulu", "Amazon Prime Video"]
  }
];

export const getFeaturedMovies = (): Movie[] => {
  return movies.filter(movie => movie.rating >= 4.4).slice(0, 6);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  return movies.filter(movie => 
    movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
  );
};

export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

export const getAllGenres = (): string[] => {
  const genres = new Set<string>();
  movies.forEach(movie => {
    movie.genre.forEach(genre => genres.add(genre));
  });
  return Array.from(genres).sort();
};