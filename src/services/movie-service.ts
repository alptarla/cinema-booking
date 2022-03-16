import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

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
  async getMovies(): Promise<Movie[]> {
    const snapshot = await getDocs(collection(db, "movies"));
    return snapshot.docs.map((doc) => doc.data() as Movie);
  },
};

export default MovieService;
