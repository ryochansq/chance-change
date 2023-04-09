import { useEffect, useState } from "react";

export const useCountDown = (seconds: number) => {
  const [countTime, setCountTime] = useState<number>(seconds);

  useEffect(() => {
    const countDownInterval = setTimeout(() => {
      if (countTime === -1) clearTimeout(countDownInterval);
      if (countTime >= 0) setCountTime(countTime - 1);
    }, 1000);
    return () => clearTimeout(countDownInterval);
  }, [countTime]);

  return { countTime };
};
