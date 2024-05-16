"use client";

import React from "react";
import { useState } from "react";
import Word from "./Word";

const TypingArea = () => {
  const [key, setKey] = useState<string>("");
  const wordList: string[] = ["typing", "area", "one", "two", "three"];

  const handleKeyPress = (event: any) => {
    setKey(event.key);
  };

  return (
    <>
      <div>{key}</div>
      <div
        onKeyDown={handleKeyPress}
        tabIndex={0}
        className=" inline-flex gap-2 bg-slate-600 p-3 rounded-md text-[1.2rem]"
      >
        {wordList.map((word) => (
          <Word word={word} />
        ))}
      </div>
    </>
  );
};

export default TypingArea;
