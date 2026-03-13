export interface TrendingGame {
  searchTerm: string;
  game_id: number;
  title: string;
  count: number;
  poster_url: string;
}

export interface Game {
  id: number;
  title: string;
  original_title?: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity?: number;
  homepage?: string | null;
  status?: string;
  playtime?: number | null; // Average hours to finish the game
  esrb_rating?: string | null; // Age Rating

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
