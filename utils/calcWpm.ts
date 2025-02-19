const calcWpm = (
  totalLettersTyped: number,
  timeInSeconds: number,
  errors: number,
) => {
  const rawWpm = totalLettersTyped / 5 / (timeInSeconds / 60);

  const netWpm = rawWpm - errors / (timeInSeconds / 60);

  return netWpm;
};

export default calcWpm;
