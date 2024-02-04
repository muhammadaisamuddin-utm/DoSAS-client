import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Countdown() {
  const [targetDate, setTargetDate] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getFormattedDate = (targetDate: number) => {
    const date = new Date(targetDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    console.log("now");
    console.log(now);
    const diff = targetDate - now;

    if (diff <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  const getTargetDate = async () => {
    try {
      const response = await axiosInstance.get("/api/system-properties");
      const dateStr = new Date(response.data.data[1].value).getTime();
      setTargetDate(dateStr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTargetDate();
  }, []);

  useEffect(() => {
    if (targetDate) {
      console.log("targetDate");
      console.log(targetDate);
      console.log(timeLeft);
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1_000);

      return () => clearInterval(timer);
    }
  }, [targetDate]);

  return (
    <div className="flex flex-wrap w-full my-4 justify-end">
      <div className="flex flex-col items-center">
        <span className="mr-2">Deferment period will end in: </span>
        <span>{"(" + getFormattedDate(targetDate) + ")"}</span>
      </div>

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
