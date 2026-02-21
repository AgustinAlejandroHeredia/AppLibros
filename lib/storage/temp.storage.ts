import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../models/Book";
import { STORAGE_KEYS } from "./keys";

export const saveTempBook = async (book: Book): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TEMPDATA, JSON.stringify(book));
  } catch (error) {
    console.error("Error saving temp book:", error);
  }
};

export const getTempBook = async (): Promise<Book | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TEMPDATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving temp book:", error);
    return null;
  }
};

export const clearTempBook = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TEMPDATA);
  } catch (error) {
    console.error("Error clearing temp book:", error);
  }
};
