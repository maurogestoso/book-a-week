export type Book = {
  title: string;
  totalPages: number;
  currentPage: number;
  dailyPages: number;
  startDate: Date;
  endDate: Date;
  log: {
    date: Date;
    pages: number;
  }[];
};

export function getBooksFromLocalStorage(): Book[] | null {
  const books = localStorage.getItem("books");
  if (!books) return null;

  return JSON.parse(books).map(
    (book: Book) =>
      ({
        title: book.title,
        currentPage: book.currentPage,
        totalPages: book.totalPages,
        dailyPages: book.dailyPages,
        startDate: new Date(book.startDate),
        endDate: new Date(book.endDate),
        log: book.log.map((log) => ({
          pages: log.pages,
          date: new Date(log.date),
        })),
      }) as Book,
  );
}
