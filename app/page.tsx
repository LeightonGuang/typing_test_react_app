import TypingArea from "@/components/TypingArea";

export default function Home() {
  return (
    <main className="m-4">
      <div>
        <h1>Home</h1>
        <input type="text" className="outline" />
        <TypingArea />
      </div>
    </main>
  );
}
