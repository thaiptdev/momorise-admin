import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Painting } from "@/@types/painting";

const COLLECTION_NAME = "paintings";

export const paintingService = {
  // Get all paintings
  async getAllPaintings(): Promise<Painting[]> {
    try {
      const paintingsCollection = collection(db, COLLECTION_NAME);
      const paintingsQuery = query(paintingsCollection, orderBy("title"));
      const querySnapshot = await getDocs(paintingsQuery);

      const paintings: Painting[] = [];
      querySnapshot.forEach((doc) => {
        paintings.push({
          id: doc.id,
          ...doc.data(),
        } as unknown as Painting);
      });

      return paintings;
    } catch (error) {
      console.error("Error fetching paintings:", error);
      throw error;
    }
  },

  // Add a new painting
  async addPainting(painting: Omit<Painting, "id">): Promise<string> {
    try {
      const paintingsCollection = collection(db, COLLECTION_NAME);
      const docRef = await addDoc(paintingsCollection, painting);
      return docRef.id;
    } catch (error) {
      console.error("Error adding painting:", error);
      throw error;
    }
  },

  // Update a painting
  async updatePainting(
    paintingId: string,
    updates: Partial<Painting>
  ): Promise<void> {
    try {
      const paintingDoc = doc(db, COLLECTION_NAME, paintingId);
      await updateDoc(paintingDoc, updates);
    } catch (error) {
      console.error("Error updating painting:", error);
      throw error;
    }
  },

  // Delete a painting
  async deletePainting(paintingId: string): Promise<void> {
    try {
      const paintingDoc = doc(db, COLLECTION_NAME, paintingId);
      await deleteDoc(paintingDoc);
    } catch (error) {
      console.error("Error deleting painting:", error);
      throw error;
    }
  },
};
