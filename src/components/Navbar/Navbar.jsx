"use client"

import React, { useEffect, useRef } from 'react'
import styles from "./Navbar.module.css"
import gsap from "gsap";

const Navbar = ({showWaitlist}) => {
  const navRef = useRef(null);



  useEffect(() => {
    if (navRef) {
      gsap.to(navRef.current, {
        y: 0,
        duration: 1.6,
        ease: "power3.inOut",
        delay: 0,
      });
    }
  }, [navRef]);
  return (
    <div className={styles.navbar} ref={navRef}>
        <div className={styles.logo}>Five.ai</div>
        <div className={styles.menu_items}>
            <div className={styles.menu_item}>Our Values</div>
            <div className={styles.menu_item}>Team</div>
            <div className={styles.menu_item}>Vision</div>
            <div className={styles.join_waitlist} onClick={showWaitlist}>Join Waitlist</div>
        </div>
    </div>
  )
}

export default Navbar