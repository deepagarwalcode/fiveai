import React from "react";
import styles from "./Statistics.module.css";
import { statsData } from "@/lib/data";
import StatisticsCard from "./StatisticsCard";

const Statistics = () => {
  return (
    <div className={styles.statistics}>
      <h2 className={styles.statistics_header}>Did You Know?</h2>
      {/* <div style={{display: "flex"}}> */}
        {/* <div className={styles.timeline}>
          {statsData.map((stats, index) => (
            <div>
              <p>{index + 1}</p>
              {index + 1 < statsData.length && (
                <div className={styles.line}></div>
              )}
            </div>
          ))}
        </div> */}
        <div className={styles.stats}>
          {statsData.map((stat, index) => (
            <StatisticsCard title={stat.title} index={index} description={stat.description} />
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Statistics;
