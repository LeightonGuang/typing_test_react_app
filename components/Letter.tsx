"use client";

import { useEffect, useState } from "react";

interface Props {
  char: string;
  isCorrect: boolean | undefined;
  isActive: boolean;
}

const Letter = ({ char, isCorrect, isActive }: Props) => {
  const [caret, setCaret] = useState<string>("block");

  useEffect(() => {
    const localSettings = localStorage.getItem("settings");
    if (localSettings) setCaret(JSON.parse(localSettings).caret);
  }, []);

  return (
    <div
      className={`relative font-mono ${isCorrect === undefined && "text-muted-foreground"} ${isCorrect === true && "text-foreground"} ${isCorrect === false && "text-destructive"} `}
    >
      <span
        className={`${isActive ? "absolute" : "hidden"} ${!caret && "inset-0 bg-input opacity-50"} ${caret === "block" && "inset-0 bg-input opacity-50"} ${caret === "bar" && "h-full w-full border-l border-foreground"} ${caret === "underline" && "h-full w-full border-b-2 border-foreground"}`}
      />
      {char}
    </div>
  );
};

export default Letter;
