import React from "react";
import Char from "./Char";

const Word = ({ word }: { word: string }) => {
  const splitedWord = word.split("");
  return (
    <div className="word">
      {splitedWord.map((char, index) => (
        <Char key={index} char={char} isCorrect={true} />
      ))}
    </div>
  );
};

export default Word;
