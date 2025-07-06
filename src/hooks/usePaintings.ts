import { useState, useEffect } from "react";
import { paintingService } from "@/services/paintingService";
import type { Painting } from "@/@types/painting";

export const usePaintings = () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch paintings from Firebase
  const fetchPaintings = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPaintings = await paintingService.getAllPaintings();
      setPaintings(fetchedPaintings);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch paintings"
      );
      console.error("Error fetching paintings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new painting
  const addPainting = async (painting: Omit<Painting, "id">) => {
    try {
      const newPaintingId = await paintingService.addPainting(painting);
      const newPainting = { ...painting, id: newPaintingId };
      setPaintings((prev) => [...prev, newPainting]);
      return newPaintingId;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add painting");
      throw err;
    }
  };

  // Update a painting
  const updatePainting = async (
    paintingId: string,
    updates: Partial<Painting>
  ) => {
    try {
      await paintingService.updatePainting(paintingId, updates);
      setPaintings((prev) =>
        prev.map((p) => (p.id === paintingId ? { ...p, ...updates } : p))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update painting"
      );
      throw err;
    }
  };

  // Delete a painting
  const deletePainting = async (paintingId: string) => {
    try {
      await paintingService.deletePainting(paintingId);
      setPaintings((prev) => prev.filter((p) => p.id !== paintingId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete painting"
      );
      throw err;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPaintings();
  }, []);

  return {
    paintings,
    loading,
    error,
    addPainting,
    updatePainting,
    deletePainting,
    refetchPaintings: fetchPaintings,
  };
};
