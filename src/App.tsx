import { useEffect, useState } from "react";
import "./App.css";
import { getBooksFromLocalStorage, type Book } from "./lib/book";
import BookCard from "./components/BookCard";
import Header from "./components/Header";
import AddBookForm from "./components/AddBookForm";

function App() {
  const [books, setBooks] = useState<Book[]>(getBooksFromLocalStorage() ?? []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function addBook(book: Book) {
    setBooks([...books, book]);
  }

  function updateBook(targetBook: Book) {
    return function (readUntil: number) {
      setBooks(
        books.map((book) => {
          if (targetBook.title === book.title) {
            const pagesRead = readUntil - book.currentPage;
            return {
              ...book,
              currentPage: readUntil,
              log: [
                ...book.log,
                {
                  date: new Date(),
                  pages: pagesRead,
                },
              ],
            };
          }
          return book;
        }),
      );
    };
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        <Header />
        <main className="mt-4">
          <AddBookForm onSubmit={addBook} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Books</h2>
            {books.map((book) => (
              <BookCard
                key={book.title}
                book={book}
                onReadUpdate={updateBook(book)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
