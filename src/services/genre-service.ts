import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Genre {
  id: string;
  name: string;
}

const GenreService = {
  async getGenres(): Promise<Genre[]> {
    const snapshot = await getDocs(collection(db, "genres"));
    return snapshot.docs.map((doc) => doc.data() as Genre);
  },
};

export default GenreService;
