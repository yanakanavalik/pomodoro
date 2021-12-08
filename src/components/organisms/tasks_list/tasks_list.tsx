import React, { ReactNode, useEffect, useState } from "react";
import { TimerTypes } from "../../../common/common_types";
import styles from "./tasks_list.scss";
import { NewTaskInput } from "./task_input";
import CloseIcon from "../../../../assets/close.svg";

type TasksListProps = {
  currentPhase: TimerTypes;
};

enum ListsTypes {
  current = "current",
  completed = "completed",
}

export const TasksList = ({ currentPhase }: TasksListProps) => {
  const [tasksList, addToTasksList] = useState<Array<string>>([]);
  const [completedTasksList, completeTask] = useState<Array<string>>([]);

  useEffect(() => {
    if (currentPhase === TimerTypes.break && tasksList.length !== 0) {
      const completedTask = tasksList.shift() as string;

      completeTask((existingCompletedList) => [
        ...existingCompletedList,
        completedTask,
      ]);
    }
  }, [currentPhase]);

  const handleNewTaskSubmit = (newTask: string) => {
    addToTasksList((currentTasks) => [...currentTasks, newTask]);
  };

  const handleListClear = (type: ListsTypes) => () => {
    type === ListsTypes.completed ? completeTask([]) : addToTasksList([]);
  };

  return (
    <div className={styles.tasksList}>
      <hr className={styles.divider} />
      <ReminderElement
        currentPhase={currentPhase}
        className={styles.tasksList__reminderElement}
      />
      <NewTaskInput onTaskSubmit={handleNewTaskSubmit} />
      {tasksList.length > 0 && (
        <div className={styles.tasksList__listBlock}>
          <div className={styles.tasksList__titleBlock}>
            <div className={styles.tasksList__listTitle}>Current tasks:</div>
            <button
              onClick={handleListClear(ListsTypes.current)}
              className={styles.tasksList__clearButton}
            >
              <CloseIcon className={styles.tasksList__clearButtonIcon} />
            </button>
          </div>
          <ul className={styles.tasksList__list}>
            {buildList(tasksList, currentPhase === TimerTypes.active)}
          </ul>
        </div>
      )}
      {completedTasksList.length > 0 && (
        <div className={styles.tasksList__listBlock}>
          <div className={styles.tasksList__titleBlock}>
            <div className={styles.tasksList__listTitle}>Completed tasks:</div>
            <button
              onClick={handleListClear(ListsTypes.completed)}
              className={styles.tasksList__clearButton}
            >
              <CloseIcon className={styles.tasksList__clearButtonIcon} />
            </button>
          </div>
          <ul className={styles.tasksList__list}>
            {buildList(completedTasksList, false)}
          </ul>
        </div>
      )}
    </div>
  );
};

type ActiveTaskProps = {
  currentPhase: TimerTypes;
  className: string;
};

const ReminderElement = ({ currentPhase, className }: ActiveTaskProps) => {
  let content = "Add tasks for productivity";

  if (currentPhase === TimerTypes.break) {
    content = "Take a small break";
  } else if (currentPhase === TimerTypes.active) {
    content = "Focus on current task";
  }

  return <div className={className}>{content}</div>;
};

const buildList = (list: string[], isActivePhase: boolean): ReactNode[] =>
  list.map((task, i) => (
    <li
      key={task}
      className={
        isActivePhase && i === 0
          ? `${styles.tasksList__listItem} ${styles.tasksList__listItemActive}`
          : styles.tasksList__listItem
      }
    >
      {task}
    </li>
  ));
