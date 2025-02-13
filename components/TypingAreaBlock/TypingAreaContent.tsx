import { useRef } from "react";
import Word from "../Word";
import { TypedWordsType } from "@/_types/TypedWordsType";

interface Props {
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
      className="m-4 flex select-none flex-wrap gap-1 overflow-hidden text-lg"
      onClick={onInputFocus}
    >
      {typedWords.map(({ word, typed }, wordIndex) => {
        const splittedWord = word.split("");
        const splittedTypedWord = typed.split("");

        if (splittedTypedWord.length <= splittedWord.length) {
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

            return { char: letter, isCorrect, isActive };
          });

          return (
            <Word key={wordIndex} splittedWordsLetters={splittedWordsLetters} />
          );
        }
        if (splittedTypedWord.length > splittedWord.length) {
          const splittedWordsLetters = splittedTypedWord.map(
            (typedChar, charIndex) => {
              const isCorrect =
                splittedTypedWord[charIndex] === undefined
                  ? undefined
                  : splittedWord[charIndex] === typedChar
                    ? true
                    : false;
              const isActive =
                charIndex === activeCharIndex && wordIndex === activeWordIndex;

              return { char: typedChar, isCorrect, isActive };
            },
          );

          return (
            <Word key={wordIndex} splittedWordsLetters={splittedWordsLetters} />
          );
        }
      })}
    </div>
  );
};
