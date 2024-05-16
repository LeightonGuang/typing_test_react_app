"use client";

import React, { useRef } from "react";
import { useState } from "react";
import Word from "./Word";

const TypingArea = () => {
  const [key, setKey]: [string, any] = useState<string>("");
  const divRef: any = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const wordList: string[] = ["typing", "area", "one", "two", "three"];

  const checkDivFocus: any = () => {
    if (divRef.current === document.activeElement) {
      setIsFocused(true);
    } else if (divRef.current !== document.activeElement) {
      setIsFocused(false);
    }
  };

  const handleKeyPress = (event: any) => {
    setKey(event.key);
  };

  return (
    <div>
      <div>{key}</div>
      <div
        onKeyDown={handleKeyPress}
        ref={divRef}
        tabIndex={0}
        onFocus={checkDivFocus}
        onBlur={checkDivFocus}
        className={`inline-flex gap-2 bg-slate-600 p-3 rounded-md text-[1.2rem] ${
          isFocused ? "" : "filter blur-sm"
        }`}
      >
        {wordList.map((word) => (
          <Word word={word} />
        ))}
      </div>
    </div>
  );
};

export default TypingArea;
