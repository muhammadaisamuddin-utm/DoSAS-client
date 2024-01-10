import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Countdown() {
  const targetDate: number = new Date("2024-02-02").getTime()

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1_000);

    return () => clearInterval(timer);
  });

  return (
    <div className="flex flex-wrap w-full my-4 justify-end">
      <span className="mr-2">Deferment period will end in: </span>

      <div className="countdown-container flex space-x-3 mx-2">
        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">{timeLeft.days}</span>
          <span className="text-sm">days</span>
        </div>

        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">{timeLeft.hours}</span>
          <span className="text-sm">hours</span>
        </div>

        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">{timeLeft.minutes}</span>
          <span className="text-sm">minutes</span>
        </div>

        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">{timeLeft.seconds}</span>
          <span className="text-sm">seconds</span>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
