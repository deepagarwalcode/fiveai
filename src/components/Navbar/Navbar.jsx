"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ showWaitlist, neuronLeave }) => {
  const navRef = useRef(null);

  const router = useRouter();

  function enableScroll() {
    document.body.style.overflow = "auto";
    document.body.classList.remove("no-scroll");
    document.body.style.overscrollBehavior = "auto";
    document.ontouchmove = null;
  }

  const handleReload = () => {
    window.location.reload();
    // enableScroll();

    // router.push("/")
  };

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

  const hideNeuron = () => {};
  return (
    <div className={styles.navbar} ref={navRef}>
      <div
        className={styles.logo}
        onClick={handleReload}
        style={{ cursor: "pointer" }}
      >
        5ive.ai
      </div>
      <div className={styles.menu_items}>
        {/* <Link href={"#founders"} onClick={neuronLeave} style={{color: "white", textDecoration: "none"}}>
          <div className={styles.menu_item}>Team</div>
        </Link>
        <Link href={"#results"} onClick={neuronLeave} style={{color: "white", textDecoration: "none"}}>
          <div className={styles.menu_item} >
            Our Results
          </div>
        </Link> */}
        {/* <div className={styles.menu_item}>Team</div> */}
        {/* <div className={styles.join_waitlist} onClick={showWaitlist}>
          Join Waitlist
        </div> */}
        {/* <div className={styles.join_waitlist_1}>
          <div className={styles.join_waitlist_2}>
            <div className={styles.join_waitlist_3}>
              <div className={styles.join_waitlist_4}>Join Waitlist</div>
            </div>
          </div>
        </div> */}
        <div className={styles.button_outer} onClick={showWaitlist}>
          <div className={styles.button_inner}></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
