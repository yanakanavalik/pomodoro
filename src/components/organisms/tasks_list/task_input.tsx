import React, { useState } from "react";
import styles from "./task_input.scss";
import AddIcon from "../../../../assets/icons/add.svg";

type OnTaskSubmit = (newTask: string) => void;

type NewTaskInputProps = {
  onTaskSubmit: OnTaskSubmit;
};

export const NewTaskInput = ({ onTaskSubmit }: NewTaskInputProps) => {
  const [value, updateValue] = useState("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    updateValue(event.currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onTaskSubmit(value);
    updateValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskInput}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.taskInput__input}
      />
      <button type="submit" className={styles.taskInput__submit}>
        <AddIcon className={styles.taskInput__submitIcon} />
      </button>
    </form>
  );
};
