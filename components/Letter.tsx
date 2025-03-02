"use client";

interface Props {
  char: string;
  isCorrect: boolean | undefined;
  isActive: boolean;
}

const Letter = ({ char, isCorrect, isActive }: Props) => {
  return (
    <span
      className={`${isActive && "bg-input bg-opacity-100"} ${isCorrect === undefined && "text-muted-foreground"} ${isCorrect === true && "text-foreground"} ${isCorrect === false && "text-destructive"} `}
    >
      {char}
    </span>
  );
};

export default Letter;
