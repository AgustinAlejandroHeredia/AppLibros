// app/utils/shareBook.ts
import { Share } from "react-native";
import { Book } from "../models/Book";

export const shareBook = async (book: Book) => {
  try {
    const message = `
        Hello! Look the book I found!

        Title: ${book.title}
        ${book.authors?.length ? `Author(s): ${book.authors.join(", ")}` : ""}
        ${book.pageCount ? `Pages: ${book.pageCount}` : ""}
        ${book.publishedYear ? `Year: ${book.publishedYear}` : ""}
        ${book.language ? `Language: ${book.language}` : ""}

        Description:
        ${book.description ? book.description.slice(0, 500) : "No description available"}

        Found using Book App.
`;

    await Share.share({
      message,
    });
  } catch (error) {
    console.error("Error sharing book:", error);
  }
};
