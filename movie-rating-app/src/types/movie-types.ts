import type { Genre } from "@/enums/movie-enums";

export interface Movie {
  id?: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  genres: Genre[];
  inTheaters: boolean;
  trailer: string;
  rated: boolean;
}
