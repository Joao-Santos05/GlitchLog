export interface Game {
  id: number;
  title: string;
  original_title?: string;
  overview?: string; // Resume
  poster_path: string | null; // Cover
  backdrop_path?: string | null; // Bg
  genre_ids?: number[];
  popularity?: number;
  release_date: string;
  vote_average: number; // Grade
  vote_count?: number;

  // //
  platforms?: string[];
  esrb_rating?: string | null;
}

export interface TrendingGame {
  searchTerm: string;
  game_id: number; // Corrigido de movie_id para game_id
  title: string;
  count: number;
  poster_url: string;
}

export interface GameDetails {
  id: number;
  title: string;
  original_title?: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  homepage: string | null;
  status: string;
  playtime: number | null; // Average hours to finish the game
  esrb_rating: string | null; // Age Rating

  genres: {
    id: number;
    name: string;
  }[];

  platforms: {
    id: number;
    name: string;
  }[];

  developers: {
    id: number;
    name: string;
    image_url?: string | null;
  }[];

  publishers: {
    id: number;
    name: string;
  }[];
}

export interface TrendingCardProps {
  game: TrendingGame;
  index: number;
}
