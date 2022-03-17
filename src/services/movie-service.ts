import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { Genre } from "./genre-service";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number | string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

const MovieService = {
  async getMovies(genres: Genre[]): Promise<Movie[]> {
    let queries = [];
    if (genres.length) {
      const genreIds = genres.map((genre) => genre.id);
      queries.push(where("genre_ids", "array-contains-any", genreIds));
    }

    const q = query(collection(db, "movies"), ...queries);

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Movie);
  },
};

export default MovieService;
