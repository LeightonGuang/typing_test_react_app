"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { TypingAreaHeader } from "./TypingAreaHeader";
import { TypingAreaContent } from "./TypingAreaContent";
import { Card, CardContent, CardFooter } from "../ui/card";

import { testWordList } from "@/_assets/testWordList";
import { TypingAreaType } from "@/_types/TypingAreaType";
import { TypedWordsType } from "@/_types/TypedWordsType";
import TypingSpeedLineChart from "../TypingSpeedLineChart/TypingSpeedLineChart";

const TypingAreaBlock: TypingAreaType = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [isShowChart, setIsShowChart] = useState(false);
  const [wpmData, setWpmData] = useState<
    { word: string; wpm: number; isCorrect: boolean }[]
  >([]);
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [numWords, setNumWords] = useState(25);
  const [numErrors, setNumErrors] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [typedActiveWord, setTypedActiveWord] = useState<string>("");
  const [typedWords, setTypedWords] = useState<TypedWordsType>([]);
  const [typedLetterCount, setTypedLetterCount] = useState(0);

  const calcWpm = (
    totalLettersTyped: number,
    timeInSeconds: number,
    errors: number,
  ) => {
    const rawWpm = totalLettersTyped / 5 / (timeInSeconds / 60);

    const netWpm = rawWpm - errors / (timeInSeconds / 60);

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
    setWpmData([]);
    setStartTimer(false);
    setTypedLetterCount(0);
  };

  // generate initial words
  useEffect(() => {
    const randomWordsList = generateWords(numWords);
    setGeneratedWords(randomWordsList);
    setIsShowChart(localStorage.getItem("isShowChart") === "true");
  }, []);

  useEffect(() => {
    if (startTimer) {
      const time = setTimeout(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 10);

      return () => clearTimeout(time);
    }
  }, [startTimer, timer]);

  // reset typing area
  useEffect(() => {
    resetTypingArea();
  }, [numWords]);

  // set typed words
  useEffect(() => {
    setTypedWords(generatedWords.map((word) => ({ word: word, typed: "" })));
  }, [generatedWords]);

  // get typed letter count
  useEffect(() => {
    const count = typedWords.reduce(
      (total, word) => total + word.typed.length,
      0,
    );
    setTypedLetterCount(count);

    // stop timer if last word is right
    if (
      activeWordIndex === numWords - 1 &&
      typedWords[activeWordIndex]?.word === typedWords[activeWordIndex]?.typed
    ) {
      setStartTimer(false);

      const wpmDatas = localStorage.getItem("wpmDatas");
      if (wpmDatas) {
        const parsedWpmDatas: {
          word: string;
          wpm: number;
          isCorrect: boolean;
        }[][] = JSON.parse(wpmDatas);

        if (parsedWpmDatas.length < 10) {
          // add wpm data to local storage
          localStorage.setItem(
            "wpmDatas",
            JSON.stringify([...parsedWpmDatas, wpmData]),
          );
        } else if (parsedWpmDatas.length >= 10) {
          // only store 10 wpm datas
          localStorage.setItem(
            "wpmDatas",
            JSON.stringify([...parsedWpmDatas.slice(1), wpmData]),
          );
        }
      } else if (!wpmDatas) {
        localStorage.setItem("wpmDatas", JSON.stringify([wpmData]));
      }
    }
  }, [typedWords]);

  // handle typing
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letterRegex = /^[a-zA-Z]$/;

      if (event.key === " ") {
        // Handle spacebar
        setActiveCharIndex(0);
        setActiveWordIndex((prevActiveWordIndex) => prevActiveWordIndex + 1);
        setWpmData((prevWpmData) => [
          ...prevWpmData,
          {
            word: typedActiveWord,
            wpm: Number(calcWpm(typedLetterCount, timer / 100, 0).toFixed(2)),
            isCorrect: typedActiveWord === typedWords[activeWordIndex].word,
          },
        ]);
        setWpm(calcWpm(typedLetterCount, timer / 100, 0));
        setTypedActiveWord("");
        setNumErrors(() => {
          return typedWords.reduce((total, word) => {
            if (word.typed !== word.word && word.typed !== "") {
              return ++total;
            } else {
              return total;
            }
          }, 0);
        });
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
      } else if (event.key.match(letterRegex)) {
        // Handle regular characters
        if (!startTimer) setStartTimer(true);
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
      <div className="flex flex-col items-center gap-4">
        <Card className="w-[50rem] rounded-none">
          <TypingAreaHeader
            timer={timer}
            wpm={wpm}
            resetTypingArea={resetTypingArea}
            generateWords={generateWords}
            setGeneratedWords={setGeneratedWords}
            activeWordIndex={activeWordIndex}
            numErrors={numErrors}
            setNumWords={setNumWords}
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
                  onClick={() => {
                    setIsShowChart(!isShowChart);
                    localStorage.setItem("isShowChart", String(!isShowChart));
                  }}
                >
                  {isShowChart ? "Hide Chart" : "Show Chart"}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        {isShowChart && (
          <div>
            <Card className="w-min rounded-none">
              <CardContent className="p-0">
                <TypingSpeedLineChart wpmData={wpmData} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default TypingAreaBlock;
