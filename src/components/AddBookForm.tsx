import { Input } from "./ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { newBook, type Book } from "@/lib/book";

export default function AddBookForm({
  onSubmit,
}: {
  onSubmit: (book: Book) => void;
}) {
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const title = formData.get("title") as string;
        const totalPages = parseInt(formData.get("totalPages") as string);
        const book = newBook({ title, totalPages });
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
