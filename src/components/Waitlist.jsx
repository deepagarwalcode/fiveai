"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Waitlist.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";

const Waitlist = ({waitlistRef}) => {
  const parentName = useRef(null);
  const parentEmail = useRef(null);
  const parentMobile = useRef(null);
  const studentName = useRef(null);
  const studentAge = useRef(null);
  const address = useRef(null);

  const hideWaitlist = () => {
    gsap.to(waitlistRef.current, {
      x: "100%",
      duration: 0.6,
      ease: "power3.out"
    })
  }


  const handleSubmit = async () => {
    const data = {};
    data.parentName = parentName.current.value;
    data.parentEmail = parentEmail.current.value;
    data.parentPhoneNo = parentMobile.current.value;
    data.studentName = studentName.current.value;
    data.studentAge = studentAge.current.value;
    data.address = address.current.value;

    // Do something with the input values, e.g., send them to a server
    // console.log("Parent Name:", parentNameValue);
    // console.log("Parent Email:", parentEmailValue);
    // console.log("Parent Mobile:", parentMobileValue);
    // console.log("Student Name:", studentNameValue);
    // console.log("Student Age:", studentAgeValue);
    if(!parentName?.current?.value || !parentEmail?.current?.value || !studentName?.current?.value || !studentAge?.current?.value || !address?.current?.value || !parentMobile?.current?.value){
      toast.error("Please fill all fields.")
      return;
    }

    try {
      await axios.post(
        "https://auth-system-admin.vercel.app/api/wishlist",
        data
      );
      toast.success("Submitted Successfully! Please check your email for further instructions.");
      hideWaitlist();
    } catch (e) {
      toast.error("Error! Please Enter Valid Credentials.");
      console.error(e);
    }
  };

  return (
    <>
      <div className={styles.waitlist} ref={waitlistRef}>
        <div className={styles.form}>
          <div className={styles.header}>
            <p className={styles.title}>Join Waitlist</p>
            <IoClose color="white" style={{cursor: "pointer"}} size={32} onClick={hideWaitlist} />
          </div>
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
          <div className={styles.input_container}>
            <p className={styles.label}>Address</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Address"
              ref={address}
            />
          </div>
          <button onClick={handleSubmit} className={styles.submit_button}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Waitlist;
