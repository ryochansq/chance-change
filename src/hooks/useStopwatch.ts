import { useState } from "react";

performance.now();

export const useStopwatch = () => {
  const [start, setStart] = useState<number>(performance.now());
  const [time, setTime] = useState<number>(0);

  const stop = () => {
    const end = performance.now();
    setTime(end - start);
  };

  const reset = () => setStart(performance.now());

  return { time, stop, reset };
};
