"use client";

import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
} from "recharts";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { TypingAreaHeader } from "./TypingAreaHeader";
import { TypingAreaContent } from "./TypingAreaContent";
import { Card, CardContent, CardFooter } from "../ui/card";

import { testWordList } from "@/_assets/testWordList";
import { TypingAreaType } from "@/_types/TypingAreaType";
import { TypedWordsType } from "@/_types/TypedWordsType";

const TypingAreaBlock: TypingAreaType = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isShowChart, setIsShowChart] = useState(false);
  const [wpmData, setWpmData] = useState<{ wpm: number }[]>([]);
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [numWords, setNumWords] = useState(25);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [typedActiveWord, setTypedActiveWord] = useState<string>("");
  const [typedWords, setTypedWords] = useState<TypedWordsType>([]);

  const calcWpm = (totalLettersTyped: number, time: number, errors: number) => {
    const rawWpm = totalLettersTyped / 5 / (time / 60);

    const netWpm = rawWpm - errors / (time / 60);

    return netWpm;
  };

  const generateWords = (numWords: number) => {
    const randomWordsList: string[] = Array.from({ length: numWords }).map(
      () => {
        return testWordList[Math.floor(Math.random() * testWordList.length)];
      },
    );

    return randomWordsList;
  };

  const resetTypingArea = () => {
    setActiveCharIndex(0);
    setActiveWordIndex(0);
    setTypedActiveWord("");
    setTypedWords([]);
    setTimer(0);
    setWpm(0);
  };

  // generate initial words
  useEffect(() => {
    const randomWordsList = generateWords(numWords);
    setGeneratedWords(randomWordsList);
  }, []);

  useEffect(() => {
    resetTypingArea();
  }, [numWords]);

  useEffect(() => {
    setTypedWords(generatedWords.map((word) => ({ word: word, typed: "" })));
  }, [generatedWords]);

  // handle typing
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
          setTypedWords((prevTypedWords) => {
            const newTypedWords = [...prevTypedWords];
            newTypedWords[activeWordIndex] = {
              ...newTypedWords[activeWordIndex],
              typed: "",
            };
            return newTypedWords;
          });
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

    if (isFocused) {
      document.addEventListener("keydown", handleKeyDown);
    } else if (!isFocused) {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeCharIndex, activeWordIndex, typedActiveWord, isFocused]);

  return (
    <section>
      <Card className="w-[50rem] rounded-none">
        <TypingAreaHeader
          timer={timer}
          wpm={wpm}
          setNumWords={setNumWords}
          resetTypingArea={resetTypingArea}
          generateWords={generateWords}
          setGeneratedWords={setGeneratedWords}
        />

        <Separator />

        <TypingAreaContent
          typedWords={typedWords}
          activeCharIndex={activeCharIndex}
          activeWordIndex={activeWordIndex}
          generatedWords={generatedWords}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />

        <Separator />

        <CardFooter className="p-4">
          <div className="flex w-full justify-center">
            <div className="flex gap-4">
              <Button
                className="w-min rounded-sm"
                onClick={() => {
                  resetTypingArea();
                  setGeneratedWords(generateWords(numWords));
                }}
              >
                Restart
              </Button>

              <Button
                className="w-min rounded-sm"
                onClick={() => setIsShowChart(!isShowChart)}
              >
                {isShowChart ? "Hide Chart" : "Show Chart"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {isShowChart && (
        <div>
          <Card className="mt-4 w-min">
            <CardContent className="p-0">
              <LineChart
                className="m-4"
                width={750}
                height={200}
                data={[{ wpm: 100 }, { wpm: 200 }, { wpm: 300 }]}
                margin={{ top: 16, right: 32, left: 32, bottom: 16 }}
              >
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis axisLine={{ stroke: "#ffffff" }} strokeWidth={2} />
                <YAxis
                  axisLine={{ stroke: "#ffffff" }}
                  dataKey={"wpm"}
                  strokeWidth={2}
                />
                <Tooltip />
                <Legend />
                <Line
                  type={"monotone"}
                  dataKey={"wpm"}
                  isAnimationActive={false}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              </LineChart>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default TypingAreaBlock;
