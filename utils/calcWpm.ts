const calcWpm = (
  totalLettersTyped: number,
  timeInSeconds: number,
  errors: number,
) => {
  const wordLength = 5;
  const secondsInMinute = 60;

  const totalWordsTyped = totalLettersTyped / wordLength;

  const rawWpm = totalWordsTyped / (timeInSeconds / secondsInMinute);

  const errorRate = errors / totalWordsTyped;

  const netWpm = rawWpm - rawWpm * errorRate;

  return netWpm;
};

export default calcWpm;
