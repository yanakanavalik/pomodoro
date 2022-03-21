import { EngineTimer } from "./engine_timer";
import { OnTimerEnd, TimerTypes } from "../../../common/common_types";
import React from "react";

type TimerProps = {
  onTimerEnd: OnTimerEnd;
  timerType: TimerTypes;
};

export const Timer = ({ onTimerEnd, timerType }: TimerProps) => {
  return <EngineTimer onTimerEnd={onTimerEnd} currentInterval={timerType} />;
};
