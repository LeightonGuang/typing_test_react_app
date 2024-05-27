import React from "react";

const Char = ({
  char,
  isCorrect,
}: {
  char: string;
  isCorrect: boolean | null;
}) => {
  return (
    <span
      className={`${
        isCorrect
          ? "text-correct"
          : isCorrect === false
          ? "text-wrong"
          : "text-white"
      }`}
    >
      {char}
    </span>
  );
};

export default Char;
