import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import type { Book } from "@/lib/book";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import BookActionsMenu from "./BookActionsMenu";

export default function BookCard({
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
      </CardContent>
      <CardFooter>
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
          <>
            <Button onClick={() => setSeeUpdateForm(true)}>Read!</Button>
            <BookActionsMenu
              onFinish={function (): void {
                confirm("Finish book?");
              }}
              onAbandon={function (): void {
                confirm("Abandon book?");
              }}
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
