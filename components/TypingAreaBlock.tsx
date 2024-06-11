"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Word from "./Word";

import { TypingAreaType } from "@/_types/TypingAreaType";
import { WordIndexType } from "@/_types/WordIndexType";
import { testWordList } from "@/_assets/testWordList";
import { GenerateWordsType } from "@/_types/GenerateWordsType";
import { ConvertWordsToDisplayWordsListType } from "@/_types/ConvertWordsToDisplayWordsListType";
import { HandleKeyPressType } from "@/_types/HandleKeyPressType";
import { LetterType } from "@/_types/LetterType";
import { WordType } from "@/_types/WordType";

const TypingAreaBlock: TypingAreaType = () => {
  const typingAreaRef: any = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [wordIndex, setwordIndex] = useState<WordIndexType>({
    index: 0,
    letterIndex: -1,
  });

  const [lastTwoTypedWordsList, setLastTwoTypedWordsList] = useState<
    WordType[]
  >([
    { wordLetters: [{ char: null, typedChar: null, isCorrect: null }] },
    { wordLetters: [{ char: null, typedChar: null, isCorrect: null }] },
  ]);

  const [displayWordList, setDisplayWordList] = useState<WordType[]>([]);

  // const displayWordList: WordType[] = [
  //   {
  //     wordLetters: [
  //       { char: "h", typedChar: null, isCorrect: null },
  //       { char: "e", typedChar: null, isCorrect: null },
  //       { char: "l", typedChar: null, isCorrect: null },
  //       { char: "l", typedChar: null, isCorrect: null },
  //       { char: "o", typedChar: null, isCorrect: null },
  //     ],
  //   },
  //   {
  //     wordLetters: [
  //       [
  //         { char: "w", typedChar: null, isCorrect: null },
  //         { char: "o", typedChar: null, isCorrect: null },
  //         { char: "r", typedChar: null, isCorrect: null },
  //         { char: "l", typedChar: null, isCorrect: null },
  //         { char: "d", typedChar: null, isCorrect: null },
  //       ],
  //     ],
  //   },
  // ];

  const generateWords: GenerateWordsType = (numWords: number = 10) => {
    const newWordList: string[] = [];
    for (let i: number = 0; i < numWords; i++) {
      const newWord: string =
        testWordList[Math.floor(Math.random() * testWordList.length)];
      newWordList.push(newWord);
    }
    return newWordList;
  };

  // convert a list of words to a list of display words with <span> around every letter
  const convertWordsToDisplayWordsList: ConvertWordsToDisplayWordsListType = (
    words: string[]
  ) => {
    const groupedWordsList: WordType[] = words.map((word: string) => {
      const splitedWord: string[] = word.split("");
      const wrapedWord: LetterType[] = splitedWord.map((char: string) => ({
        char: char,
        typedChar: null,
        isCorrect: null,
      }));
      return { wordLetters: wrapedWord };
    });
    return groupedWordsList;
  };

  const checkDivFocus: any = () => {
    if (typingAreaRef.current === document.activeElement) {
      setIsFocused(true);
    } else if (typingAreaRef.current !== document.activeElement) {
      setIsFocused(false);
    }
  };

  const handleKeyPress: HandleKeyPressType = (event) => {
    function handleBackSpaceKeyPress(): void {
      if (wordIndex.index === 0 && wordIndex.letterIndex === -1) return;
      // first letter of the word

      console.log({
        index: wordIndex.index,
        letterIndex: wordIndex.letterIndex,
      });

      const newTypedList: WordType[] = [];
      [newTypedList[0], newTypedList[1]] = [
        displayWordList[wordIndex.index - 2],
        displayWordList[wordIndex.index - 1],
      ];

      // remove letter from typed list
      let newDisplayWordList: WordType[] = [];
      newDisplayWordList = [...displayWordList];

      newDisplayWordList[wordIndex.index].wordLetters[wordIndex.letterIndex] = {
        ...newDisplayWordList[wordIndex.index].wordLetters[
          wordIndex.letterIndex
        ],
        typedChar: "",
        isCorrect: null,
      };

      setDisplayWordList(newDisplayWordList);

      if (wordIndex.letterIndex === -1) {
        // first letter of the word
        setwordIndex({
          index: wordIndex.index - 1,
          letterIndex:
            displayWordList[wordIndex.index - 1].wordLetters.length - 1,
        });
      } else if (wordIndex.letterIndex !== -1) {
        // not the first letter of the word
        setwordIndex({
          index: wordIndex.index,
          letterIndex: wordIndex.letterIndex - 1,
        });
      }
    }

    function handleSpaceKeyPress(): void {
      const newTypedList: WordType[] = [];
      [newTypedList[0], newTypedList[1]] = [
        lastTwoTypedWordsList[1],
        displayWordList[wordIndex.index],
      ];
      setLastTwoTypedWordsList(newTypedList);
      setwordIndex({ index: wordIndex.index + 1, letterIndex: -1 });
    }

    const typedKey: string = event.key;

    console.log(displayWordList);

    if (typedKey === "Backspace") {
      handleBackSpaceKeyPress();
    } else if (typedKey === " ") {
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
        displayWordList[wordIndex.index]?.wordLetters[newLetterIndex];

      // add letter to typed list
      setDisplayWordList((prevDisplayWordList: WordType[]) => {
        const newDisplayWordList: WordType[] = [...prevDisplayWordList];
        newDisplayWordList[wordIndex.index].wordLetters[newLetterIndex] = {
          ...newDisplayWordList[wordIndex.index].wordLetters[newLetterIndex],
          typedChar: typedKey,
        };
        return newDisplayWordList;
      });

      letterObj.typedChar = typedKey;

      // determine if letter is correct or not
      if (letterObj.char === typedKey) {
        setDisplayWordList((prevDisplayWordList: WordType[]) => {
          const newDisplayWordList: WordType[] = [...prevDisplayWordList];
          newDisplayWordList[wordIndex.index].wordLetters[newLetterIndex] = {
            ...newDisplayWordList[wordIndex.index].wordLetters[newLetterIndex],
            isCorrect: true,
          };
          return newDisplayWordList;
        });
      } else if (letterObj.char !== typedKey) {
        setDisplayWordList((prevDisplayWordList: WordType[]) => {
          const newDisplayWordList: WordType[] = [...prevDisplayWordList];
          newDisplayWordList[wordIndex.index].wordLetters[newLetterIndex] = {
            ...newDisplayWordList[wordIndex.index].wordLetters[newLetterIndex],
            isCorrect: false,
          };
          return newDisplayWordList;
        });
      }
    } else {
      return;
    }
  };

  const typingAreaWords: () => WordType[] = () => {
    const wordObjList: WordType[] = [];

    for (let i: number = 0; i < 15; i++) {
      if (wordIndex.index + i < displayWordList.length) {
        wordObjList.push({
          wordLetters: displayWordList[wordIndex.index + i].wordLetters,
        });
      }
    }
    return wordObjList;
  };

  useEffect(() => {
    // focus on typing area when loaded
    typingAreaRef.current.focus();
    const newGeneratedWords: string[] = generateWords();
    setDisplayWordList((prevArray: any) => [
      ...prevArray,
      ...convertWordsToDisplayWordsList(newGeneratedWords),
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
        {lastTwoTypedWordsList.map((wordObj: WordType, wIndex: number) => (
          <Word
            word={wordObj.wordLetters}
            wIndex={wIndex}
            isTyping={false}
            key={wIndex}
          />
        ))}
      </div>
      <div className="typingAreaBlock__column flex gap-[0.1rem] flex-col text-[1.5rem] min-w-[4rem] min-h-[18rem]">
        {typingAreaWords().map((wordObj: WordType, wIndex: number) => (
          <Word
            word={wordObj.wordLetters}
            wIndex={wIndex}
            isTyping={true}
            key={wIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingAreaBlock;
