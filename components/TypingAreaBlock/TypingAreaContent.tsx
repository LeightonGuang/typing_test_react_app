import { useRef } from "react";
import Word from "../Word";
import { TypedWordsType } from "@/_types/TypedWordsType";

interface Props {
  generatedWords: string[];
  typedWords: TypedWordsType;
  activeCharIndex: number;
  activeWordIndex: number;
}

export const TypingAreaContent = ({
  typedWords,
  activeCharIndex,
  activeWordIndex,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputFocus = () => {
    inputRef.current?.focus();
    console.log("focus");
  };

  return (
    <div
      className="flex select-none flex-wrap gap-1 p-4 text-lg"
      onClick={onInputFocus}
    >
      {typedWords.map(({ word, typed }, wordIndex) => {
        const splittedWord = word.split("");
        const splittedTypedWord = typed.split("");

        const splittedWordsLetters = splittedWord.map((char, charIndex) => {
          const letter = splittedTypedWord[charIndex] || char;
          const isCorrect =
            splittedTypedWord[charIndex] === undefined
              ? undefined
              : splittedTypedWord[charIndex] === char
                ? true
                : false;
          const isActive =
            charIndex === activeCharIndex && wordIndex === activeWordIndex;

          return { char: letter, isCorrect: isCorrect, isActive: isActive };
        });

        return (
          <Word key={wordIndex} splittedWordsLetters={splittedWordsLetters} />
        );
      })}
    </div>
  );
};
