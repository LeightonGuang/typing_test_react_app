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

const HistoryPage = () => {
  const [wpmDatas, setWpmDatas] = useState<WpmDataType[][]>([]);

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
      const newWpmDatas = [...wpmDatas];
      newWpmDatas.splice(index, 1);
      setWpmDatas(newWpmDatas);
      localStorage.setItem("wpmDatas", JSON.stringify(newWpmDatas));
      toast("History deleted");
    } else {
      toast("Canceled");
    }
  };

  useEffect(() => {
    const localWpmDatas = localStorage.getItem("wpmDatas");
    const parsedLocalDatas: WpmDataType[][] = JSON.parse(localWpmDatas || "[]");
    setWpmDatas(parsedLocalDatas);
  }, []);

  return (
    <section className="flex h-dvh w-dvw justify-center pt-4">
      <div className="m-4 flex min-w-[50rem] flex-col gap-4">
        <div className="mb-4 flex justify-between">
          <h1 className="text-3xl">Typing History</h1>
          <Button
            variant={"destructive"}
            onClick={handleDeleteAllButton}
            disabled={wpmDatas.length === 0}
          >
            Delete All
          </Button>
        </div>

        {wpmDatas.length === 0
          ? "No history"
          : [...wpmDatas].reverse().map((wpmData, index) => (
              <Card key={index} className="min-w-[50rem] rounded-none">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl">Test {wpmDatas.length - index}</h2>

                    <div className="flex items-center gap-2">
                      <Badge className="rounded-sm" variant={"secondary"}>
                        Words: {wpmData.length}
                      </Badge>

                      <Badge className="rounded-sm" variant={"secondary"}>
                        wpm: {wpmData[wpmData.length - 1].wpm}
                      </Badge>

                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          handleDeleteButton(index);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <TypingSpeedLineChart wpmData={wpmData} />
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  );
};

export default HistoryPage;
