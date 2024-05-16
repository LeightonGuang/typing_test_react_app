import React from "react";

const Word = ({ word }: { word: string }) => {
  const splitedWord = word.split("");
  return (
    <div className="word">
      {splitedWord.map((char, index) => (
        <span key={index} className="word__char text-white">
          {char}
        </span>
      ))}
    </div>
  );
};

export default Word;
