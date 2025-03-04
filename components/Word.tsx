"use client";

import Letter from "./Letter";

interface Props {
  className?: string;
  splittedWordsLetters: {
    char: string;
    isCorrect: boolean | undefined;
    isActive: boolean;
  }[];
}

const Word = ({ className, splittedWordsLetters }: Props) => {
  return (
    <div className={`${className} flex text-xl hover:cursor-text`}>
      {splittedWordsLetters.map(
        ({ char, isCorrect, isActive }, letterIndex) => {
          return (
            <Letter
              key={letterIndex}
              char={char}
              isCorrect={isCorrect}
              isActive={isActive}
            />
          );
        },
      )}
    </div>
  );
};

export default Word;
