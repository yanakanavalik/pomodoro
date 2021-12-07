import React, { useState } from "react";
import styles from "./timer_tasks_block.scss";
import { TimerTypes } from "../../../common/common_types";
import { Timer } from "../timer";
import { TasksList } from "../tasks-list";
import { Sounds, SoundsPlayer } from "../../../common/utils/soundsPlayer";

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

  return (
    <div className={styles.timerTasksBlock}>
      <div className={styles.timerTasksBlock__timer}>
        <Timer onTimerEnd={onTimerEndHandler} timerType={timerType} />
        <button
          className={styles.timerTasksBlock__timerButton}
          onClick={handleToggleTimerButtonClick}
        >
          {timerType === TimerTypes.stop ? "Start timer" : "Stop timer"}
        </button>
      </div>
      <TasksList currentPhase={timerType} />
    </div>
  );
};
