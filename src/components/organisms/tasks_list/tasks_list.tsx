import React, { ReactNode, useContext, useEffect, useState } from "react";
import { TimerTypes } from "../../../common/common_types";
import styles from "./tasks_list.scss";
import { TaskInput } from "../task_input";
import CloseIcon from "../../../../assets/icons/close.svg";
import TrashIcon from "../../../../assets/icons/trash.svg";
import { Themes } from "../../../common/hooks/useTheme";
import { ThemeContext } from "../theme_provider/theme_provider";
import classNames from "classnames/bind";
import { Task } from "../task_input/task_input";
import TomatoSlice from "./../../../../assets/icons/tomato-slice.svg";
import TomatoDisabled from "./../../../../assets/icons/tomato-slice-disabled.svg";

type TasksListProps = {
  currentPhase: TimerTypes;
};

enum ListsTypes {
  current = "current",
  completed = "completed",
}

export const TasksList = ({ currentPhase }: TasksListProps) => {
  const [tasksList, addToTasksList] = useState<Array<Task>>([]);
  const [completedTasksList, completeTask] = useState<Array<Task>>([]);

  const theme = useContext<Themes>(ThemeContext);

  const cn = {
    tasksList: styles.tasksList,
    divider: classNames({
      [styles["divider"]]: true,
      [styles["divider--theme-light"]]: theme === Themes.light,
      [styles["divider--theme-dark"]]: theme === Themes.dark,
    }),
    reminderElement: classNames({
      [styles["tasksList__reminderElement"]]: true,
      [styles["tasksList__reminderElement--theme-light"]]:
        theme === Themes.light,
      [styles["tasksList__reminderElement--theme-dark"]]: theme === Themes.dark,
    }),
    clearButton: classNames({
      [styles["tasksList__clearButton"]]: true,
      [styles["tasksList__clearButton--theme-light"]]: theme === Themes.light,
      [styles["tasksList__clearButton--theme-dark"]]: theme === Themes.dark,
    }),
    clearButtonIcon: classNames({
      [styles["tasksList__clearButtonIcon"]]: true,
      [styles["tasksList__clearButtonIcon--theme-light"]]:
        theme === Themes.light,
      [styles["tasksList__clearButtonIcon--theme-dark"]]: theme === Themes.dark,
    }),
    listBlock: styles.tasksList__listBlock,
    listTitle: classNames({
      [styles["tasksList__listTitle"]]: true,
      [styles["tasksList__listTitle--theme-light"]]: theme === Themes.light,
      [styles["tasksList__listTitle--theme-dark"]]: theme === Themes.dark,
    }),
    titleBlock: styles.tasksList__titleBlock,
    list: styles.tasksList__list,
  };

  useEffect(() => {
    if (currentPhase === TimerTypes.break && tasksList.length !== 0) {
      const completedTask = tasksList.shift() as Task;

      completeTask((existingCompletedList) => [
        ...existingCompletedList,
        completedTask,
      ]);
    }
  }, [currentPhase]);

  const handleNewTaskSubmit = (newTask: Task) => {
    addToTasksList((currentTasks) => [...currentTasks, newTask]);
  };

  const handleListClear = (type: ListsTypes) => () => {
    type === ListsTypes.completed ? completeTask([]) : addToTasksList([]);
  };

  const handleListItemRemove = (taskToRemove: Task) =>
    addToTasksList(tasksList.filter((task) => task.id !== taskToRemove.id));

  return (
    <div className={cn.tasksList}>
      <hr className={cn.divider} />
      <ReminderElement
        currentPhase={currentPhase}
        className={cn.reminderElement}
      />
      <TaskInput onTaskSubmit={handleNewTaskSubmit} />
      {tasksList.length > 0 && (
        <div className={cn.listBlock}>
          <div className={cn.titleBlock}>
            <div className={cn.listTitle}>Current tasks:</div>
            <button
              onClick={handleListClear(ListsTypes.current)}
              className={cn.clearButton}
            >
              <CloseIcon className={cn.clearButtonIcon} />
            </button>
          </div>
          <ul className={cn.list}>
            {buildList(
              tasksList,
              currentPhase === TimerTypes.active,
              true,
              theme,
              handleListItemRemove
            )}
          </ul>
        </div>
      )}
      {completedTasksList.length > 0 && (
        <div className={cn.listBlock}>
          <div className={cn.titleBlock}>
            <div className={cn.listTitle}>Completed tasks:</div>
            <button
              onClick={handleListClear(ListsTypes.completed)}
              className={cn.clearButton}
            >
              <CloseIcon className={cn.clearButtonIcon} />
            </button>
          </div>
          <ul className={cn.list}>
            {buildList(completedTasksList, false, false, theme)}
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

const buildList = (
  list: Task[],
  isActivePhase: boolean,
  canBeRemoved: boolean,
  theme: Themes,
  removeFromList?: (arg0: Task) => void
): ReactNode[] => {
  const createCn = (isActive: boolean) =>
    classNames({
      [styles["tasksList__listItem"]]: true,
      [styles["tasksList__listItem--theme-light"]]: theme === Themes.light,
      [styles["tasksList__listItem--theme-dark"]]: theme === Themes.dark,
      [styles.tasksList__listItemActive]: isActive,
      [styles["tasksList__listItemActive--theme-dark"]]:
        isActive && theme === Themes.dark,
      [styles["tasksList__listItemActive--theme-light"]]:
        isActive && theme === Themes.light,
    });

  const removeButtonCn = {
    removeTaskButton: styles.tasksList__removeTaskButton,
    removeTaskButtonIcon: classNames({
      [styles.tasksList__removeTaskButtonIcon]: canBeRemoved,
      [styles["tasksList__removeTaskButtonIcon--theme-dark"]]:
        theme === Themes.dark,
      [styles["tasksList__removeTaskButtonIcon--theme-light"]]:
        theme === Themes.light,
    }),
  };

  return list.map((task, i) => (
    <li key={task.id} className={createCn(isActivePhase && i === 0)}>
      <span>
        {isActivePhase ? (
          <TomatoSlice className={styles.tasksList__listStyleIcon} />
        ) : (
          <TomatoDisabled className={styles.tasksList__listStyleIcon} />
        )}
        <span>{task.description}</span>
      </span>
      {canBeRemoved && removeFromList && (
        <button
          className={removeButtonCn.removeTaskButton}
          onClick={() => removeFromList(task)}
        >
          <TrashIcon className={removeButtonCn.removeTaskButtonIcon} />
        </button>
      )}
    </li>
  ));
};
