import TypingAreaBlock from "@/components/TypingAreaBlock";

export default function Home() {
  return (
    <main className="home flex justify-center items-center h-[calc(100dvh-3.5rem)] w-dvw">
      <div className="home__container">
        <TypingAreaBlock />
      </div>
    </main>
  );
}
