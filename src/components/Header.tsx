import { BookCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center">
      <BookCheck /> <h1 className="text-2xl font-bold">book-a-week</h1>
    </header>
  );
}
