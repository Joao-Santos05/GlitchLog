import { Game } from "@/interfaces/interfaces";

export const API_CONFIG = {
  BASE_URL: "URL_DA_SUA_FUTURA_API_AQUI",
  // API_KEY: process.env.EXPO_PUBLIC_GAME_API_KEY,
};

// Mock Data
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
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
  },
  {
    id: 2,
    title: "Celeste",
    vote_average: 9.0,
    release_date: "2018-01-25",
    poster_path: "https://placehold.co/400x600/1a1a1a/ffffff.png?text=Celeste",
    overview:
      "Ajude Madeline a sobreviver aos seus demônios internos em sua jornada.",
    platforms: ["PC", "Switch", "PlayStation"],
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
