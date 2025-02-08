import React from "react";

interface Props {
  char: string;
  isCorrect: boolean | null;
  isActive: boolean;
}

const Letter = ({ char, isCorrect, isActive }: Props) => {
  return (
    <span
      className={`${isActive && "bg-slate-500 bg-opacity-100"} ${isCorrect === null && "text-white"} ${isCorrect === true && "text-green-500"} ${isCorrect === false && "text-red-500"} `}
    >
      {char}
    </span>
  );
};

export default Letter;
