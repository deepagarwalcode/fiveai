import Image from "next/image";
import styles from "./page.module.css";
import LogoParticles from "@/components/LogoParticles";
import ParticleRing from "@/components/Particles";
import Neurons from "@/components/Neurons";
import Test from "@/components/Test";
import WithSphere from "@/components/WithSphere";
import Morphing from "@/components/Morphing";

export default function Home() {
  return (
    <div>
      {/* <LogoParticles /> */}
      {/* <WithSphere /> */}
      <Morphing />
      {/* <Test /> */}
      {/* <Neurons /> */}
      {/* <ParticleRing/> */}
    </div>
  );
}
