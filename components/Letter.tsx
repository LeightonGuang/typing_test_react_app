"use client";

interface Props {
  char: string;
  isCorrect: boolean | undefined;
  isActive: boolean;
}

const Letter = ({ char, isCorrect, isActive }: Props) => {
  return (
    <div
      className={`relative ${isCorrect === undefined && "text-muted-foreground"} ${isCorrect === true && "text-foreground"} ${isCorrect === false && "text-destructive"} `}
    >
      <span
        className={`absolute inset-0 ${isActive && "bg-input opacity-50"}`}
      />
      {char}
    </div>
  );
};

export default Letter;
