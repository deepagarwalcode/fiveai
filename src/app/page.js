
import styles from "./page.module.css";
import Neurons from "@/components/Neurons";
import Morphing from "@/components/Morphing";
import Title from "@/components/Opening/Title";
import Navbar from "@/components/Navbar/Navbar";
import Phrase from "@/components/Opening/Phrase";

export default function Home() {


  return (
    // <Suspense fallback={null}>
      <div>
        <Navbar />
        <div className={styles.opening}>
          <Morphing />
          <Title />
          <Phrase/>
        </div>
        <Neurons />
      </div>
    // </Suspense>
  );
}
