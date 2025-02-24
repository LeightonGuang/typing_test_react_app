import Word from "../Word";
import calcWpm from "@/utils/calcWpm";
import { useEffect, useRef } from "react";

import { WpmDataType } from "@/_types/WpmDataType";
import { TypedWordsType } from "@/_types/TypedWordsType";

interface Props {
  activeCharIndex: number;
  activeWordIndex: number;
  generatedWords: string[];
  inputValue: string;
  isFocused: boolean;
  numErrors: number;
  setNumErrors: React.Dispatch<React.SetStateAction<number>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setTypedWords: React.Dispatch<React.SetStateAction<TypedWordsType>>;
  setActiveCharIndex: React.Dispatch<React.SetStateAction<number>>;
  setActiveWordIndex: React.Dispatch<React.SetStateAction<number>>;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  setWpmData: React.Dispatch<React.SetStateAction<WpmDataType[]>>;
  timer: number;
  typedLetterCount: number;
  typedWords: TypedWordsType;
  wpmData: WpmDataType[];
  startTimer: boolean;
  setStartTimer: React.Dispatch<React.SetStateAction<boolean>>;
  targetNumWords: number;
}

export const TypingAreaContent = ({
  wpmData,
  setWpmData,
  inputValue,
  setInputValue,
  startTimer,
  setStartTimer,
  typedWords,
  setTypedWords,
  activeWordIndex,
  setActiveWordIndex,
  activeCharIndex,
  setActiveCharIndex,
  isFocused,
  setIsFocused,
  numErrors,
  setNumErrors,
  timer,
  generatedWords,
  typedLetterCount,
  setWpm,
  targetNumWords,
}: Props) => {
  const lettersRegex = /^[a-zA-Z]+$/;
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputFocus = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.key;
    console.log("keyPressed: ", keyPressed);

    // stop typing if all words have been typed
    if (wpmData.length === targetNumWords) return;

    if (keyPressed === " ") {
      // handle spacebar
      e.preventDefault();

      setInputValue("");
      setActiveCharIndex(0);
      setActiveWordIndex((prevActiveWordIndex) => prevActiveWordIndex + 1);
      setWpmData((prevWpmData) => {
        return [
          ...prevWpmData,
          {
            typedWord: inputValue,
            wpm: Number(
              calcWpm(typedLetterCount, timer / 100, numErrors).toFixed(2),
            ),
            isCorrect: inputValue === typedWords[activeWordIndex]?.word,
          },
        ];
      });
      setWpm(calcWpm(typedLetterCount, timer / 100, numErrors));
      setNumErrors(() =>
        typedWords.reduce((total, word) => {
          if (word.typed !== word.word && word.typed !== "") {
            return ++total;
          } else {
            return total;
          }
        }, 0),
      );
    } else if (keyPressed === "Backspace") {
      // handle backspace
      e.preventDefault();

      if (activeCharIndex <= 0 && activeWordIndex <= 0) return;

      if (e.ctrlKey) {
        if (activeCharIndex > 0) {
          setInputValue("");
          setActiveCharIndex(0);
          setTypedWords((prevTypedWords) => {
            const newTypedWords = [...prevTypedWords];
            newTypedWords[activeWordIndex] = {
              ...newTypedWords[activeWordIndex],
              typed: "",
            };
            return newTypedWords;
          });
        } else if (activeWordIndex > 0 && activeCharIndex === 0) {
          setInputValue("");
          setActiveCharIndex(0);
          setActiveWordIndex((prevActiveWordIndex) => prevActiveWordIndex - 1);
          setTypedWords((prevTypedWords) => {
            const newTypedWords = [...prevTypedWords];
            newTypedWords[activeWordIndex - 1] = {
              ...newTypedWords[activeWordIndex - 1],
              typed: "",
            };
            return newTypedWords;
          });
        }
      } else if (activeCharIndex > 0) {
        // handle normal backspace
        setActiveCharIndex((prevActiveCharIndex) => prevActiveCharIndex - 1);
        setInputValue(inputValue.slice(0, -1));
        setTypedWords((prevTypedWords) => {
          const newTypedWords = [...prevTypedWords];
          newTypedWords[activeWordIndex].typed = newTypedWords[
            activeWordIndex
          ].typed.slice(0, -1);
          return newTypedWords;
        });
      } else if (activeWordIndex > 0 && activeCharIndex === 0) {
        // handle backspace when it's not the first word and the first char of the word
        setInputValue(typedWords[activeWordIndex - 1].typed);
        setActiveWordIndex((prevActiveWordIndex) => prevActiveWordIndex - 1);
        setActiveCharIndex(typedWords[activeWordIndex - 1].typed.length);
        setTypedWords((prevTypedWords) => {
          const newTypedWords = [...prevTypedWords];
          newTypedWords[activeWordIndex] = {
            ...newTypedWords[activeWordIndex],
            typed: "",
          };
          return newTypedWords;
        });
        setWpmData((prevWpmData) => prevWpmData.slice(0, -1));
      }
    } else if (keyPressed.length !== 1) {
      return;
    } else if (
      lettersRegex.test(keyPressed) &&
      keyPressed !== "Control" &&
      keyPressed !== "Alt"
    ) {
      // handle regular characters
      setInputValue((prevInputValue) => prevInputValue + keyPressed);
      setActiveCharIndex((prevActiveCharIndex) => prevActiveCharIndex + 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    setIsFocused(true);
  }, [generatedWords]);

  useEffect(() => {
    console.log("activeWordIndex:", activeWordIndex);
    console.log("activeCharIndex:", activeCharIndex);
  }, [activeCharIndex, activeWordIndex]);

  useEffect(() => {
    if (!startTimer) setStartTimer(true);
    if (inputValue.length === 0) setActiveCharIndex(0);

    if (lettersRegex.test(inputValue.trim())) {
      setTypedWords((prevTypedWords) => {
        return prevTypedWords.map((word, index) => {
          if (activeWordIndex === index) {
            return {
              ...word,
              typed: inputValue.trim(),
            };
          } else {
            return word;
          }
        });
      });
    }
  }, [inputValue]);

  return (
    <div
      tabIndex={0}
      className={`${isFocused ? null : "blur-sm"} m-4 flex select-none flex-wrap gap-1 overflow-hidden text-lg focus:outline-none`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={onInputFocus}
    >
      {typedWords.map(({ word, typed }, wordIndex) => {
        const splittedWord = word.split("");
        const splittedTypedWord = typed.split("");

        if (splittedTypedWord.length <= splittedWord.length) {
          // if the typed word is shorter than the word
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
        } else if (splittedTypedWord.length > splittedWord.length) {
          // if the typed word is longer than the word
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

      <input
        className="h-0 w-0"
        type="text"
        value={inputValue}
        ref={inputRef}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};
