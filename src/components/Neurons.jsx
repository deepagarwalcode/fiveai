"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
  useLayoutEffect,
} from "react";
import styles from "./Neurons.module.css";
import {
  OrbitControls,
  PointMaterial,
  shaderMaterial,
  Sphere,
  useGLTF,
  useScroll,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import particleVertex from "../shaders/neuron_particles/vertex.glsl?raw";
import particleFragment from "../shaders/neuron_particles/fragment.glsl?raw";
import gsap from "gsap";
import { getProject, val } from "@theatre/core";

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import flyThroughState from "../lib/fly-through.json";
import ScrollTrigger from "gsap/ScrollTrigger";
import neuronJson from "../lib/system.json";
import { enableBodyScroll } from "body-scroll-lock";

const Neurons = ({ pageRef }) => {
  const sheet = getProject("Fly Through", { state: flyThroughState }).sheet(
    "Scene"
  );

  let particles = {};

  // const neuronGeometry = useGLTF("/models/system.glb");

  // console.log(neuronJson.meshes[0].vertices);
  // console.log(neuronGeometry);

  const factor = 2;

  const cameraPosition = [
    -0.3277834258804101, 2.3106249609219893, 1.0880734148165658,
  ];

  // particles.maxCount = neuronGeometry.scene.children[0].geometry.attributes.position.count / factor;
  particles.maxCount = neuronJson.meshes[0].vertices.length / 3 / factor;

  particles.positions = [];

  const randomsArray = new Float32Array(particles.maxCount);

  for (let i = 0; i < particles.maxCount; i++) {
    randomsArray[i] = Math.random();
  }

  // NEURON START

  // const neuronModel = neuronGeometry;

  const neuronPosition = neuronJson.meshes[0].vertices;

  const neuronOriginalArray = neuronPosition;
  const neuronNewArray = new Float32Array(particles.maxCount * 3);

  for (let i = 0; i < particles.maxCount; i++) {
    const i3 = i * 3;
    if (i3 * factor < neuronOriginalArray.length) {
      neuronNewArray[i3 + 0] =
        neuronOriginalArray[i3 * factor + 0] / 10 + randomsArray[i + 0] * 0.1;
      neuronNewArray[i3 + 1] =
        neuronOriginalArray[i3 * factor + 1] / 10 + randomsArray[i + 1] * 0.1;
      neuronNewArray[i3 + 2] =
        neuronOriginalArray[i3 * factor + 2] / 10 + randomsArray[i + 2] * 0.1;
    } else {
      const randomIndex = Math.floor(neuronPosition.count * Math.random()) * 3;
      neuronNewArray[i3 + 0] =
        neuronOriginalArray[randomIndex + 0] / 10 +
        randomsArray[randomIndex + 0] * 0.1;
      neuronNewArray[i3 + 1] =
        neuronOriginalArray[randomIndex + 1] / 10 +
        randomsArray[randomIndex + 1] * 0.1;
      neuronNewArray[i3 + 2] =
        neuronOriginalArray[randomIndex + 2] / 10 +
        randomsArray[randomIndex + 2] * 0.1;
    }
  }

  particles.positions.push(new THREE.Float32BufferAttribute(neuronNewArray, 3));
  const neuronPositionsArray = particles.positions[0].array;

  const neuronFinalArray = Array.from(
    { length: neuronPositionsArray.length / 3 },
    (v, k) => k + 1
  ).map((num) => {
    const randomOffset = randomsArray[num] * 1;
    const x = neuronPositionsArray[num * 3 + 0] + randomOffset;
    const y = neuronPositionsArray[num * 3 + 1] + randomOffset;
    const z = neuronPositionsArray[num * 3 + 2] + randomOffset;

    return {
      idx: num,
      position: [x, y, z],
    };
  });

  // NEURON END

  // CONSTANT SPHERE START
  let constSphereParticles = {};

  constSphereParticles.positions = [];

  const constSphereGeometry = new THREE.SphereGeometry(36, 32, 32);

  const constSphereModel = constSphereGeometry;

  constSphereGeometry.rotateX(Math.PI / 2);

  const constSpherePosition = constSphereModel.attributes.position;

  const constSphereOriginalArray = constSpherePosition.array;
  const constSphereNewArray = new Float32Array(particles.maxCount * 3);
  const constSphereFinalArray = new Float32Array(particles.maxCount * 3);

  for (let i = 0; i < particles.maxCount; i++) {
    const i3 = i * 3;
    if (i3 * factor < constSphereOriginalArray.length) {
      constSphereNewArray[i3 + 0] =
        constSphereOriginalArray[i3 * factor + 0] + randomsArray[i + 0] * 2;
      constSphereNewArray[i3 + 1] =
        constSphereOriginalArray[i3 * factor + 1] + randomsArray[i + 1] * 2;
      constSphereNewArray[i3 + 2] =
        constSphereOriginalArray[i3 * factor + 2] + randomsArray[i + 2] * 2;

      constSphereFinalArray[i3 + 0] =
        constSphereOriginalArray[i3 * factor + 0] + randomsArray[i + 0] * 20;
      constSphereFinalArray[i3 + 1] =
        constSphereOriginalArray[i3 * factor + 1] + randomsArray[i + 1] * 20;
      constSphereFinalArray[i3 + 2] =
        constSphereOriginalArray[i3 * factor + 2] + randomsArray[i + 2] * 20;
    } else {
      const randomIndex =
        Math.floor(constSpherePosition.count * Math.random()) * 3;
      constSphereNewArray[i3 + 0] =
        constSphereOriginalArray[randomIndex + 0] +
        randomsArray[randomIndex + 0] * 2;
      constSphereNewArray[i3 + 1] =
        constSphereOriginalArray[randomIndex + 1] +
        randomsArray[randomIndex + 1] * 2;
      constSphereNewArray[i3 + 2] =
        constSphereOriginalArray[randomIndex + 2] +
        randomsArray[randomIndex + 2] * 2;

      constSphereFinalArray[i3 + 0] =
        constSphereOriginalArray[randomIndex + 0] +
        randomsArray[randomIndex + 0] * 20;
      constSphereFinalArray[i3 + 1] =
        constSphereOriginalArray[randomIndex + 1] +
        randomsArray[randomIndex + 1] * 20;
      constSphereFinalArray[i3 + 2] =
        constSphereOriginalArray[randomIndex + 2] +
        randomsArray[randomIndex + 2] * 20;
    }
  }

  constSphereParticles.positions.push(
    new THREE.Float32BufferAttribute(constSphereNewArray, 3)
  );
  const constSpherePositionsArray = constSphereParticles.positions[0].array;

  // const constSphereFinalArray = Array.from(
  //   { length: spherePositionsArray.length / 3 },
  //   (v, k) => k + 1
  // ).map((num) => {
  //   const randomOffset = randomsArray[num] * 3;
  //   const x = constSpherePositionsArray[num * 3 + 0] + randomOffset;
  //   const y = constSpherePositionsArray[num * 3 + 1] + randomOffset;
  //   const z = constSpherePositionsArray[num * 3 + 2] + randomOffset;

  //   return {
  //     idx: num,
  //     position: [x, y, z],
  //   };
  // });

  constSphereParticles.positions.push(
    new THREE.Float32BufferAttribute(constSphereFinalArray, 3)
  );

  constSphereParticles.geometry = new THREE.BufferGeometry();
  constSphereParticles.geometry.setAttribute(
    "position",
    constSphereParticles.positions[1]
  );
  constSphereParticles.geometry.setAttribute(
    "aPositionTarget",
    constSphereParticles.positions[1]
  );
  constSphereParticles.geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(randomsArray, 1)
  );

  const windowSize =
    typeof window !== "undefined"
      ? new THREE.Vector2(window.innerWidth, window.innerHeight)
      : new THREE.Vector2(0, 0);

  // Material
  constSphereParticles.colorA = "#ffffff";
  constSphereParticles.colorB = "#ffffff";
  constSphereParticles.material = new THREE.ShaderMaterial({
    vertexShader: particleVertex,
    fragmentShader: particleFragment,
    uniforms: {
      uSize: { value: 1 },
      uResolution: {
        value: windowSize,
        // value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uProgress: { value: 0 }, // Updated initialization
      uColorA: { value: new THREE.Color(constSphereParticles.colorA) },
      uColorB: { value: new THREE.Color(constSphereParticles.colorB) },
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  // Points
  constSphereParticles.points = new THREE.Points(
    constSphereParticles.geometry,
    constSphereParticles.material
  );

  // console.log(constSphereParticles);

  // CONSTANT SPHERE END

  // Geometry
  particles.geometry = new THREE.BufferGeometry();
  particles.geometry.setAttribute("position", particles.positions[0]);
  particles.geometry.setAttribute("aPositionTarget", particles.positions[0]);
  particles.geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(randomsArray, 1)
  );

  // Material
  particles.colorA = "#FF7F50";
  particles.colorB = "#ffffff";
  particles.material = new THREE.ShaderMaterial({
    vertexShader: particleVertex,
    fragmentShader: particleFragment,
    uniforms: {
      uSize: { value: 1 },
      uResolution: {
        value: windowSize,
        // value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uProgress: { value: 0 }, // Updated initialization
      uColorA: { value: new THREE.Color(particles.colorA) },
      uColorB: { value: new THREE.Color(particles.colorB) },
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  // Points
  particles.points = new THREE.Points(particles.geometry, particles.material);

  return (
    <Suspense fallback={null}>
      <div className={styles.container}>
        <Canvas
          className={styles.canvas}
          style={{ height: "100vh", width: "100%" }}
          gl={{ preserveDrawingBuffer: true }}
          dpr={0.8}
        >
          <ScrollControls
            damping={1}
            maxSpeed={1}
            pages={10}
            style={{
              width: "100%",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Scroll>
              <SheetProvider sheet={sheet}>
                <Scene
                  neuronParticles={particles.points}
                  bgParticles={constSphereParticles.points}
                />
              </SheetProvider>
            </Scroll>
            <Scroll html style={{ width: "100%", height: "100vh" }}>
              {/* DOM contents in here will scroll along */}
              {/* <h1>html in here (optional)</h1> */}
              <FixedContent pageRef={pageRef} />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </Suspense>
  );
};

export default Neurons;

//

const Scene = ({ neuronParticles, bgParticles }) => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  useEffect(() => {
    console.log(scroll.scroll.current);
  }, [scroll.scroll.current]);

  return (
    <>
      <primitive object={neuronParticles} />
      <primitive object={bgParticles} />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={10}
        near={0.1}
        far={100}
      />
    </>
  );
};

const FixedContent = ({ pageRef }) => {
  const contentRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const scroll = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const [executed1, setExecuted1] = useState(false);
  const [executed2, setExecuted2] = useState(false);
  const [executed3, setExecuted3] = useState(false);
  const [executed4, setExecuted4] = useState(false);
  const [executed5, setExecuted5] = useState(false);
  const [executed6, setExecuted6] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let timeoutId = null;

    const handleScrollStart = () => {
      setIsScrolling(true);
    };

    const handleScrollEnd = () => {
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener("wheel", handleScrollStart);
    window.addEventListener("wheel", handleScrollEnd);

    return () => {
      window.removeEventListener("wheel", handleScrollStart);
      window.removeEventListener("wheel", handleScrollEnd);
      clearTimeout(timeoutId);
    };
  }, []);

  useFrame(() => {
    if (isScrolling || scroll.offset !== offset) {
      // console.log("Scroll progress:", scroll.offset);
      // console.log("Scroll Delta:", scroll.delta);
      setOffset(scroll.offset);
      // Update your logic based on the scroll progress here
    }
  });

  useEffect(() => {
    if (scroll.offset < 0.12 && executed1) {
      disAppear(div1Ref);
      setExecuted1(false);
    }
    if (scroll.offset > 0.12 && !executed1) {
      appear(div1Ref);
      setExecuted1(true);
    }
    if (scroll.offset < 0.25 && executed2) {
      disAppear(div2Ref);
      setExecuted2(false);
    }
    if (scroll.offset > 0.25 && !executed2) {
      appear(div2Ref);
      setExecuted2(true);
    }
    if (scroll.offset < 0.39 && executed3) {
      disAppear(div3Ref);
      setExecuted3(false);
    }
    if (scroll.offset > 0.39 && !executed3) {
      appear(div3Ref);
      setExecuted3(true);
    }
    if (scroll.offset < 0.52 && executed4) {
      disAppear(div4Ref);
      setExecuted4(false);
    }
    if (scroll.offset > 0.52 && !executed4) {
      appear(div4Ref);
      setExecuted4(true);
    }
    if (scroll.offset < 0.675 && executed5) {
      disAppear(div5Ref);
      setExecuted5(false);
    }
    if (scroll.offset > 0.675 && !executed5) {
      appear(div5Ref);
      setExecuted5(true);
    }
    if (scroll.offset < 0.81 && executed6) {
      disAppear(div6Ref);
      setExecuted6(false);
    }
    if (scroll.offset > 0.81 && !executed6) {
      appear(div6Ref);
      setExecuted6(true);
    }
  }, [offset]);

  useEffect(() => {
    if (offset > 0.01 && offset < 0.9) {

      // document.body.style.overflow = "hidden";
      // function disableScroll() {
      //   document.body.classList.add("no-scroll");
      //   document.body.style.overscrollBehavior = "none";
      //   document.ontouchmove = function (e) {
      //     e.preventDefault();
      //   };
      // }
      // disableScroll()
    } else {
      // document.body.style.overflow = "auto";
      // function enableScroll() {
      //   document.body.classList.remove("no-scroll");
      //   document.body.style.overscrollBehavior = "auto";
      //   document.ontouchmove = null;
      // }
      // enableScroll();
      enableBodyScroll(pageRef.current)
    }
  }, [offset]);

  const appear = (ref) => {
    gsap.to(ref.current, {
      opacity: 1,
      filter: "blur(0)",
      duration: 0.5,
    });

    // filter: "blur(0)"
  };

  const disAppear = (ref) => {
    gsap.to(ref.current, {
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.5,
    });

    // filter: "blur(0)"
  };

  return (
    <div className={styles.content} ref={contentRef}>
      <div className={styles.scroll_div}></div>

      <div className={styles.fixed_scroll_div} ref={div1Ref}>
        {/* <div className={styles.h1_div}> */}
        <h1 className={styles.fixed_scroll_h1}>Hyper Personalized</h1>
        {/* </div> */}
        <div></div>
        <p className={styles.fixed_scroll_p}>
          Our edtech platform's unique selling proposition (USP) is Hyper
          personalized learning at its finest. We're not just adapting to your
          needs; Our AI tailor's every aspect of your learning experience. From
          choosing your preferred learning style and difficulty level to
          deciding how you want to be motivated, it's all about your individual
          journey.
        </p>
      </div>
      <div className={styles.fixed_scroll_div} ref={div2Ref}>
        <h1 className={styles.fixed_scroll_h1}>Unique Content</h1>
        <p className={styles.fixed_scroll_p}>
          Unlike other platforms, we're not about generic content. We're about
          understanding you - your interests, cultural background, and even your
          future goals. It's education designed exclusively for you, ensuring
          you learn in a way that suits you best. Also we dont have a pre
          recorded library like others our content is generated in runtime only
          for you.
        </p>
      </div>
      <div className={styles.fixed_scroll_div} ref={div3Ref}>
        <h1 className={styles.fixed_scroll_h1}>Focus Mapping</h1>
        <p className={styles.fixed_scroll_p}>
          Our edtech platform isn't just about learning; it's about maximizing
          your potential in every way. With real-time focus mapping, we track
          your engagement and adapt the content to keep you in the zone. Imagine
          a learning experience that's not only personalized but also
          dynamically responds to your focus levels.
        </p>
      </div>
      <div className={styles.fixed_scroll_div} ref={div4Ref}>
        <h1 className={styles.fixed_scroll_h1}>All Round Growth</h1>
        <p className={styles.fixed_scroll_p}>
          And we go beyond academics. Our platform includes modules for
          personality development and other extra curricular activities, because
          education is not just about what you know; it's about who you are
          becoming. Whether it's honing your communication skills, building
          confidence, or discovering your strengths, we're here for your
          holistic growth.
        </p>
      </div>
      <div className={styles.fixed_scroll_div} ref={div5Ref}>
        <h1 className={styles.fixed_scroll_h1}>24*7 Personal Tutor</h1>
        <p className={styles.fixed_scroll_p}>
          Need help at 2 AM before a big test? No problem. Our AI teacher is
          available 24/7, ready to assist and guide you whenever you need
          support. It's like having a personal tutor on demand, ensuring that
          your learning never stops.
        </p>
      </div>
      <div className={styles.fixed_scroll_div} ref={div6Ref}>
        <h1 className={styles.fixed_scroll_h1}>Metalabs</h1>
        <p className={styles.fixed_scroll_p}>
          Picture a space where you can apply your knowledge, conduct
          experiments, and deepen your understanding in a risk-free setting.
          MetaLab is where theory meets practice, making your learning
          experience not just informative but truly experiential.
        </p>
      </div>
    </div>
  );
};
