
import styles from "./Phrase.module.css";

const Phrase = ({phraseRef}) => {
  return (
    <div className={styles.phrase} ref={phraseRef}>
      <div className={styles.line}>
        <div>Innovating Education</div>
      </div>
      <div className={styles.line}>
        <div>Like Never Before</div>
      </div>
    </div>
  );
};

export default Phrase;
