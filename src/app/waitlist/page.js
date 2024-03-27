"use client";

import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast"

const Waitlist = () => {
  const parentName = useRef(null);
  const parentEmail = useRef(null);
  const parentMobile = useRef(null);
  const studentName = useRef(null);
  const studentAge = useRef(null);

  const handleSubmit = async () => {
    const data = {};
    data.parentName = parentName.current.value;
    data.parentEmail = parentEmail.current.value;
    data.parentPhoneNo = parentMobile.current.value;
    data.studentName = studentName.current.value;
    data.studentAge = studentAge.current.value;

    // Do something with the input values, e.g., send them to a server
    // console.log("Parent Name:", parentNameValue);
    // console.log("Parent Email:", parentEmailValue);
    // console.log("Parent Mobile:", parentMobileValue);
    // console.log("Student Name:", studentNameValue);
    // console.log("Student Age:", studentAgeValue);
    try {
      await axios.post(
        "https://auth-system-admin.vercel.app/api/wishlist",
        data
      );
      toast.success("Submitted Successfully!")
    } catch (e) {
      toast.error("Error!!!")
      console.error(e);
    }
  };

  return (
    <>
      <div className={styles.waitlist}>
        <div className={styles.form}>
          <p className={styles.title}>Join Waitlist</p>
          <div className={styles.input_container}>
            <p className={styles.label}>Parent Name</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Parent's Name"
              ref={parentName}
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.label}>Parent Email</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Parent's Email"
              ref={parentEmail}
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.label}>Parent Mobile</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Parent's Mobile"
              ref={parentMobile}
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.label}>Student Name</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Student's Name"
              ref={studentName}
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.label}>Student Age</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Student's Age"
              ref={studentAge}
            />
          </div>
          <button onClick={handleSubmit} className={styles.submit_button}>
            Submit
          </button>
        </div>
        <div className={styles.logo_img}>
          <img src="/imageSmall.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Waitlist;
