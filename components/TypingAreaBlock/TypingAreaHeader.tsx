import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

interface Props {
  timer: number;
  wpm: number;
  setNumWords: (numWords: number) => void;
}

export const TypingAreaHeader = ({ timer, wpm, setNumWords }: Props) => {
  return (
    <CardHeader>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center gap-1">
            <span>Time</span>
            <span className="text-2xl font-bold">{timer}s</span>
          </div>

          <div className="flex flex-col gap-1">
            <span>WPM</span>
            <span className="text-2xl font-bold">{wpm}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span>Correct | Wrong</span>
            <span className="text-2xl font-bold">0 | 0</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="w-full rounded-none"
            variant={"outline"}
            onClick={() => setNumWords(25)}
          >
            <span>25 words</span>
          </Button>

          <Button
            className="w-full rounded-none"
            variant={"outline"}
            onClick={() => setNumWords(50)}
          >
            <span>50 words</span>
          </Button>

          <Button
            className="w-full rounded-none"
            variant={"outline"}
            onClick={() => setNumWords(100)}
          >
            <span>100 words</span>
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
