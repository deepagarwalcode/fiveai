
import styles from "./Phrase.module.css";

const Phrase = () => {
  return (
    <div className={styles.phrase}>
      <div className={styles.line}>
        <div>Innovating K-12 Education</div>
      </div>
      <div className={styles.line}>
        <div>Like Never Before</div>
      </div>
    </div>
  );
};

export default Phrase;
