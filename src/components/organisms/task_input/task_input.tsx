import { Input } from "../../atoms/input";
import { Themes, themeState } from "../../../state/atoms/theme_state";
import { useRecoilState } from "recoil";
import AddIcon from "../../../../assets/icons/add.svg";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./task_input.scss";

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

  const handleChange = (value: string) => {
    updateValue(value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onTaskSubmit({
      description: value,
      id: generateId(value),
    });
    updateValue("");
  };

  const [theme] = useRecoilState(themeState);

  const cn = {
    taskInput: styles.taskInput,
    taskInputInput: classNames({
      [styles["taskInput__input"]]: true,
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
      <Input
        onChange={handleChange}
        value={value}
        isReadOnly={false}
        inputCn={cn.taskInputInput}
      />
      <button type="submit" className={cn.taskInputSubmit}>
        <AddIcon className={cn.taskInputSubmitIcon} />
      </button>
    </form>
  );
};
