import classNames from "classnames";
import { Themes } from "../../../common/hooks/useTheme";
import React, { useContext } from "react";
import styles from "./input.scss";
import { ThemeContext } from "../../../components/organisms/theme_provider/theme_provider";

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

  const theme = useContext<Themes>(ThemeContext);

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
