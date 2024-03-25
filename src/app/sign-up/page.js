import React from "react";
import styles from "./styles.module.css";
import Navbar from "@/components/Navbar/Navbar";

const SignUp = () => {
  return (
    <>
    <div className={styles.waitlist}>
      <div className={styles.form}>
        <p className={styles.title}>Sign Up</p>
        <div className={styles.input_container}>
          <p className={styles.label}>Parent Name</p>
          <input className={styles.input} type="text" placeholder="Enter Parent's Name" />
        </div>
        <div className={styles.input_container}>
          <p className={styles.label}>Parent Email</p>
          <input className={styles.input} type="text" placeholder="Enter Parent's Email" />
        </div>
        {/* <div className={styles.input_container}>
          <p className={styles.label}>Parent Mobile</p>
          <input className={styles.input} type="text" placeholder="Enter Parent's Mobile" />
        </div>
        <div className={styles.input_container}>
          <p className={styles.label}>Student Name</p>
          <input className={styles.input} type="text" placeholder="Enter Student's Name" />
        </div>
        <div className={styles.input_container}>
          <p className={styles.label}>Student Age</p>
          <input className={styles.input} type="text" placeholder="Enter Student's Age" />
        </div> */}
      </div>
      <div className={styles.logo_img}>
        <img src="/imageSmall.png" alt="" />
      </div>
    </div>
    </>

  );
};

export default SignUp;
