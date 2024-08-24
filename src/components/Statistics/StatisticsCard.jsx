import React from "react";
import styles from "./Statistics.module.css";
import { statsData } from "@/lib/data";

const StatisticsCard = ({ title, description, index }) => {
  return (
    <div style={{display: "flex", gap: "2vw"}}>
      <div className={styles.number_line}>
        <p className={styles.number}>{index + 1}</p>
        {index + 1 < statsData.length && <div className={styles.line}></div>}
      </div>
      <div className={styles.stats_card}>
        <p className={styles.sc_title}>{title}</p>
        <p className={styles.sc_desc}>{description}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
