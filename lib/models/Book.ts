export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
  description: string;
  publishedYear: string | null;
  publisher: string | null;
  categories: string[];
  pageCount: number | null;
  language: string | null;
}
