import { create } from "zustand";

interface PriceStoreState {
  price: number;
  setPrice: (price: number) => void;
  origins: string[];
  setOrigins: (origins: string[]) => void;
  destinations: string[];
  setDestinations: (destinations: string[]) => void;
  distance: number;
  setDistance: (distance: number) => void;
  setAll: (data: {
    price: number;
    origins: string[];
    destinations: string[];
    distance: number;
  }) => void;
}

export const usePriceStore = create<PriceStoreState>((set) => ({
  price: 0,
  setPrice: (price: number) => set({ price }),
  origins: [],
  setOrigins: (origins: string[]) => set({ origins: [...origins] }),
  destinations: [],
  setDestinations: (destinations: string[]) =>
    set({ destinations: [...destinations] }),
  distance: 0,
  setDistance: (distance: number) => set({ distance }),
  setAll: ({ price, origins, destinations, distance }) =>
    set({
      price,
      origins: [...origins],
      destinations: [...destinations],
      distance,
    }),
}));
