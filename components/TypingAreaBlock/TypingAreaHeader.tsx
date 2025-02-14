import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

interface Props {
  timer: number;
  wpm: number;
  setNumWords: (numWords: number) => void;
  resetTypingArea: () => void;
  generateWords: (numWords: number) => string[];
  setGeneratedWords: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TypingAreaHeader = ({
  timer,
  wpm,
  setNumWords,
  resetTypingArea,
  generateWords,
  setGeneratedWords,
}: Props) => {
  const handleWordNumberButton = (numWords: number) => {
    resetTypingArea();
    setGeneratedWords(generateWords(numWords));
    
  };

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
            onClick={() => handleWordNumberButton(25)}
          >
            <span>25 words</span>
          </Button>

          <Button
            className="w-full rounded-none"
            variant={"outline"}
            onClick={() => handleWordNumberButton(50)}
          >
            <span>50 words</span>
          </Button>

          <Button
            className="w-full rounded-none"
            variant={"outline"}
            onClick={() => handleWordNumberButton(100)}
          >
            <span>100 words</span>
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
