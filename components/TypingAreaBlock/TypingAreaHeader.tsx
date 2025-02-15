import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

interface Props {
  timer: number;
  wpm: number;
  resetTypingArea: () => void;
  generateWords: (numWords: number) => string[];
  setGeneratedWords: React.Dispatch<React.SetStateAction<string[]>>;
  activeWordIndex: number;
  numErrors: number;
  setNumWords: React.Dispatch<React.SetStateAction<number>>;
}

export const TypingAreaHeader = ({
  timer,
  wpm,
  resetTypingArea,
  generateWords,
  setGeneratedWords,
  activeWordIndex,
  numErrors,
  setNumWords,
}: Props) => {
  const handleWordNumberButton = (numWords: number) => {
    resetTypingArea();
    setGeneratedWords(generateWords(numWords));
    setNumWords(numWords);
  };

  const convertedTime = (ms: number) => {
    return ms / 100;
  };

  return (
    <CardHeader>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center gap-1">
            <span>Time (s)</span>
            <div className="flex gap-2 text-2xl font-bold">
              <span className="w-20">{convertedTime(timer)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span>WPM</span>
            <span className="text-2xl font-bold">{wpm.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span>Correct | Wrong</span>
            <span className="text-2xl font-bold">{`${activeWordIndex - numErrors} | ${numErrors}`}</span>
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
