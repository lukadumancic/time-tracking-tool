import { useEffect, useState } from "react";

const useTimer = (
  isRunning: boolean,
  startTime: number | null,
  initialTimeLogged: number
) => {
  const [timeLogged, setTimeLogged] = useState(initialTimeLogged);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        setTimeLogged(initialTimeLogged + (Date.now() - startTime));
      }, 1000);
    } else {
      setTimeLogged(initialTimeLogged);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime, initialTimeLogged]);

  return timeLogged;
};

export default useTimer;
