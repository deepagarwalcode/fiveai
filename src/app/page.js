"use client";

import styles from "./page.module.css";
import Neurons from "@/components/Neurons";
import Morphing from "@/components/Morphing";
import Title from "@/components/Opening/Title";
import Navbar from "@/components/Navbar/Navbar";
import Phrase from "@/components/Opening/Phrase";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Waitlist from "@/components/Waitlist";
import Results from "@/components/About/Results";
import Founders from "@/components/About/Founders";
import Ending from "@/components/Ending";
import FounderDetails from "@/components/About/FounderDetails";
import { disableBodyScroll } from "body-scroll-lock";

export default function Home() {
  const containerRef = useRef(null);
  const waitlistRef = useRef(null);
  const aboutRef = useRef(null);
  const founderRef = useRef(null);
  const [founder, setFounder] = useState({});
  const pageRef = useRef(null);
  const [above, setAbove] = useState(true);
  const [below, setBelow] = useState(false);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  function disableScroll() {
    document.body.classList.add("no-scroll");
    document.body.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";

    document.ontouchmove = function (e) {
      e.preventDefault();
    };
  }



  const neuronEnter = () => {
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
  };

  const neuronLeave = () => {
    gsap.to(containerRef.current, {
      opacity: 0,

      duration: 1,
    });
    gsap.to(containerRef.current, {
      // zIndex: -1,
      display: "none",
      delay: 1,
    });
  }

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const scrollDisperse2 = () => {
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,

            start: `${window.innerHeight * 1.9} top`,
            end: `${window.innerHeight * 3.4} top`,
            onEnter: () => {
              // document.body.style.overflow = "hidden";
              disableScroll();
              // disableBodyScroll(containerRef.current)
              neuronEnter()
            },
            onEnterBack: () => {
              // document.body.style.overflow = "hidden";
              disableScroll();
              // disableBodyScroll(containerRef.current)
              neuronEnter()
            },
            onLeave: () => {

            },
            onLeaveBack: () => {
              neuronLeave();
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

  const showFounder = () => {
    gsap.to(founderRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  return (
    <div
      className={styles.main}
      style={{ backgroundColor: "#101010", height: "100%" }}
      ref={pageRef}
    >
      <Navbar showWaitlist={showWaitlist} neuronLeave={neuronLeave} />
      <Morphing />(
      <div className={styles.opening}>
        <Title />
        <Phrase />
      </div>
      )
      <div className={styles.neuron} ref={containerRef}>
        <Neurons pageRef={pageRef} setAbove={setAbove} setBelow={setBelow} neuronLeave={neuronLeave} />
      </div>
      <div className={styles.margin}></div>(
      <>
        <div className={styles.about}>
          <Results showWaitlist={showWaitlist} />
        </div>
        <div className={styles.founders}>
          <Founders showFounder={showFounder} setFounder={setFounder} />
        </div>
        <div className={styles.final}>
          <Ending showWaitlist={showWaitlist} />
        </div>
      </>
      )
      <Waitlist waitlistRef={waitlistRef} />
      <FounderDetails founderRef={founderRef} founder={founder} />
    </div>
  );
}
