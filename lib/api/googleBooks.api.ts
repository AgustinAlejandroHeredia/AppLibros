// MAPPERS
import { mapGoogleBookToBook } from "../mappers/googleBooks.mapper";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query: string) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=30`,
    );

    if (!response.ok) {
      throw new Error("An error has ocurred with Google Books API");
    }

    const data = await response.json();

    console.log("FROM googleBooks.api.ts : ", data);

    return data.items.map(mapGoogleBookToBook);
  } catch (error) {
    console.error("Error during books search : ", error);
    throw error;
  }
};
