import { Sounds, SoundsPlayer } from "../../../common/utils/soundsPlayer";
import { TasksList } from "../tasks_list";
import { Themes, themeState } from "../../../state/atoms/theme_state";
import { Timer } from "../timer";
import { TimerTypes } from "../../../common/common_types";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./timer_tasks_block.scss";

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
