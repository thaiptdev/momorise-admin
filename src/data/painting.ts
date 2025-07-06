import type { Painting } from "@/@types/painting";

export const mockPaintings: Painting[] = [
  {
    id: "1",
    title: "Sunset over Mountains",
    author: "John Doe",
    content:
      "A breathtaking landscape painting capturing the golden hour light over majestic mountain peaks with vibrant colors and dramatic shadows.",
    style: "horizontal",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: "2",
    title: "City Lights",
    author: "Jane Smith",
    content:
      "An urban nightscape featuring the bustling energy of city life with neon lights reflecting off wet streets.",
    style: "vertical",
    thumbnail:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: "3",
    title: "Ocean Waves",
    author: "Mike Johnson",
    content:
      "A dynamic seascape showing powerful waves crashing against rocky shores with foam and spray.",
    style: "horizontal",
    thumbnail:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: "4",
    title: "Forest Path",
    author: "Sarah Wilson",
    content:
      "A serene woodland scene with dappled sunlight filtering through ancient trees onto a winding path.",
    style: "vertical",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop&crop=center",
  },
];
