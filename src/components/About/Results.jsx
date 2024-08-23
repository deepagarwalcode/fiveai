import React from "react";
import styles from "./Results.module.css";
import { whyUsData } from "@/lib/data";

const Results = ({showWaitlist}) => {
  const points = [
    {
      title: "Academic Excellence",
      description:
        "Boost grades and academic performance through our innovative learning approach.",
    },
    {
      title: "Enhanced Retention",
      description:
        "Deepen understanding and retain knowledge effectively with our proven methods.",
    },
    {
      title: "Love for Learning",
      description:
        "Cultivate a positive attitude towards learning and foster lifelong curiosity.",
    },
    {
      title: "Problem-Solving Prowess",
      description:
        "Develop critical thinking and problem-solving skills to tackle any challenge.",
    },
    {
      title: "Future-Ready Skills",
      description:
        "Prepare your child for future success with our forward-thinking curriculum.",
    },
  ];

  return (
    <div className={styles.results} id="results">
      <div className={styles.r_left}>
        <div>Why Five.ai?</div>
        {/* <div>for Lifelong Success</div> */}
        {/* <div className={styles.cta} onClick={showWaitlist}>Join Waitlist Now</div> */}
        {/* <div className={styles.button_outer} onClick={showWaitlist}>
          <div className={styles.button_inner}></div>
        </div> */}
      </div>
      <div className={styles.r_right}>
        {whyUsData.map((point, index) => (
          <Point point={point} index={index + 1} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Results;

const Point = ({ point, index }) => {
  return (
    <div className={styles.point}>
        <div className={styles.index}>{index}</div>
        <div className={styles.info}>
            <div className={styles.title}>{point.title}</div>
            <div className={styles.description}>{point.description}</div>
        </div>
    </div>
  );
};
