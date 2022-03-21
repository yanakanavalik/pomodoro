import { Themes, themeState } from "../../../state/atoms/theme_state";
import { useRecoilState } from "recoil";
import React from "react";
import classNames from "classnames";
import styles from "./input.scss";

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
