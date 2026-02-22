// MAPPERS
import { mapGoogleBookToBook } from "../mappers/googleBooks.mapper";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query: string) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=30`;
    console.log("FETCH URL:", url);

    const response = await fetch(url);

    console.log("STATUS:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("ERROR BODY:", text);

      if (response.status === 429) {
        const err = new Error("GOOGLE_BOOKS_QUOTA_EXCEEDED");
        throw err;
      }

      if (response.status >= 500) {
        const err = new Error("GOOGLE_BOOKS_SERVER_ERROR");
        throw err;
      }

      const err = new Error("GOOGLE_BOOKS_GENERIC_ERROR");
      throw err;
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }

    return data.items.map(mapGoogleBookToBook);
  } catch (error: any) {
    //console.error("Error during books search:", error);

    if (error?.message === "Network request failed") {
      throw new Error("NO_INTERNET");
    }

    throw error;
  }
};
