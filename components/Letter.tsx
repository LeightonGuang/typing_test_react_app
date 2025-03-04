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

  // TODO blinking caret

  return (
    <div
      className={`relative ${isCorrect === undefined && "text-muted-foreground"} ${isCorrect === true && "text-foreground"} ${isCorrect === false && "text-destructive"} `}
    >
      <span
        className={`${isActive ? "absolute" : "hidden"} ${caret === "block" && "inset-0 bg-input opacity-50"} ${caret === "underline" && "h-full w-full border-b-2 border-input"} ${caret === "bar" && "h-full w-full border-l border-input"}`}
      />
      {char}
    </div>
  );
};

export default Letter;
