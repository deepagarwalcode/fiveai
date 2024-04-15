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
import { useRouter } from "next/navigation";
import flyThroughState from "../lib/fly-through.json";
import neuronJson from "../lib/system.json";

export default function Home() {
  const containerRef = useRef(null);
  const waitlistRef = useRef(null);
  const aboutRef = useRef(null);
  const openingRef = useRef(null);
  const founderRef = useRef(null);
  const phraseRef = useRef(null);
  const [founder, setFounder] = useState({});
  const pageRef = useRef(null);
  const [above, setAbove] = useState(true);
  const [below, setBelow] = useState(false);
  const [overflowHide, setOverflowHide] = useState(false);
  const router = useRouter();

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
      // visibility: "visible",
      // pointerEvents: "auto",
      delay: 0,
    });
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.4,
      onComplete: () => {
        // Simulate a mouse click on the neuron container
        const neuronContainer = containerRef.current;
        if (neuronContainer) {
          neuronContainer.dispatchEvent(
            new MouseEvent("click", {
              view: window,
              bubbles: true,
              cancelable: true,
            })
          );
        }
      },
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
  };

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const scrollDisperse2 = () => {
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,

            start: `${window.innerHeight * 1.7} top`,
            end: `${window.innerHeight * 2.7} top`,
            // markers: true,
            onEnter: () => {
              // document.body.style.overflow = "hidden";
              disableScroll();
              // disableBodyScroll(containerRef.current)
              neuronEnter();
            },
            onEnterBack: () => {
              // document.body.style.overflow = "hidden";
              disableScroll();
              // disableBodyScroll(containerRef.current)
              neuronEnter();
            },
            onLeave: () => {},
            onLeaveBack: () => {
              // neuronLeave();
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
      style={{ height: "100%", backgroundColor: "#101010" }}
    >
      {/* <button style={{position: "fixed", top: "30vh", left: "0", zIndex: 5}} onClick={() => handleClick(openingRef)}>Click</button> */}
      <Navbar showWaitlist={showWaitlist} neuronLeave={neuronLeave} />
      <Morphing />
      <div className={styles.opening} ref={openingRef}>
        <Title />
        <Phrase phraseRef={phraseRef} />
      </div>
      <div className={styles.neuron} ref={containerRef}>
        <Neurons
          neuronLeave={neuronLeave}
          aboutRef={aboutRef}
          phraseRef={phraseRef}
          flyThroughState={flyThroughState}
          neuronJson={neuronJson}
        />
      </div>
      {/* <div className={styles.margin}></div> */}
      <div className={styles.about} ref={aboutRef}>
        <Results showWaitlist={showWaitlist} />
      </div>
      <div className={styles.founders}>
        <Founders showFounder={showFounder} setFounder={setFounder} />
      </div>
      <div className={styles.final}>
        <Ending showWaitlist={showWaitlist} />
      </div>
      <Waitlist waitlistRef={waitlistRef} />
      <FounderDetails founderRef={founderRef} founder={founder} />
    </div>
  );
}
