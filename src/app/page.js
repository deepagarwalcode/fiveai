"use client";

import styles from "./page.module.css";
import Neurons from "@/components/Neurons";
import Morphing from "@/components/Morphing";
import Title from "@/components/Opening/Title";
import Navbar from "@/components/Navbar/Navbar";
import Phrase from "@/components/Opening/Phrase";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap"
import { useLayoutEffect, useRef } from "react";
import Waitlist from "@/components/Waitlist";

export default function Home() {

  const containerRef = useRef(null);
  const waitlistRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        zIndex: -1,
      });

      const scrollDisperse2 = () => {
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            // start: `${
            //   window.innerHeight * 1.2 - window.innerHeight * 0.1
            // } bottom`,
            start: `${window.innerHeight * 1.9} top`,
            // markers: true,
            onEnter: () => {
              // gsap.to(containerRef.current, {
              // });
              gsap.to(containerRef.current, {
                opacity: 1,
                duration: 2,
                delay: 0.4,
              });
              gsap.to(containerRef.current, {
                zIndex: 3,
                delay: 0
              })
            },
            onLeaveBack: () => {
              gsap.to(containerRef.current, {
                opacity: 0,

                duration: 1,
              });
              gsap.to(containerRef.current, {
                zIndex: -1,
                delay: 1
              })
            },
          },
          // value: 0,
        });
      };

      scrollDisperse2();
    }
  }, [containerRef]);
  return (
    // <Suspense fallback={null}>
    <div>
      <Navbar waitlistRef={waitlistRef} />
      <div className={styles.opening}>
        <Morphing />
        <Title />
        <Phrase />
      </div>
      <div className={styles.neuron} ref={containerRef}>
        <Neurons />
      </div>
      <Waitlist waitlistRef={waitlistRef} />
    </div>
    // </Suspense>
  );
}
