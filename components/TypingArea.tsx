"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Word from "./Word";
import { Special_Elite } from "next/font/google";
import Char from "./Char";
import { group } from "console";

type TypingAreaType = () => JSX.Element;

const TypingArea: TypingAreaType = () => {
  type LetterType = {
    char: string;
    isCorrect: boolean;
  };

  const wordList: string[] = [
    "the",
    "at",
    "there",
    "some",
    "my",
    "of",
    "be",
    "use",
    "her",
    "than",
    "and",
    "this",
    "an",
    "would",
    "first",
    "a",
    "have",
    "each",
    "make",
    "water",
    "to",
    "from",
    "which",
    "like",
    "been",
    "in",
    "or",
    "she",
    "him",
    "call",
    "is",
    "one",
    "do",
    "into",
    "who",
    "you",
    "had",
    "how",
    "time",
    "oil",
    "that",
    "by",
    "their",
    "has",
    "its",
    "it",
    "word",
    "if",
    "look",
    "now",
    "he",
    "but",
    "will",
    "two",
    "find",
    "was",
    "not",
    "up",
    "more",
    "long",
    "for",
    "what",
    "other",
    "write",
    "down",
    "on",
    "all",
    "about",
    "go",
    "day",
    "are",
    "were",
    "out",
    "see",
    "did",
    "as",
    "we",
    "many",
    "number",
    "get",
    "with",
    "when",
    "then",
    "no",
    "come",
    "his",
    "your",
    "them",
    "way",
    "made",
    "they",
    "can",
    "these",
    "could",
    "may",
    "I",
    "said",
    "so",
    "people",
    "part",
  ];

  const [key, setKey]: [string, any] = useState<string>("");
  const typingAreaRef: any = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [wordIndex, setwordIndex] = useState<number>(0);

  const [generatedWordList, setGeneratedWordList] = useState<string[]>([]);
  const [displayWordList, setDisplayWordList] = useState<LetterType[][]>([]);

  /**
   * / displayWordList: string[] = [
   * [`<span className={text-correct}>c</span>`, `<span className={text-correct}>a</span>`, `<span className={text-correct}>n</span>`],
   * [`<span className={text-correct}>a</span>``<span className={text-correct}>t</span>`]
   * ]
   */

  type GenerateWordsType = () => string[];

  const generateWords: GenerateWordsType = (numWords: number = 10) => {
    const newWordList: string[] = [];
    for (let i: number = 0; i < numWords; i++) {
      const newWord: string =
        wordList[Math.floor(Math.random() * wordList.length)];
      newWordList.push(newWord);
    }
    return newWordList;
  };

  type ConvertWordsToDisplayWordsType = (words: string[]) => Object[][];

  // convert a list of words to a list of display words with <span> around every letter
  const convertWordsToDisplayWords: ConvertWordsToDisplayWordsType = (
    words: string[]
  ) => {
    console.log(words);
    const groupedList: Object[][] = words.map((word: string) => {
      const splitedWord: string[] = word.split("");
      const wrapedWord: Object[] = splitedWord.map((char: string) => ({
        char: char,
        isCorrect: null,
      }));
      return wrapedWord;
    });
    console.log(groupedList);
    return groupedList;
  };

  const checkDivFocus: any = () => {
    if (typingAreaRef.current === document.activeElement) {
      setIsFocused(true);
    } else if (typingAreaRef.current !== document.activeElement) {
      setIsFocused(false);
    }
  };

  type HandleKeyPressType = (event: any) => void;

  const handleKeyPress: HandleKeyPressType = (event) => {
    setKey(event.key);

    switch (event.key) {
      case "Backspace": {
        setDisplayWordList([...displayWordList.slice(0, -1)]);
        setwordIndex(wordIndex - 1);
        break;
      }

      default: {
        if (
          event.key === "Enter" ||
          event.key === "Control" ||
          event.key === "Shift" ||
          event.key === "Alt"
        )
          break;

        // if (true) {
        //   setDisplayWordList([
        //     ...displayWordList,
        //     <span className="text-correct">{event.key}</span>,
        //   ]);
        //   setwordIndex(wordIndex + 1);
        //   console.log(displayWordList);
        // } else if (false) {
        //   setDisplayWordList([
        //     ...displayWordList,
        //     <span className="text-wrong">{event.key}</span>,
        //   ]);
        //   setwordIndex(wordIndex + 1);
        //   console.log(displayWordList);
        // }

        break;
      }
    }
  };

  useEffect(() => {
    // focus on typing area when loaded
    typingAreaRef.current.focus();
    setDisplayWordList((prevArray: any) => [
      ...prevArray,
      ...convertWordsToDisplayWords(generateWords()),
    ]);
    console.log(generatedWordList);
  }, []);

  return (
    <div className="typingArea max-w-50rem">
      <div>{key}</div>
      <div
        onKeyDown={handleKeyPress}
        ref={typingAreaRef}
        tabIndex={0}
        onFocus={checkDivFocus}
        onBlur={checkDivFocus}
        className={`inline-flex gap-2 bg-slate-600 p-3 rounded-md text-[1.2rem]  ${
          isFocused ? "" : "filter blur-sm"
        }`}
      >
        {displayWordList.map((word: LetterType[], wordIndex: number) => (
          <div key={wordIndex} className="word">
            {word.map((charObj: LetterType, charIndex) => (
              <span key={charIndex} className="word__letter">
                {charObj.char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* <div>{displayWordList}</div> */}
    </div>
  );
};

export default TypingArea;
