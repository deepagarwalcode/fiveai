"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Title.module.css";
import gsap from "gsap";

const Title = () => {
  const line1 = useRef(null);
  const line2 = useRef(null);

  useEffect(() => {
    if (line1 && line2) {
      gsap.to(line1.current, {
        y: 0,
        rotate: "0deg",
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0,
      });
      gsap.to(line2.current, {
        y: 0,
        rotate: "0deg",
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.2,
      });
    }
    console.log(line1.current);
  }, [line1, line2]);
  return (
    <div className={styles.title}>
      <div className={styles.line}>
        <div ref={line1}>Revolutionizing</div>
      </div>
      <div className={styles.line}>
        <div ref={line2}>Education</div>
      </div>
    </div>
  );
};

export default Title;
