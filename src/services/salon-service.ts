import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Salon {
  id: string;
  name: string;
  seats: any[];
}

const SalonService = {
  async getSalons(): Promise<Salon[]> {
    const snapshot = await getDocs(collection(db, "saloons"));
    return snapshot.docs.map((doc) => doc.data() as Salon);
  },
};

export default SalonService;
