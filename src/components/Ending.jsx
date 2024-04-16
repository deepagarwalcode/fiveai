import styles from "./Ending.module.css";

const Ending = ({showWaitlist}) => {
  return (
    <div className={styles.ending}>
      <div className={styles.line}>
        <div>Empower your Child to Excel</div>
      </div>
      <div className={styles.line}>
        <div>
          <span className={styles.jw} onClick={showWaitlist}>Join Waitlist</span> to book Demo
        </div>
      </div>
    </div>
  );
};

export default Ending;
