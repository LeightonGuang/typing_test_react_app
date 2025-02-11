"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardFooter } from "../ui/card";

import { WordType } from "@/_types/WordType";
import { TypingAreaHeader } from "./TypingAreaHeader";
import { TypingAreaContent } from "./TypingAreaContent";
import { TypingAreaType } from "@/_types/TypingAreaType";
import { TypedWordsType } from "@/_types/TypedWordsType";
import { testWordList } from "@/_assets/testWordList";

const TypingAreaBlock: TypingAreaType = () => {
  const [timer, setTimer] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [wordList, setWordList] = useState<WordType[]>([]);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [typedActiveWord, setTypedActiveWord] = useState<string>("");
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [typedWords, setTypedWords] = useState<TypedWordsType>([]);

  // generate initial words
  useEffect(() => {
    const randomWordsList: string[] = Array.from({ length: 30 }).map(
      () => testWordList[Math.floor(Math.random() * testWordList.length)],
    );

    console.log("randomWordsList: ", randomWordsList);
    setGeneratedWords(randomWordsList);
    setTypedWords(randomWordsList.map((word) => ({ word: word, typed: "" })));
  }, []);

  // handle typing
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key);

      if (event.key === " ") {
        // Handle spacebar
        setActiveCharIndex(0);
        setActiveWordIndex((prevActiveWordIndex) => prevActiveWordIndex + 1);
        setTypedActiveWord("");
      } else if (event.key === "Backspace") {
        // Handle backspace
        if (activeWordIndex > 0 && activeCharIndex === 0) {
          // handle backspace where you are at the start of a word
          setTypedActiveWord(typedWords[activeWordIndex - 1].typed);
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
        } else if (event.ctrlKey) {
          setTypedActiveWord("");
          setActiveCharIndex(0);
        }

        if (activeCharIndex > 0) {
          // handle backspace where you are in the middle of a word
          setActiveCharIndex((prevActiveCharIndex) => prevActiveCharIndex - 1);
          setTypedActiveWord((prevTypedActiveWord) =>
            prevTypedActiveWord.slice(0, -1),
          );
          setTypedWords((prevTypedWords) => {
            const newTypedWords = [...prevTypedWords];
            newTypedWords[activeWordIndex] = {
              ...newTypedWords[activeWordIndex],
              typed: newTypedWords[activeWordIndex].typed.slice(0, -1),
            };
            return newTypedWords;
          });
        }
      } else {
        // Handle regular characters
        const letterRegex = /^[a-zA-Z]$/;
        if (event.key.match(letterRegex)) {
          setActiveCharIndex(typedActiveWord.length + 1);
          setTypedActiveWord(
            (prevTypedActiveWord) => prevTypedActiveWord + event.key,
          );
          setTypedWords((prevTypedWords) => {
            const newTypedWords = [...prevTypedWords];
            newTypedWords[activeWordIndex] = {
              ...newTypedWords[activeWordIndex],
              typed: newTypedWords[activeWordIndex].typed + event.key,
            };
            return newTypedWords;
          });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeCharIndex, activeWordIndex, typedActiveWord]);

  useEffect(() => {
    console.table([
      { name: "activeCharIndex", value: activeCharIndex },
      { name: "activeWordIndex", value: activeWordIndex },
      { name: "typedActiveWord", value: typedActiveWord },
    ]);
  }, [activeCharIndex, activeWordIndex, typedActiveWord]);

  useEffect(() => {
    console.log("typedWords: ", typedWords);
  }, [typedWords]);

  return (
    <section>
      <Card className="w-[50rem]">
        <TypingAreaHeader timer={timer} wpm={wpm} />

        <TypingAreaContent
          generatedWords={generatedWords}
          typedWords={typedWords}
          activeCharIndex={activeCharIndex}
          activeWordIndex={activeWordIndex}
        />

        <CardFooter>
          <div className="flex w-full justify-center">
            <Button className="w-min">Restart</Button>
            <span>{typedActiveWord}</span>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default TypingAreaBlock;
