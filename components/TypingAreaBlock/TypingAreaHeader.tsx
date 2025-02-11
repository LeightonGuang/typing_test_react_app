import { CardHeader } from "../ui/card";

interface Props {
  timer: number;
  wpm: number;
}

export const TypingAreaHeader = ({ timer, wpm }: Props) => {
  return (
    <CardHeader>
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
    </CardHeader>
  );
};
