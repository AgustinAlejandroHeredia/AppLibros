import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../models/Book";
import { STORAGE_KEYS } from "./keys";

export const getFavorites = async (): Promise<Book[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
  return data ? JSON.parse(data) : [];
};

export const addFavorite = async (book: Book): Promise<void> => {
  const favorites = await getFavorites();

  const exists = favorites.some((b) => b.id === book.id);
  if (exists) return; // evita duplicados

  favorites.push(book);
  await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
};

export const removeFavorite = async (bookId: string): Promise<void> => {
  const favorites = await getFavorites();
  const filtered = favorites.filter((b) => b.id !== bookId);

  await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
};

export const isFavorite = async (bookId: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((b) => b.id === bookId);
};
