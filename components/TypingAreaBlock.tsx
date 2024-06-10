"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Word from "./Word";

import { TypingAreaType } from "@/_types/TypingAreaType";
import { LetterType } from "@/_types/LetterType";
import { WordIndexType } from "@/_types/WordIndexType";
import { wordList } from "@/_assets/wordList";
import { GenerateWordsType } from "@/_types/GenerateWordsType";
import { ConvertWordsToDisplayWordsType } from "@/_types/ConvertWordsToDisplayWordsType";
import { HandleKeyPressType } from "@/_types/HandleKeyPressType";

const TypingAreaBlock: TypingAreaType = () => {
  const typingAreaRef: any = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [wordIndex, setwordIndex] = useState<WordIndexType>({
    index: 0,
    letterIndex: -1,
  });

  const [lastTwoTypedWords, setLastTwoTypedWords] = useState<LetterType[][]>([
    [{ char: null, typedChar: null, isCorrect: null }],
    [{ char: null, typedChar: null, isCorrect: null }],
  ]);

  const [displayWordList, setDisplayWordList] = useState<LetterType[][]>([]);

  /*
  displayWordList: [
    [
      { char: "h", typedChar: null, isCorrect: null },
      { char: "e", typedChar: null, isCorrect: null },
      { char: "l", typedChar: null, isCorrect: null },
      { char: "l", typedChar: null, isCorrect: null },
      { char: "o", typedChar: null, isCorrect: null },
    ],
    [
      { char: "w", typedChar: null, isCorrect: null },
      { char: "o", typedChar: null, isCorrect: null },
      { char: "r", typedChar: null, isCorrect: null },
      { char: "l", typedChar: null, isCorrect: null },
      { char: "d", typedChar: null, isCorrect: null },
    ],
  ],
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

  function handleSpaceKeyPress(): void {
    const newTypedList: LetterType[][] = [];
    [newTypedList[0], newTypedList[1]] = [
      lastTwoTypedWords[1],
      displayWordList[wordIndex.index],
    ];
    setLastTwoTypedWords(newTypedList);
    setwordIndex({ index: wordIndex.index + 1, letterIndex: -1 });
  }

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
      handleSpaceKeyPress();
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

      const letterObj: LetterType | undefined =
        displayWordList[wordIndex.index]?.[newLetterIndex];

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

  const typingAreaWords: () => LetterType[][] = () => {
    const wordsList: LetterType[][] = [];

    for (let i: number = 0; i < 15; i++) {
      wordsList.push(displayWordList[wordIndex.index + i]);
    }
    return wordsList;
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
      className={`typingAreaBlock flex-col bg-slate-600 py-[1rem] px-[1.5rem] rounded-md ${
        isFocused ? "" : "filter blur-sm"
      }`}
    >
      <div className="typingAreaBlock__typed flex gap-[0.1rem] flex-col text-[1.5rem] min-w-[4rem] min-h-[4.5rem]">
        {lastTwoTypedWords.map((word: LetterType[], wIndex: number) => (
          <Word word={word} wIndex={wIndex} isTyping={false} key={wIndex} />
        ))}
      </div>
      <div className="typingAreaBlock__column flex gap-[0.1rem] flex-col text-[1.5rem] min-w-[4rem] min-h-[18rem]">
        {typingAreaWords().map((word: LetterType[], wIndex: number) => (
          <Word word={word} wIndex={wIndex} isTyping={true} key={wIndex} />
        ))}
      </div>
    </div>
  );
};

export default TypingAreaBlock;
