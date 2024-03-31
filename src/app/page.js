"use client";

import styles from "./page.module.css";
import Neurons from "@/components/Neurons";
import Morphing from "@/components/Morphing";
import Title from "@/components/Opening/Title";
import Navbar from "@/components/Navbar/Navbar";
import Phrase from "@/components/Opening/Phrase";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import Waitlist from "@/components/Waitlist";
import Results from "@/components/About/Results";
import Founders from "@/components/About/Founders";
import Ending from "@/components/Ending";

export default function Home() {
  const containerRef = useRef(null);
  const waitlistRef = useRef(null);
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      const scrollDisperse2 = () => {
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,

            start: `${window.innerHeight * 1.9} top`,
            end: `${window.innerHeight * 3.4} top`,
            onEnter: () => {
              gsap.to(containerRef.current, {
                zIndex: 3,
                display: "inline-block",
                delay: 0,
              });
              gsap.to(containerRef.current, {
                opacity: 1,
                duration: 2,
                delay: 0.4,
              });
            },
            onEnterBack: () => {
              gsap.to(containerRef.current, {
                zIndex: 3,
                display: "inline-block",
                delay: 0,
              });
              gsap.to(containerRef.current, {
                opacity: 1,
                duration: 2,
                delay: 0.4,
              });
            },
            onLeave: () => {
              gsap.to(containerRef.current, {
                opacity: 0,

                duration: 1,
              });
              gsap.to(containerRef.current, {
                // zIndex: -1,
                display: "none",
                delay: 1,
              });
              gsap.to(aboutRef.current, {
                zIndex: 10,
              });
            },
            onLeaveBack: () => {
              gsap.to(containerRef.current, {
                opacity: 0,

                duration: 1,
              });
              gsap.to(containerRef.current, {
                // zIndex: -1,
                display: "none",
                delay: 1,
              });
            },
          },
        });
      };

      scrollDisperse2();
    }
  }, [containerRef]);

  const showWaitlist = () => {
    gsap.to(waitlistRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  return (
    <div style={{ backgroundColor: "#101010", height: "100%" }}>
      <Navbar showWaitlist={showWaitlist} />
      <div className={styles.opening}>
        <Morphing />
        <Title />
        <Phrase />
      </div>
      <div className={styles.neuron} ref={containerRef}>
        <Neurons />
      </div>
      <div className={styles.margin}></div>
      <div className={styles.about}>
        <Results showWaitlist={showWaitlist} />
      </div>
      <div className={styles.founders}>
        <Founders />
      </div>
      <div className={styles.final}>
        <Ending showWaitlist={showWaitlist} />
      </div>
      <Waitlist waitlistRef={waitlistRef} />
    </div>
  );
}
