import { LetterType } from "@/_types/LetterType";
import React from "react";
import Char from "./Char";

const Word = ({ word, wIndex }: { word: LetterType[]; wIndex: number }) => {
  return (
    <div
      className={`typingAreaBlock__word block gap-[5rem] h-[2.25rem] min-w-[4rem] ${
        wIndex === 0 ? "bg-[#888888]" : ""
      }`}
      key={wIndex}
    >
      {word &&
        word.map((charObj: LetterType, cIndex: number) => (
          <span className="typingAreaBlock__char" key={cIndex}>
            <Char
              char={(charObj.char ?? charObj.typedChar) as string}
              isCorrect={!("char" in charObj) ? false : charObj.isCorrect}
            />
          </span>
        ))}
    </div>
  );
};

export default Word;
