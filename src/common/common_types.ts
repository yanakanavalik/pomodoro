export enum TimerTypes {
  active = 25,
  break = 5,
  stop = 0,
}

export type OnTimerEnd = (intervalType: TimerTypes) => void;
