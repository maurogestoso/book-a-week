import * as v from "valibot";

const BookSchema = v.object({
  title: v.string(),
  totalPages: v.number(),
  currentPage: v.number(),
  dailyPages: v.number(),
  startDate: v.date(),
  endDate: v.date(),
  isFinished: v.boolean(),
  isAbandoned: v.boolean(),
  log: v.array(
    v.object({
      date: v.date(),
      pages: v.number(),
    }),
  ),
});
const BooksSchema = v.array(BookSchema);

export type Book = v.InferOutput<typeof BookSchema>;

export function getBooksFromLocalStorage() {
  const books = localStorage.getItem("books");
  if (!books) return null;
  return v.parse(BooksSchema, JSON.parse(books));
}

export function newBook({
  totalPages,
  title,
}: {
  totalPages: number;
  title: string;
}): Book {
  return {
    title,
    totalPages,
    currentPage: 0,
    dailyPages: Math.ceil(totalPages / 7),
    startDate: new Date(),
    isFinished: false,
    isAbandoned: false,
    endDate: (() => {
      const end = new Date();
      end.setDate(end.getDate() + 7);
      return end;
    })(),
    log: [],
  };
}
