"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WpmDataType } from "@/_types/WpmDataType";
import TypingSpeedLineChart from "@/components/TypingSpeedLineChart/TypingSpeedLineChart";

interface WpmDataInfoType {
  testDateTime: string;
  words: WpmDataType[];
}
[];
const HistoryPage = () => {
  const [wpmDatas, setWpmDatas] = useState<WpmDataInfoType[]>([]);
  const [wpmDatasError, setWpmDatasError] = useState(false);

  const handleDeleteAllButton = () => {
    if (window.confirm("Are you sure you want to delete all history?")) {
      setWpmDatas([]);
      localStorage.setItem("wpmDatas", JSON.stringify([]));
      toast("All history deleted");
    } else {
      toast("Canceled delete all history");
    }
  };

  const handleDeleteButton = (index: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete the history for Test ${wpmDatas.length - index}?`,
      )
    ) {
      const newWpmDatas = wpmDatas.filter((_, i) => i !== index);
      setWpmDatas(newWpmDatas);
      localStorage.setItem("wpmDatas", JSON.stringify(newWpmDatas));
      toast("History deleted");
    } else {
      toast("Canceled");
    }
  };

  useEffect(() => {
    const localWpmDatas = localStorage.getItem("wpmDatas");

    try {
      const parsedLocalDatas: WpmDataInfoType[] = JSON.parse(
        localWpmDatas || "[]",
      );
      setWpmDatas(parsedLocalDatas);
    } catch (error) {
      console.log(error);
      setWpmDatasError(true);
    }
  }, []);

  return (
    <section className="flex max-h-dvh w-full justify-center pt-4">
      <div className="m-4 flex flex-col items-center gap-4">
        <div className="mb-4 flex w-[50rem] justify-between">
          <h1 className="text-3xl">Typing History</h1>
          <Button
            variant={"destructive"}
            onClick={handleDeleteAllButton}
            disabled={
              wpmDatasError ? false : wpmDatas.length === 0 ? true : false
            }
          >
            Delete All
          </Button>
        </div>

        <div className="flex h-full snap-y snap-mandatory flex-col items-center gap-4 overflow-y-auto">
          {wpmDatas.length === 0
            ? "No history"
            : wpmDatasError
              ? "WPM data corrupted"
              : [...wpmDatas].reverse().map((wpmData, index) => (
                  <Card
                    key={index}
                    className="mx-8 flex h-[calc(50%-1rem)] w-[50rem] snap-start flex-col scroll-smooth rounded-none"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl">
                          Test {wpmDatas.length - index}
                        </h2>

                        <span className="text-sm text-muted-foreground">
                          {wpmData.testDateTime}
                        </span>

                        <div className="flex items-center gap-2">
                          <Badge className="rounded-sm" variant={"secondary"}>
                            Words: {wpmData.words.length}
                          </Badge>

                          <Badge className="rounded-sm" variant={"secondary"}>
                            wpm: {wpmData.words[wpmData.words.length - 1].wpm}
                          </Badge>

                          <Button
                            variant={"destructive"}
                            onClick={() => {
                              handleDeleteButton(wpmDatas.length - index - 1);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="h-dvh">
                      <div className="flex h-full w-full items-center justify-center">
                        <TypingSpeedLineChart wpmData={wpmData.words} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryPage;
