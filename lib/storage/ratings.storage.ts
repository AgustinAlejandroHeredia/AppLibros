import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "./keys";

export interface Rating {
  id: string;
  score: number; // 1 a 5
}

export const getRatings = async (): Promise<Rating[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.RATINGS);
  return data ? JSON.parse(data) : [];
};

export const getRatingById = async (id: string): Promise<Rating | null> => {
  const ratings = await getRatings();
  return ratings.find((r) => r.id === id) ?? null;
};

export const addOrUpdateRating = async (
  id: string,
  score: number,
): Promise<void> => {
  if (score < 0 || score > 5) {
    throw new Error("Score must be between 0 and 5");
  }

  const ratings = await getRatings();
  const index = ratings.findIndex((r) => r.id === id);

  if (index >= 0) {
    // update
    ratings[index].score = score;
  } else {
    // add new
    ratings.push({ id, score });
  }

  await AsyncStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
};
