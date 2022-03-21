import React, { useState } from "react";
import styles from "./timer_tasks_block.scss";
import { TimerTypes } from "../../../common/common_types";
import { Timer } from "../timer";
import { TasksList } from "../tasks_list";
import { Sounds, SoundsPlayer } from "../../../common/utils/soundsPlayer";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { Themes, themeState } from "../../../state/atoms/theme_state";

export const TimerTasksBlock = () => {
  const [timerType, toggleTimer] = useState(TimerTypes.stop);

  const handleToggleTimerButtonClick = () => {
    if (timerType === TimerTypes.stop) {
      toggleTimer(TimerTypes.active);
    } else {
      toggleTimer(TimerTypes.stop);
      SoundsPlayer.playSound(Sounds.end);
    }
  };

  const onTimerEndHandler = (intervalType: TimerTypes) => {
    if (intervalType === TimerTypes.active) {
      toggleTimer(TimerTypes.break);
    } else {
      toggleTimer(TimerTypes.active);
    }
  };

  const [theme] = useRecoilState(themeState);

  const cn = {
    timerTasksBlock: styles.timerTasksBlock,
    timerTasksBlockTimer: styles.timerTasksBlock__timer,
    timerTasksBlockTimerButton: classNames({
      [styles.timerTasksBlock__timerButton]: true,
      [styles["timerTasksBlock__timerButton--theme-dark"]]:
        theme === Themes.dark,
      [styles["timerTasksBlock__timerButton--theme-light"]]:
        theme === Themes.light,
    }),
  };

  return (
    <div className={cn.timerTasksBlock}>
      <div className={cn.timerTasksBlockTimer}>
        <Timer onTimerEnd={onTimerEndHandler} timerType={timerType} />
        <button
          className={cn.timerTasksBlockTimerButton}
          onClick={handleToggleTimerButtonClick}
        >
          {timerType === TimerTypes.stop ? "Start cycle" : "Stop cycle"}
        </button>
      </div>
      <TasksList currentPhase={timerType} />
    </div>
  );
};
