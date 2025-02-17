"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import TypingSpeedLineChart from "@/components/TypingSpeedLineChart/TypingSpeedLineChart";
import { Button } from "@/components/ui/button";

const HistoryPage = () => {
  const [wpmDatas, setWpmDatas] = useState<
    {
      word: string;
      wpm: number;
      isCorrect: boolean;
    }[][]
  >([]);

  useEffect(() => {
    const localDatas = localStorage.getItem("wpmDatas");

    const parsedLocalDatas: {
      word: string;
      wpm: number;
      isCorrect: boolean;
    }[][] = JSON.parse(localDatas || "[]");

    setWpmDatas(parsedLocalDatas);
    console.log(parsedLocalDatas);
  }, []);

  return (
    <section className="flex h-dvh w-dvw justify-center pt-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">History</h1>
        {wpmDatas.map((wpmData, index) => (
          <Card key={index} className="m-4 min-w-[50rem] rounded-none">
            <CardHeader>
              <div className="flex justify-between">
                <h2 className="text-2xl">Test {index + 1}</h2>

                <div className="flex gap-2">
                  <Badge className="rounded-sm" variant={"secondary"}>
                    Words: {wpmData.length}
                  </Badge>

                  <Badge className="rounded-sm" variant={"secondary"}>
                    wpm: {wpmData[wpmData.length - 1].wpm}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <TypingSpeedLineChart wpmData={wpmData} />
            </CardContent>
          </Card>
        ))}

        <div>
          <Button variant={"destructive"}>Delete All</Button>
        </div>
      </div>
    </section>
  );
};

export default HistoryPage;
