"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Char from "./Char";

import { LetterType } from "@/_types/LetterType";
import { WordIndexType } from "@/_types/WordIndexType";
import { wordList } from "@/_assets/wordList";
import { GenerateWordsType } from "@/_types/GenerateWordsType";
import { ConvertWordsToDisplayWordsType } from "@/_types/ConvertWordsToDisplayWordsType";
import { HandleKeyPressType } from "@/_types/HandleKeyPressType";

type TypingAreaType = () => JSX.Element;

const TypingArea: TypingAreaType = () => {
  const typingAreaRef: any = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [wordIndex, setwordIndex] = useState<WordIndexType>({
    index: 0,
    letterIndex: -1,
  });

  const [displayWordList, setDisplayWordList] = useState<LetterType[][]>([]);

  /**
   * / displayWordList: string[] = [
   * [`<span className={text-correct}>c</span>`, `<span className={text-correct}>a</span>`, `<span className={text-correct}>n</span>`],
   * [`<span className={text-correct}>a</span>``<span className={text-correct}>t</span>`]
   * ]
   */

  const generateWords: GenerateWordsType = (numWords: number = 10) => {
    const newWordList: string[] = [];
    for (let i: number = 0; i < numWords; i++) {
      const newWord: string =
        wordList[Math.floor(Math.random() * wordList.length)];
      newWordList.push(newWord);
    }
    return newWordList;
  };

  // convert a list of words to a list of display words with <span> around every letter
  const convertWordsToDisplayWords: ConvertWordsToDisplayWordsType = (
    words: string[]
  ) => {
    const groupedList: Object[][] = words.map((word: string) => {
      const splitedWord: string[] = word.split("");
      const wrapedWord: Object[] = splitedWord.map((char: string) => ({
        char: char,
        typedChar: null,
        isCorrect: null,
      }));
      return wrapedWord;
    });
    return groupedList;
  };

  const checkDivFocus: any = () => {
    if (typingAreaRef.current === document.activeElement) {
      setIsFocused(true);
    } else if (typingAreaRef.current !== document.activeElement) {
      setIsFocused(false);
    }
  };

  const handleKeyPress: HandleKeyPressType = (event) => {
    const typedKey: string = event.key;

    console.log(displayWordList);

    if (typedKey === "Backspace") {
      if (wordIndex.index === 0 && wordIndex.letterIndex === -1) return;
      // first letter of the word

      console.log({
        index: wordIndex.index,
        letterIndex: wordIndex.letterIndex,
      });

      // remove letter from typed list
      const newDisplayWordList: LetterType[][] = [...displayWordList];

      newDisplayWordList[wordIndex.index][wordIndex.letterIndex] = {
        ...newDisplayWordList[wordIndex.index][wordIndex.letterIndex],
        typedChar: "",
        isCorrect: null,
      };

      setDisplayWordList(newDisplayWordList);

      if (wordIndex.letterIndex === -1) {
        // first letter of the word
        setwordIndex({
          index: wordIndex.index - 1,
          letterIndex: displayWordList[wordIndex.index - 1].length - 1,
        });
      } else if (wordIndex.letterIndex !== -1) {
        // not the first letter of the word
        setwordIndex({
          index: wordIndex.index,
          letterIndex: wordIndex.letterIndex - 1,
        });
      }
    } else if (typedKey === " ") {
      // space
      console.log("space");
      setwordIndex({ index: wordIndex.index + 1, letterIndex: -1 });
    } else if (/[a-zA-Z]/.test(typedKey)) {
      // are letters
      console.log("letter");

      const newLetterIndex: number = wordIndex.letterIndex + 1;

      console.log({
        index: wordIndex.index,
        letterIndex: newLetterIndex,
        typed: event.key,
      });

      if (Object.is(wordIndex, { index: 0, letterIndex: -1 }) === false) {
        // not the first letter of the first word
        setwordIndex({
          index: wordIndex.index,
          letterIndex: newLetterIndex,
        });
      }

      const letterObj: LetterType =
        displayWordList[wordIndex.index][newLetterIndex];

      // add letter to typed list
      setDisplayWordList((prevDisplayWordList: LetterType[][]) => {
        const newDisplayWordList: LetterType[][] = [...prevDisplayWordList];
        newDisplayWordList[wordIndex.index][newLetterIndex] = {
          ...newDisplayWordList[wordIndex.index][newLetterIndex],
          typedChar: typedKey,
        };
        return newDisplayWordList;
      });

      letterObj.typedChar = typedKey;

      // determine if letter is correct or not
      if (letterObj.char === typedKey) {
        setDisplayWordList((prevDisplayWordList: LetterType[][]) => {
          const newDisplayWordList: LetterType[][] = [...prevDisplayWordList];
          newDisplayWordList[wordIndex.index][newLetterIndex] = {
            ...newDisplayWordList[wordIndex.index][newLetterIndex],
            isCorrect: true,
          };
          return newDisplayWordList;
        });
      } else if (letterObj.char !== typedKey) {
        setDisplayWordList((prevDisplayWordList: LetterType[][]) => {
          const newDisplayWordList: LetterType[][] = [...prevDisplayWordList];
          newDisplayWordList[wordIndex.index][newLetterIndex] = {
            ...newDisplayWordList[wordIndex.index][newLetterIndex],
            isCorrect: false,
          };
          return newDisplayWordList;
        });
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    // focus on typing area when loaded
    typingAreaRef.current.focus();
    const newWords: string[] = generateWords();
    setDisplayWordList((prevArray: any) => [
      ...prevArray,
      ...convertWordsToDisplayWords(newWords),
    ]);
  }, []);

  return (
    <div
      onKeyDown={handleKeyPress}
      ref={typingAreaRef}
      tabIndex={0}
      onFocus={checkDivFocus}
      onBlur={checkDivFocus}
      className={`typingArea inline-flex gap-2 bg-slate-600 p-3 rounded-md text-[1.2rem] max-w-[50rem] ${
        isFocused ? "" : "filter blur-sm"
      }`}
    >
      {displayWordList.map((word: LetterType[], wIndex: number) => (
        <div
          key={wIndex}
          className={`word rounded-[0.375rem] ${
            wIndex === wordIndex.index ? "bg-[#888888]" : ""
          }`}
        >
          {word.map((charObj: LetterType, cIndex) => (
            <span
              key={cIndex}
              // className={`word__container ${
              //   wIndex === wordIndex.index && cIndex === wordIndex.letterIndex
              //     ? "bg-[#ff0000]"
              //     : ""
              // }`}
            >
              <Char char={charObj.char} isCorrect={charObj.isCorrect} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TypingArea;
