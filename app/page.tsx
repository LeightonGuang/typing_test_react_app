import TypingArea from "@/components/TypingArea";

export default function Home() {
  return (
    <main className="home flex h-dvh w-dvw">
      <div className="home__container justify-center my-48 mx-auto">
        {/* <h1 className="home__title">Home</h1> */}
        <div className="">
          <TypingArea />
        </div>
      </div>
    </main>
  );
}
