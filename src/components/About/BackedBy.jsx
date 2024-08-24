import React from "react";
import styles from "./BackedBy.module.css";
import Image from "next/image";
import { microsoft } from "@/../public/companies/microsoft.jpeg";
import { nvidia } from "@/../public/companies/nvidia.jpeg";

const BackedBy = () => {
  return (
    <div className={styles.bb_container}>
      <div className={styles.backed_by}>
        <div className={styles.bb_left}>
          <div>Backed By</div>
        </div>
        <div className={styles.bb_right}>
          <img
            src={"/companies/microsoft.jpeg"}
            alt="Microsoft 5ive.ai"
            // width={1000}
            // height={500}
            className={styles.image}
          />
          <img
            src={"companies/nvidia.jpeg"}
            alt="nvidia 5ive.ai"
            // width={1000}
            // height={500}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default BackedBy;
