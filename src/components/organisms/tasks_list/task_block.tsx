import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Task } from "../task_input/task_input";
import { Input } from "../../atoms/input";

import TomatoSlice from "./../../../../assets/icons/tomato-slice.svg";
import TomatoDisabled from "./../../../../assets/icons/tomato-slice-disabled.svg";
import TrashIcon from "../../../../assets/icons/trash.svg";
import EditIcon from "../../../../assets/icons/edit.svg";
import CheckMarkIcon from "../../../../assets/icons/checkmark.svg";

import styles from "./task.scss";
import { useRecoilState } from "recoil";
import { Themes, themeState } from "../../../state/atoms/theme_state";

type TaskBlockProps = {
  task: Task;
  isActive: boolean;
  isEditable: boolean;
  removeFromList?: (arg0: Task) => void;
};

export const TaskBlock = ({
  task,
  isActive,
  isEditable,
  removeFromList,
}: TaskBlockProps) => {
  const [theme] = useRecoilState(themeState);
  const [currentValue, updateValue] = useState(task.description);
  const [isUnderEditingNow, toggleEditingMode] = useState(false);

  useEffect(() => {
    if (task.description !== currentValue) {
      updateValue(task.description);
    }
  }, [task]);

  const taskBlockCn = classNames({
    [styles["taskBlock"]]: true,
    [styles["taskBlock--theme-light"]]: theme === Themes.light,
    [styles["taskBlock--theme-dark"]]: theme === Themes.dark,
    [styles.taskBlockActive]: isActive,
    [styles["taskBlockActive--theme-dark"]]: isActive && theme === Themes.dark,
    [styles["taskBlockActive--theme-light"]]:
      isActive && theme === Themes.light,
  });

  const actionButtonCn = {
    actionTaskButton: styles.taskBlock__actionTaskButton,
    actionTaskButtonIcon: classNames({
      [styles.taskBlock__actionTaskButtonIcon]: isEditable,
      [styles["taskBlock__actionTaskButtonIcon--theme-dark"]]:
        theme === Themes.dark,
      [styles["taskBlock__actionTaskButtonIcon--theme-light"]]:
        theme === Themes.light,
    }),
  };

  const handleEditTaskClick = () => toggleEditingMode(!isUnderEditingNow);

  return (
    <form className={taskBlockCn}>
      <span>
        {isActive ? (
          <TomatoSlice className={styles.taskBlock__listStyleIcon} />
        ) : (
          <TomatoDisabled className={styles.taskBlock__listStyleIcon} />
        )}
      </span>
      <Input
        isReadOnly={!isUnderEditingNow}
        onChange={updateValue}
        value={currentValue}
        inputCn={styles.taskBlock__input}
      />
      {isEditable && !isUnderEditingNow && (
        <button
          className={actionButtonCn.actionTaskButton}
          onClick={handleEditTaskClick}
        >
          <EditIcon className={actionButtonCn.actionTaskButtonIcon} />
        </button>
      )}
      {isUnderEditingNow && (
        <button
          className={actionButtonCn.actionTaskButton}
          onClick={handleEditTaskClick}
        >
          <CheckMarkIcon className={actionButtonCn.actionTaskButtonIcon} />
        </button>
      )}
      {isEditable && removeFromList && (
        <button
          className={actionButtonCn.actionTaskButton}
          onClick={() => removeFromList(task)}
        >
          <TrashIcon className={actionButtonCn.actionTaskButtonIcon} />
        </button>
      )}
    </form>
  );
};
