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
          : isCorrect === null
          ? "text-white"
          : "text-wrong"
      }`}
    >
      {char}
    </span>
  );
};

export default Char;
