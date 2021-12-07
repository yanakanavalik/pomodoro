import React from "react";
import styles from "./home_page.scss";
import { Header } from "../organisms/header";
import { Footer } from "../organisms/footer";
import { TimerTasksBlock } from "../organisms/timer_tasks_block";

export const HomePage = () => {
  return (
    <div className={styles.body}>
      <Header />
      <TimerTasksBlock />
      <Footer />
    </div>
  );
};
