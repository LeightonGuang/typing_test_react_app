"use client";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { TypingAreaHeader } from "./TypingAreaHeader";
import { TypingAreaContent } from "./TypingAreaContent";
import { Card, CardContent, CardFooter } from "../ui/card";

import { toast } from "sonner";
import calcWpm from "@/utils/calcWpm";
import { useRouter } from "next/navigation";
import { WpmDataType } from "@/_types/WpmDataType";
import { testWordList } from "@/_assets/testWordList";
import { TypedWordsType } from "@/_types/TypedWordsType";
import TypingSpeedLineChart from "../TypingSpeedLineChart/TypingSpeedLineChart";

const TypingAreaBlock = () => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(true);
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [isShowChart, setIsShowChart] = useState(false);
  const [wpmData, setWpmData] = useState<WpmDataType[]>([]);
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [targetNumWords, setTargetNumWords] = useState(25);
  const [numErrors, setNumErrors] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [typedWords, setTypedWords] = useState<TypedWordsType>([]);
  const [typedLetterCount, setTypedLetterCount] = useState(0);

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
    setInputValue("");
    setTypedWords([]);
    setTimer(0);
    setWpm(0);
    setWpmData([]);
    setStartTimer(false);
    setTypedLetterCount(0);
    setNumErrors(0);
  };

  // generate initial words
  useEffect(() => {
    const randomWordsList = generateWords(targetNumWords);
    setGeneratedWords(randomWordsList);
    setIsShowChart(localStorage.getItem("isShowChart") === "true");
  }, []);

  // start timer
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
  }, [targetNumWords]);

  // set typed words
  useEffect(() => {
    setTypedWords(generatedWords.map((word) => ({ word: word, typed: "" })));
  }, [generatedWords]);

  // handle typed word change
  useEffect(() => {
    // get typed letter count
    const dateTime = new Date(Date.now()).toLocaleString();

    const count = typedWords.reduce(
      (total, word) => total + word.typed.length,
      0,
    );
    setTypedLetterCount(count);

    const isLastWordCorrect =
      targetNumWords === activeWordIndex + 1 &&
      typedWords[activeWordIndex]?.word === typedWords[activeWordIndex]?.typed;

    if (isLastWordCorrect) {
      // detect if last word is right
      setStartTimer(false);
      setTypedWords((prevTypedWords) => {
        const newTypedWords = [...prevTypedWords];
        newTypedWords[activeWordIndex].typed = inputValue;
        return newTypedWords;
      });
      setWpm(calcWpm(typedLetterCount, timer / 100, numErrors));
      setActiveWordIndex((prevActiveWordIndex) => prevActiveWordIndex + 1);
      setNumErrors(() => {
        return typedWords.reduce((total, word) => {
          if (word.typed !== word.word && word.typed !== "") {
            return ++total;
          } else {
            return total;
          }
        }, 0);
      });
      // add last word to wpm data when last word is right automatically
      const updatedWpmData = [...wpmData];
      updatedWpmData.push({
        typedWord: typedWords[activeWordIndex].word,
        wpm: Number(
          calcWpm(typedLetterCount, timer / 100, numErrors).toFixed(2),
        ),
        isCorrect: true,
      });

      setWpmData(updatedWpmData);

      const localWpmDatas = localStorage.getItem("wpmDatas");
      if (localWpmDatas) {
        const parsedWpmDatas: WpmDataType[] = JSON.parse(localWpmDatas);

        if (parsedWpmDatas.length < 10) {
          // add wpm data to local storage
          localStorage.setItem(
            "wpmDatas",
            JSON.stringify([
              ...parsedWpmDatas,
              {
                testDateTime: dateTime,
                words: updatedWpmData,
              },
            ]),
          );
        } else if (parsedWpmDatas.length >= 10) {
          // only store 10 wpm datas
          localStorage.setItem(
            "wpmDatas",
            JSON.stringify([
              ...parsedWpmDatas.slice(1),
              {
                testDateTime: dateTime,
                words: updatedWpmData,
              },
            ]),
          );
        }
      } else if (!localWpmDatas) {
        localStorage.setItem(
          "wpmDatas",
          JSON.stringify([{ testDateTime: dateTime, words: updatedWpmData }]),
        );
      }

      toast("Finished", {
        description: (
          <span className="text-foreground">
            {`Your typing speed for ${targetNumWords} words is ` +
              calcWpm(typedLetterCount, timer / 100, numErrors).toFixed(2) +
              " WPM"}
          </span>
        ),
        action: {
          label: "History",
          onClick: () => {
            router.push("/history");
          },
        },
      });
    }
  }, [typedWords]);

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
            setTargetNumWords={setTargetNumWords}
          />

          <Separator />

          <TypingAreaContent
            isFocused={isFocused}
            activeCharIndex={activeCharIndex}
            activeWordIndex={activeWordIndex}
            generatedWords={generatedWords}
            inputValue={inputValue}
            startTimer={startTimer}
            numErrors={numErrors}
            setNumErrors={setNumErrors}
            setInputValue={setInputValue}
            setIsFocused={setIsFocused}
            setTypedWords={setTypedWords}
            setActiveCharIndex={setActiveCharIndex}
            setActiveWordIndex={setActiveWordIndex}
            setWpm={setWpm}
            setWpmData={setWpmData}
            setStartTimer={setStartTimer}
            timer={timer}
            typedLetterCount={typedLetterCount}
            typedWords={typedWords}
            wpmData={wpmData}
            targetNumWords={targetNumWords}
          />

          <Separator />

          <CardFooter className="p-4">
            <div className="flex w-full justify-center">
              <div className="flex gap-2">
                <Button
                  className="w-min rounded-sm"
                  onClick={() => {
                    resetTypingArea();
                    setGeneratedWords(generateWords(targetNumWords));
                  }}
                >
                  Restart
                </Button>

                <Button
                  className="w-min rounded-sm"
                  variant={"secondary"}
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
