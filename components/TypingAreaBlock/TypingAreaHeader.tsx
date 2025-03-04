"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

interface Props {
  wpm: number;
  timer: number;
  numErrors: number;
  activeWordIndex: number;
  resetTypingArea: () => void;
  setTargetNumWords: React.Dispatch<React.SetStateAction<number>>;
  generateWords: (numWords: number) => string[];
  setGeneratedWords: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TypingAreaHeader = ({
  wpm,
  timer,
  numErrors,
  activeWordIndex,
  resetTypingArea,
  setTargetNumWords,
  generateWords,
  setGeneratedWords,
}: Props) => {
  const [toggleOn, setToggleOn] = useState({
    25: true,
    50: false,
    100: false,
  });

  const handleToggleChange = (numWords: number) => {
    setToggleOn({
      25: 25 === numWords,
      50: 50 === numWords,
      100: 100 === numWords,
    });
    resetTypingArea();
    setGeneratedWords(generateWords(numWords));
    setTargetNumWords(numWords);
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
            disabled={toggleOn[25]}
            variant={"outline"}
            onClick={() => handleToggleChange(25)}
          >
            <span>25 words</span>
          </Button>

          <Button
            className="w-full rounded-none"
            disabled={toggleOn[50]}
            variant={"outline"}
            onClick={() => handleToggleChange(50)}
          >
            <span>50 words</span>
          </Button>

          <Button
            className="w-full rounded-none"
            disabled={toggleOn[100]}
            variant={"outline"}
            onClick={() => handleToggleChange(100)}
          >
            <span>100 words</span>
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
