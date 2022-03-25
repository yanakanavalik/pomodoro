import {
  DraggableList,
  ListElementInterface,
} from "react-draggable-components";
import { Task } from "../task_input/task_input";
import { TaskBlock } from "./task_block";
import { TaskInput } from "../task_input";
import { Themes, themeState } from "../../../state/atoms/theme_state";
import { TimerTypes } from "../../../common/common_types";
import { useRecoilState } from "recoil";
import CloseIcon from "../../../../assets/icons/close.svg";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./tasks_list.scss";

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

  const [theme] = useRecoilState(themeState);

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

  const listElements = buildList(
    tasksList,
    currentPhase === TimerTypes.active,
    true,
    handleListItemRemove
  );

  const onElementDrag = (draggableElId: string, currentElId: string) => {
    const draggableTaskIndex = tasksList.findIndex(
      (task) => task.id === draggableElId
    );
    const currentTaskIndex = tasksList.findIndex(
      (task) => task.id === currentElId
    );

    if (draggableTaskIndex !== -1 && currentTaskIndex !== -1) {
      const updatedList = [...tasksList];

      [updatedList[draggableTaskIndex], updatedList[currentTaskIndex]] = [
        updatedList[currentTaskIndex],
        updatedList[draggableTaskIndex],
      ];

      addToTasksList(updatedList);
    }
  };

  return (
    <div className={cn.tasksList}>
      <hr className={cn.divider} />
      <ReminderElement
        currentPhase={currentPhase}
        className={cn.reminderElement}
      />
      <TaskInput onTaskSubmit={handleNewTaskSubmit} />
      {listElements.length > 0 && (
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
          <DraggableList
            listElements={listElements}
            onElementDrag={onElementDrag}
            listCN={cn.list}
            taskCN={styles.task}
            activeDraggedElCn={styles["task--dragged-active"]}
            overDraggedElCn={styles["task--dragged-over"]}
          />
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
            {buildList(completedTasksList, false, false)}
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
  removeFromList?: (arg0: Task) => void
): Array<ListElementInterface> =>
  list.map((task, i) => {
    return {
      id: task.id,
      node: (
        <TaskBlock
          key={task.id}
          task={task}
          isActive={isActivePhase && i === 0}
          isEditable={canBeRemoved}
          removeFromList={removeFromList}
        />
      ),
    };
  });
