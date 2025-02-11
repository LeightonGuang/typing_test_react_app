"use client";

interface Props {
  char: string;
  isCorrect: boolean | undefined;
  isActive: boolean;
}

const Letter = ({ char, isCorrect, isActive }: Props) => {
  return (
    <span
      className={`${isActive && "bg-slate-500 bg-opacity-100"} ${isCorrect === undefined && "text-white"} ${isCorrect === true && "text-[#7BC950]"} ${isCorrect === false && "text-[#F71735]"} `}
    >
      {char}
    </span>
  );
};

export default Letter;
