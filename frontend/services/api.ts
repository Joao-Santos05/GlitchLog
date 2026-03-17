import { Game } from "@/interfaces/interfaces";

export const API_CONFIG = {
  BASE_URL: "URL_DA_API_AQUI",
};

const mockGames: Game[] = [
  {
    id: 1,
    title: "Hollow Knight",
    vote_average: 9.5,
    release_date: "2017-02-24",
    poster_path:
      "https://placehold.co/400x600/1a1a1a/ffffff.png?text=Hollow+Knight",
    overview:
      "Um jogo de ação e aventura épico em um reino arruinado de insetos e heróis.",
    backdrop_path: null,
    vote_count: 25000,
    genres: [
      { id: 1, name: "Platformer" },
      { id: 2, name: "Action" },
    ],
    platforms: [
      { id: 1, name: "PC" },
      { id: 2, name: "Switch" },
      { id: 3, name: "PlayStation" },
      { id: 4, name: "Xbox" },
    ],
    developers: [],
    publishers: [],
  },
  {
    id: 2,
    title: "Celeste",
    vote_average: 9.0,
    release_date: "2018-01-25",
    poster_path: "https://placehold.co/400x600/1a1a1a/ffffff.png?text=Celeste",
    overview:
      "Ajude Madeline a sobreviver aos seus demônios internos em sua jornada.",
    backdrop_path: null,
    vote_count: 18000,
    genres: [
      { id: 1, name: "Platformer" },
      { id: 3, name: "Drama" },
    ],
    platforms: [
      { id: 1, name: "PC" },
      { id: 2, name: "Switch" },
      { id: 3, name: "PlayStation" },
    ],
    developers: [],
    publishers: [],
  },
];

export const fetchGames = async ({
  query,
}: {
  query: string;
}): Promise<Game[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (query) {
    return mockGames.filter((game) =>
      game.title.toLowerCase().includes(query.toLowerCase()),
    );
  }
  return mockGames;
};
