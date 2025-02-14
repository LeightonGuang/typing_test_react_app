import Word from "../Word";
import { useEffect, useRef } from "react";

import { TypedWordsType } from "@/_types/TypedWordsType";

interface Props {
  typedWords: TypedWordsType;
  activeCharIndex: number;
  activeWordIndex: number;
  generatedWords: string[];
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TypingAreaContent = ({
  typedWords,
  activeCharIndex,
  activeWordIndex,
  generatedWords,
  isFocused,
  setIsFocused,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputFocus = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
    setIsFocused(true);
  }, [generatedWords]);

  return (
    <div
      tabIndex={0}
      className={`${isFocused ? null : "blur-sm"} m-4 flex select-none flex-wrap gap-1 overflow-hidden text-lg focus:outline-none`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={onInputFocus}
      ref={inputRef}
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
