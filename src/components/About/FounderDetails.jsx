"use client";

import React from "react";
import styles from "./FounderDetails.module.css";
import gsap from "gsap";
import { IoClose } from "react-icons/io5";

const FounderDetails = ({ founder, founderRef }) => {
  const hideFounder = () => {
    gsap.to(founderRef.current, {
      x: "-100%",
      duration: 0.6,
      ease: "power3.out",
    });
  };
  return (
    <div className={styles.founder_details} ref={founderRef}>
      <img
        // src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        src={founder.img}
        alt=""
      />
      <div className={styles.info}>
        <p className={styles.name}>
          {founder.name}{" "}
          <IoClose
            color="white"
            style={{ cursor: "pointer" }}
            size={32}
            onClick={hideFounder}
          />
        </p>
        <p className={styles.designation}>{founder.designation}</p>
        <p className={styles.bio}>{founder.bio}</p>
      </div>
    </div>
  );
};

export default FounderDetails;
