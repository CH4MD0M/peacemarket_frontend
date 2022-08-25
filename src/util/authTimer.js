import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AuthTimer = () => {
  const { timerState, expirationTime } = useSelector((state) => state.email);
  const [time, setTime] = useState(180);

  useEffect(() => {
    let Counter;
    if (timerState && time > 0) {
      Counter = setInterval(() => {
        const duration = Math.floor((new Date(expirationTime).getTime() - new Date().getTime()) / 1000);
        setTime(duration);
      }, 1000);
    } else if (!timerState) {
      clearInterval(Counter);
    }
    return () => {
      clearInterval(Counter);
    };
  }, [expirationTime, timerState, time]);

  const timeFormat = (time) => {
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };

  return <>{timeFormat(time)}</>;
};

export default AuthTimer;
