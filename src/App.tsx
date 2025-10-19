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
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  function addBook(book: Book) {
    setBooks([...books, book]);
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        <Header />
        <main className="mt-4">
          <AddBookForm onSubmit={addBook} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Books:</h2>
            {books.map((book) => (
              <Card key={book.title}>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {`Progress: ${book.currentPage.toString()} / ${book.totalPages}`}
                  </p>
                </CardContent>
              </Card>
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
  daysToFinish: number;
  startDate: Date;
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
        const book: Book = {
          title: formData.get("title") as string,
          currentPage: 0,
          totalPages: parseInt(formData.get("totalPages") as string),
          daysToFinish: parseInt(formData.get("daysToFinish") as string),
          startDate: new Date(),
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
            <Field>
              <FieldLabel htmlFor="days-to-finish">Days to finish:</FieldLabel>
              <Input
                type="number"
                defaultValue={7}
                id="days-to-finish"
                name="daysToFinish"
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
