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

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  function addBook(book: Book) {
    setBooks([...books, book]);
  }

  return (
    <>
      <Header />
      <main className="mt-4">
        <AddBookForm onSubmit={addBook} />
        <ol>
          {books.map((book) => (
            <li key={book.title}>{book.title}</li>
          ))}
        </ol>
      </main>
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
  daysToFinish: number;
  startDate: Date;
};

function AddBookForm({ onSubmit }: { onSubmit: (book: Book) => void }) {
  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const book: Book = {
            title: formData.get("title") as string,
            totalPages: parseInt(formData.get("totalPages") as string),
            daysToFinish: parseInt(formData.get("daysToFinish") as string),
            startDate: new Date(),
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
                <FieldLabel htmlFor="days-to-finish">
                  Days to finish:
                </FieldLabel>
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
    </div>
  );
}
