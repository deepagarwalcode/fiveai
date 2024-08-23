import React from "react";
import styles from "./About.module.css";

const About = () => {
  function openInNewTab() {
    window.open("https://www.zapnosys.com/", "_blank", "noopener,noreferrer");
  }
  return (
    <div className={styles.a_container}>
      <div className={styles.about}>
        <div className={styles.a_left}>
          <div>About Five.ai</div>
          {/* <div>for Lifelong Success</div> */}
          {/* <div className={styles.cta} onClick={showWaitlist}>Join Waitlist Now</div> */}
          {/* <div className={styles.button_outer} onClick={showWaitlist}>
          <div className={styles.button_inner}></div>
          </div> */}
        </div>
        <div className={styles.a_right}>
          <p>
            5ive.ai is a product of Zapnosys AI Pvt Ltd, founded in 2023 and
            based in Gurugram. The company specializes in AI-driven innovations,
            including text-to-video engines for education, corporate training,
            AI-powered news anchors for media, and personalized marketing.
            Zapnosys leads in practical AI Applications. Learn more at{" "}
            <a
              href="https://www.zapnosys.com/"
              target="_blank"
              style={{
                color: "#ff7f50",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Zapnosys AI Pvt Ltd.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
