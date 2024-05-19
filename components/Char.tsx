import React from "react";

const Char = ({ char, isCorrect }: { char: string; isCorrect: boolean }) => {
  return (
    <span className={`${isCorrect ? "text-correct" : "text-wrong"}`}>
      {char}
    </span>
  );
};

export default Char;
