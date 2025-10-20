import { useState } from "react";
import "./App.css";
import { BookCheck } from "lucide-react";
import { Input } from "./components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

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

function Header() {
  return (
    <header className="flex items-center">
      <BookCheck /> <h1 className="text-2xl font-bold">book-a-week</h1>
    </header>
  );
}

type Book = {
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

function AddBookForm({ onSubmit }: { onSubmit: (book: Book) => void }) {
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const title = formData.get("title") as string;
        const totalPages = parseInt(formData.get("totalPages") as string);
        const book: Book = {
          title,
          totalPages,
          currentPage: 0,
          dailyPages: Math.ceil(totalPages / 7),
          startDate: new Date(),
          endDate: (() => {
            const end = new Date();
            end.setDate(end.getDate() + 7);
            return end;
          })(),
          log: [],
        };
        onSubmit(book);
        form.reset();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Add book</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title:</FieldLabel>
              <Input type="text" id="title" name="title" autoFocus required />
            </Field>
            <Field>
              <FieldLabel htmlFor="total-pages">Total pages:</FieldLabel>
              <Input
                type="number"
                id="total-pages"
                name="totalPages"
                required
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field>
          <Input type="submit" value="Add" />
        </Field>
      </FieldGroup>
    </form>
  );
}

function BookCard({
  book,
  onReadUpdate,
}: {
  book: Book;
  onReadUpdate: (readUntil: number) => void;
}) {
  const [seeUpdateForm, setSeeUpdateForm] = useState(false);
  function isReadingGoalMet(book: Book): boolean {
    const lastUpdate = book.log.at(-1);
    if (!lastUpdate) return false;
    const today = new Date();
    if (
      today.getDate() === lastUpdate.date.getDate() &&
      today.getMonth() === lastUpdate.date.getMonth() &&
      today.getFullYear() === lastUpdate.date.getFullYear()
    ) {
      return lastUpdate.pages >= book.dailyPages;
    }
    return false;
  }
  return (
    <Card key={book.title}>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{`Progress: ${book.currentPage.toString()} / ${book.totalPages}`}</p>
        {isReadingGoalMet(book) ? (
          <p>You've met your reading goal for today!</p>
        ) : (
          <p>
            Read <b>until page {book.currentPage + book.dailyPages}</b> to stay
            on track!
          </p>
        )}

        {seeUpdateForm ? (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const readUntil = parseInt(formData.get("readUntil") as string);
              onReadUpdate(readUntil);
              setSeeUpdateForm(false);
              form.reset();
            }}
          >
            <Field orientation={"horizontal"}>
              <Input
                name="readUntil"
                type="number"
                placeholder="Read until page..."
                autoFocus
              />
              <Button>Update</Button>
              <Button variant="ghost" onClick={() => setSeeUpdateForm(false)}>
                Cancel
              </Button>
            </Field>
          </form>
        ) : (
          <Button onClick={() => setSeeUpdateForm(true)}>Read!</Button>
        )}
      </CardContent>
    </Card>
  );
}
