import classNames from "classnames";
import React from "react";
import styles from "./input.scss";
import { useRecoilState } from "recoil";
import { Themes, themeState } from "../../../state/atoms/theme_state";

type OnChange = (newValue: string) => void;

type InputProps = {
  onChange: OnChange;
  isReadOnly: boolean;
  value: string;
  inputCn?: string;
};

export const Input = ({ onChange, isReadOnly, value, inputCn }: InputProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  const [theme] = useRecoilState(themeState);

  const cn = {
    input:
      classNames({
        [styles["input"]]: true,
        [styles["input--theme-light"]]: theme === Themes.light,
        [styles["input--theme-dark"]]: theme === Themes.dark,
        [styles["input--read-only"]]: isReadOnly,
      }) +
      " " +
      inputCn,
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={cn.input}
      readOnly={isReadOnly}
    />
  );
};
