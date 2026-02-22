import { Book } from "../models/Book";

export const mapGoogleBookToBook = (item: any): Book => {
  const vi = item.volumeInfo ?? {};

  const rawThumbnail = vi.imageLinks?.thumbnail ?? null;

  const thumbnail = rawThumbnail
    ? rawThumbnail.replace("http://", "https://")
    : null;

  return {
    id: item.id,
    title: vi.title ?? "No title",
    authors: vi.authors ?? [],
    thumbnail,
    description: vi.description ?? "",
    publishedYear: vi.publishedDate?.split("-")[0] ?? null,
    publisher: vi.publisher ?? null,
    categories: vi.categories ?? [],
    pageCount: vi.pageCount ?? null,
    language: vi.language ?? null,
  };
};
