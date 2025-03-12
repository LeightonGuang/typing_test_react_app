import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TypingAreaBlock from "../components/TypingAreaBlock/TypingAreaBlock";
import { generateWords } from "@/utils/generateWords";
import { testWordList } from "@/_assets/testWordList";

describe("GenerateWords function", () => {
  it("Generates 0 words", () => {
    const generatedWords = generateWords(0);
    expect(generatedWords.length).toBe(0);
    expect(generatedWords).toEqual([]);
  });

  it("Generates 25 words", () => {
    const generatedWords = generateWords(25);
    expect(generatedWords.length).toBe(25);
  });

  it("Generates 50 words", () => {
    const generatedWords = generateWords(50);
    expect(generatedWords.length).toBe(50);
  });

  it("Generates 100 words", () => {
    const generatedWords = generateWords(100);
    expect(generatedWords.length).toBe(100);
  });

  it("Generates words from testWordList", () => {
    const generatedWords = generateWords(10);
    const areAllWordsInWordList = generatedWords.every((word) =>
      testWordList.includes(word),
    );
    expect(areAllWordsInWordList).toBe(true);
  });

  it("Generates words as strings", () => {
    const generatedWords = generateWords(10);
    expect(generatedWords.every((word) => typeof word === "string")).toBe(true);
  });
});
