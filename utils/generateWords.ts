import { testWordList } from "@/_assets/testWordList";

export const generateWords = (numWords: number) => {
  const randomWordsList: string[] = Array.from({ length: numWords }).map(() => {
    return testWordList[Math.floor(Math.random() * testWordList.length)];
  });

  return randomWordsList;
};
