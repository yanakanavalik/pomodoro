import React, { useContext, useState } from "react";
import styles from "./task_input.scss";
import AddIcon from "../../../../assets/icons/add.svg";
import { Themes } from "../../../common/hooks/useTheme";
import { ThemeContext } from "../theme_provider/theme_provider";
import classNames from "classnames/bind";

type OnTaskSubmit = (newTask: Task) => void;

type TaskInputProps = {
  onTaskSubmit: OnTaskSubmit;
};

export interface Task {
  description: string;
  id: string;
}

const generateId = (input: string): string =>
  input.replace(" ", "") + Math.floor(Math.random() * 10000 + input.length);

export const TaskInput = ({ onTaskSubmit }: TaskInputProps) => {
  const [value, updateValue] = useState("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    updateValue(event.currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onTaskSubmit({
      description: value,
      id: generateId(value),
    });
    updateValue("");
  };

  const theme = useContext<Themes>(ThemeContext);

  const cn = {
    taskInput: styles.taskInput,
    taskInputInput: classNames({
      [styles["taskInput__input"]]: true,
      [styles["taskInput__input--theme-light"]]: theme === Themes.light,
      [styles["taskInput__input--theme-dark"]]: theme === Themes.dark,
    }),
    taskInputSubmit: classNames({
      [styles["taskInput__submit"]]: true,
      [styles["taskInput__submit--theme-light"]]: theme === Themes.light,
      [styles["taskInput__submit--theme-dark"]]: theme === Themes.dark,
    }),
    taskInputSubmitIcon: classNames({
      [styles["taskInput__submitIcon"]]: true,
      [styles["taskInput__submitIcon--theme-light"]]: theme === Themes.light,
      [styles["taskInput__submitIcon--theme-dark"]]: theme === Themes.dark,
    }),
  };

  return (
    <form onSubmit={handleSubmit} className={cn.taskInput}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={cn.taskInputInput}
      />
      <button type="submit" className={cn.taskInputSubmit}>
        <AddIcon className={cn.taskInputSubmitIcon} />
      </button>
    </form>
  );
};
