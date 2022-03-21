import { OnTimerEnd, TimerTypes } from "../../../common/common_types";
import React, { useEffect, useState } from "react";
import { Sounds, SoundsPlayer } from "../../../common/utils/soundsPlayer";
import styles from "./engine_timer.scss";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { Themes, themeState } from "../../../state/atoms/theme_state";

type EngineTimerProps = {
  currentInterval: number;
  onTimerEnd: OnTimerEnd;
};

export const EngineTimer = ({
  onTimerEnd,
  currentInterval,
}: EngineTimerProps) => {
  const [minutes, setMinutes] = useState(currentInterval);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (currentInterval === TimerTypes.stop) {
      setMinutes(25);
      setSeconds(0);
      return;
    }

    setMinutes(currentInterval);
    setSeconds(0);

    if (currentInterval === TimerTypes.active) {
      SoundsPlayer.playSound(Sounds.start);
    } else if (currentInterval === TimerTypes.break) {
      SoundsPlayer.playSound(Sounds.end);
    }
  }, [currentInterval]);

  useEffect(() => {
    if (currentInterval === TimerTypes.stop) return;

    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          onTimerEnd(currentInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const secToDisplay = seconds < 10 ? "0" + seconds : seconds + "";
  const minsToDisplay = minutes < 10 ? "0" + minutes : minutes + "";

  const [theme] = useRecoilState(themeState);

  const cn = {
    time: styles.time,
    timeBlockSeparator: styles.timeBlock__separator,
    timeBlockSeparatorDot: classNames({
      [styles.timeBlock__separatorDot]: true,
      [styles["timeBlock__separatorDot--theme-dark"]]: theme === Themes.dark,
      [styles["timeBlock__separatorDot--theme-light"]]: theme === Themes.light,
    }),
  };

  return (
    <div className={cn.time}>
      <TimeBlock number={minsToDisplay[0]} />
      <TimeBlock number={minsToDisplay[1]} />
      <span className={cn.timeBlockSeparator}>
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={cn.timeBlockSeparatorDot}
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={cn.timeBlockSeparatorDot}
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      </span>
      <TimeBlock number={secToDisplay[0]} />
      <TimeBlock number={secToDisplay[1]} />
    </div>
  );
};

type TimeBlockProps = {
  number: string;
};

const TimeBlock = ({ number }: TimeBlockProps) => {
  const [theme] = useRecoilState(themeState);

  const cn = {
    timeBlock: classNames({
      [styles.timeBlock]: true,
      [styles["timeBlock--theme-light"]]: theme === Themes.light,
      [styles["timeBlock--theme-dark"]]: theme === Themes.dark,
    }),
  };

  return <button className={cn.timeBlock}>{number}</button>;
};
