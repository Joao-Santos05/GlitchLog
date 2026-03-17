export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  year?: string;
}

export interface List {
  id: string;
  title: string;
  coverUrls: string[];
  creator: {
    name: string;
    avatarUrl: string;
  };
  likes: number;
  comments: number;
}

export interface Review {
  id: string;
  game: Game;
  reviewer: {
    name: string;
    avatarUrl: string;
  };
  stars: number;
  likes: number;
  comments: number;
  content: string;
  date?: string;
}
