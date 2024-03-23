// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import styles from "./LogoParticles.module.css";
// import {
//   OrbitControls,
//   PerspectiveCamera,
//   PointMaterial,
//   shaderMaterial,
//   Sphere,
//   useGLTF,
// } from "@react-three/drei";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { extend } from "@react-three/fiber";
// import particleVertex from "../shaders/particles/vertex.glsl";
// import particleFragment from "../shaders/particles/fragment.glsl";
// import gsap from "gsap";

// const Morphing = () => {
//   let particles = {};

//   const logoGeometry = useGLTF("/models/mid_poly.glb");

//   console.log(logoGeometry);

//   const factor = 2;

//   const cameraPosition = [
//     -0.3277834258804101, 2.3106249609219893, 1.0880734148165658,
//   ];

//   particles.maxCount =
//     logoGeometry.scene.children[0].geometry.attributes.position.count / factor;

//   particles.positions = [];

//   const randomsArray = new Float32Array(particles.maxCount);

//   for (let i = 0; i < particles.maxCount; i++) {
//     randomsArray[i] = Math.random();
//   }

//   // SPHERE START

//   const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

//   const sphereModel = sphereGeometry;

//   sphereGeometry.rotateX(Math.PI / 2);

//   const spherePosition = sphereModel.attributes.position;

//   const sphereOriginalArray = spherePosition.array;
//   const sphereNewArray = new Float32Array(particles.maxCount * 3);

//   for (let i = 0; i < particles.maxCount; i++) {
//     const i3 = i * 3;
//     if (i3 * factor < sphereOriginalArray.length) {
//       sphereNewArray[i3 + 0] = sphereOriginalArray[i3 * factor + 0];
//       sphereNewArray[i3 + 1] = sphereOriginalArray[i3 * factor + 1];
//       sphereNewArray[i3 + 2] = sphereOriginalArray[i3 * factor + 2];
//     } else {
//       const randomIndex = Math.floor(spherePosition.count * Math.random()) * 3;
//       sphereNewArray[i3 + 0] = sphereOriginalArray[randomIndex + 0];
//       sphereNewArray[i3 + 1] = sphereOriginalArray[randomIndex + 1];
//       sphereNewArray[i3 + 2] = sphereOriginalArray[randomIndex + 2];
//     }
//   }

//   particles.positions.push(new THREE.Float32BufferAttribute(sphereNewArray, 3));
//   const spherePositionsArray = particles.positions[0].array;

//   const sphereFinalArray = Array.from(
//     { length: spherePositionsArray.length / 3 },
//     (v, k) => k + 1
//   ).map((num) => {
//     const randomOffset = randomsArray[num] * 2;
//     const x = spherePositionsArray[num * 3 + 0] + randomOffset;
//     const y = spherePositionsArray[num * 3 + 1] + randomOffset;
//     const z = spherePositionsArray[num * 3 + 2] + randomOffset;

//     return {
//       idx: num,
//       position: [x, y, z],
//     };
//   });

//   //   console.log(sphereFinalArray);

//   // SPHERE END

//   // LOGO START

//   const logoModel = logoGeometry;

//   const logoPosition = logoModel.scene.children[0].geometry.attributes.position;

//   const logoOriginalArray = logoPosition.array;
//   const logoNewArray = new Float32Array(particles.maxCount * 3);

//   for (let i = 0; i < particles.maxCount; i++) {
//     const i3 = i * 3;
//     if (i3 * factor < logoOriginalArray.length) {
//       logoNewArray[i3 + 0] = logoOriginalArray[i3 * factor + 0] / 10;
//       logoNewArray[i3 + 1] = logoOriginalArray[i3 * factor + 1] / 10;
//       logoNewArray[i3 + 2] = logoOriginalArray[i3 * factor + 2] / 10;
//     } else {
//       const randomIndex = Math.floor(logoPosition.count * Math.random()) * 3;
//       logoNewArray[i3 + 0] = logoOriginalArray[randomIndex + 0] / 10;
//       logoNewArray[i3 + 1] = logoOriginalArray[randomIndex + 1] / 10;
//       logoNewArray[i3 + 2] = logoOriginalArray[randomIndex + 2] / 10;
//     }
//   }

//   particles.positions.push(new THREE.Float32BufferAttribute(logoNewArray, 3));
//   const logoPositionsArray = particles.positions[1].array;

//   const logoFinalArray = Array.from(
//     { length: logoPositionsArray.length / 3 },
//     (v, k) => k + 1
//   ).map((num) => {
//     const randomOffset = randomsArray[num] * 0;
//     const x = logoPositionsArray[num * 3 + 0] + randomOffset;
//     const y = logoPositionsArray[num * 3 + 1] + randomOffset;
//     const z = logoPositionsArray[num * 3 + 2] + randomOffset;

//     return {
//       idx: num,
//       position: [x, y, z],
//     };
//   });

//   // LOGO END

//   // State to keep track of the current shape
//   const [currentShape, setCurrentShape] = useState("sphere");
//   const [transitionProgress, setTransitionProgress] = useState(0);

//   // Function to morph between shapes
//   const morphShape = () => {
//     gsap.to(particles.material.uniforms.uProgress, {
//       value: currentShape === "sphere" ? 1 : 0,
//       duration: 3,
//       onComplete: () => {
//         setCurrentShape(currentShape === "sphere" ? "logo" : "sphere");
//         // setTransitionProgress(currentShape === "sphere" ? 1 : 0);
//       },
//     });
//   };

//   // Geometry
//   particles.geometry = new THREE.BufferGeometry();
//   particles.geometry.setAttribute("position", particles.positions[0]);
//   particles.geometry.setAttribute(
//     "aPositionTarget",
//     particles.positions[currentShape === "sphere" ? 1 : 0]
//   );
//   particles.geometry.setAttribute(
//     "aSize",
//     new THREE.BufferAttribute(randomsArray, 1)
//   );

// // Material
// particles.colorA = "#ff2876";
// particles.colorB = "#ffffff";
// particles.material = new THREE.ShaderMaterial({
//   vertexShader: particleVertex,
//   fragmentShader: particleFragment,
//   uniforms: {
//     uSize: { value: 1 },
//     uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//     uProgress: { value: transitionProgress }, // Updated initialization
//     uColorA: { value: new THREE.Color(particles.colorA) },
//     uColorB: { value: new THREE.Color(particles.colorB) },
//   },
//   blending: THREE.AdditiveBlending,
//   depthWrite: false,
// });

// // ...

//   // Points
//   particles.points = new THREE.Points(particles.geometry, particles.material);

//   return (
//     <div className={styles.container}>
//       <Canvas className={styles.canvas} style={{ height: "100vh" }}>
//         {/* <CameraController /> */}
//         <OrbitControls />
//         <primitive object={particles.points} />
//         <ParticleAnimator particles={particles} transitionProgress={transitionProgress} />
//       </Canvas>
//       <button
//         style={{ position: "fixed", top: 0, left: 0, margin: "2vh" }}
//         onClick={morphShape}
//       >
//         Morph
//       </button>
//     </div>
//   );
// };

// const ParticleAnimator = ({ particles, transitionProgress }) => {
//     useFrame(() => {
//       particles.material.uniforms.uProgress.value = transitionProgress;
//     });

//     return null; // This component doesn't render anything
//   };

// ... (CameraController and PointLogo components remain the same)

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LogoParticles.module.css";
import {
  OrbitControls,
  PerspectiveCamera,
  PointMaterial,
  shaderMaterial,
  Sphere,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import particleVertex from "../shaders/particles/vertex.glsl?raw";
import particleFragment from "../shaders/particles/fragment.glsl?raw";
import gsap from "gsap";

const Morphing = () => {
  let particles = {};

  const logoGeometry = useGLTF("/models/mid_poly.glb");

  console.log(logoGeometry);

  const factor = 2;

  const cameraPosition = [
    -0.3277834258804101, 2.3106249609219893, 1.0880734148165658,
  ];

  particles.maxCount =
    logoGeometry.scene.children[0].geometry.attributes.position.count / factor;

  particles.positions = [];

  const randomsArray = new Float32Array(particles.maxCount);

  for (let i = 0; i < particles.maxCount; i++) {
    randomsArray[i] = Math.random();
  }

  // SPHERE START

  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

  const sphereModel = sphereGeometry;

  sphereGeometry.rotateX(Math.PI / 2);

  const spherePosition = sphereModel.attributes.position;

  const sphereOriginalArray = spherePosition.array;
  const sphereNewArray = new Float32Array(particles.maxCount * 3);

  for (let i = 0; i < particles.maxCount; i++) {
    const i3 = i * 3;
    if (i3 * factor < sphereOriginalArray.length) {
      sphereNewArray[i3 + 0] = sphereOriginalArray[i3 * factor + 0] + randomsArray[i+0];
      sphereNewArray[i3 + 1] = sphereOriginalArray[i3 * factor + 1] + randomsArray[i+1];
      sphereNewArray[i3 + 2] = sphereOriginalArray[i3 * factor + 2] + randomsArray[i+2];
    } else {
      const randomIndex = Math.floor(spherePosition.count * Math.random()) * 3;
      sphereNewArray[i3 + 0] = sphereOriginalArray[randomIndex + 0] + randomsArray[randomIndex+0];
      sphereNewArray[i3 + 1] = sphereOriginalArray[randomIndex + 1] + randomsArray[randomIndex+1];
      sphereNewArray[i3 + 2] = sphereOriginalArray[randomIndex + 2] + randomsArray[randomIndex+2];
    }
  }

  particles.positions.push(new THREE.Float32BufferAttribute(sphereNewArray, 3));
  const spherePositionsArray = particles.positions[0].array;

  const sphereFinalArray = Array.from(
    { length: spherePositionsArray.length / 3 },
    (v, k) => k + 1
  ).map((num) => {
    const randomOffset = randomsArray[num] * 2;
    const x = spherePositionsArray[num * 3 + 0] + randomOffset;
    const y = spherePositionsArray[num * 3 + 1] + randomOffset;
    const z = spherePositionsArray[num * 3 + 2] + randomOffset;

    return {
      idx: num,
      position: [x, y, z],
    };
  });

  //   console.log(sphereFinalArray);

  // SPHERE END

  // LOGO START

  const logoModel = logoGeometry;

  const logoPosition = logoModel.scene.children[0].geometry.attributes.position;

  const logoOriginalArray = logoPosition.array;
  const logoNewArray = new Float32Array(particles.maxCount * 3);

  for (let i = 0; i < particles.maxCount; i++) {
    const i3 = i * 3;
    if (i3 * factor < logoOriginalArray.length) {
      logoNewArray[i3 + 0] = logoOriginalArray[i3 * factor + 0] / 10 + randomsArray[i+0] * 0.1;
      logoNewArray[i3 + 1] = logoOriginalArray[i3 * factor + 1] / 10 + randomsArray[i+1] * 0.1;
      logoNewArray[i3 + 2] = logoOriginalArray[i3 * factor + 2] / 10 + randomsArray[i+2] * 0.1;
    } else {
      const randomIndex = Math.floor(logoPosition.count * Math.random()) * 3;
      logoNewArray[i3 + 0] = logoOriginalArray[randomIndex + 0] / 10 + randomsArray[randomIndex + 0] * 0.1;
      logoNewArray[i3 + 1] = logoOriginalArray[randomIndex + 1] / 10 + randomsArray[randomIndex + 1] * 0.1;
      logoNewArray[i3 + 2] = logoOriginalArray[randomIndex + 2] / 10 + randomsArray[randomIndex + 2] * 0.1;
    }
  }

  particles.positions.push(new THREE.Float32BufferAttribute(logoNewArray, 3));
  const logoPositionsArray = particles.positions[1].array;

  const logoFinalArray = Array.from(
    { length: logoPositionsArray.length / 3 },
    (v, k) => k + 1
  ).map((num) => {
    const randomOffset = randomsArray[num] * 1;
    const x = logoPositionsArray[num * 3 + 0] + randomOffset;
    const y = logoPositionsArray[num * 3 + 1] + randomOffset;
    const z = logoPositionsArray[num * 3 + 2] + randomOffset;

    return {
      idx: num,
      position: [x, y, z],
    };
  });

  // LOGO END

  // State to keep track of the current shape
  const [currentShape, setCurrentShape] = useState("sphere");
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Function to morph between shapes
  const morphShape = () => {
    if (particles.material.uniforms.uProgress.value === 0) {
      gsap.to(particles.material.uniforms.uProgress, {
        value: 1,
        duration: 3,
        ease: "power3.out"
      });
    }else{
        gsap.to(particles.material.uniforms.uProgress, {
            value: 0,
            duration: 5,
        ease: "power3.out"

          });
    }
  };

  // Geometry
  particles.geometry = new THREE.BufferGeometry();
  particles.geometry.setAttribute("position", particles.positions[0]);
  particles.geometry.setAttribute("aPositionTarget", particles.positions[1]);
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
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
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
    <div className={styles.container}>
      <Canvas className={styles.canvas} style={{ height: "100vh" }}>
        <CameraController />
        {/* <OrbitControls /> */}
        <primitive object={particles.points} />
        {/* <ParticleAnimator particles={particles} transitionProgress={transitionProgress} /> */}
      </Canvas>
      <button
        style={{ position: "fixed", top: 0, left: 0, margin: "2vh" }}
        onClick={morphShape}
      >
        Morph
      </button>
      <h1 style={{ position: "fixed",  top: 0, left: 0, height: "100%", fontFamily: "Clash Display", width: "100%", color: "white", textAlign: "center", marginTop: "28vh", fontSize: "16vh", fontWeight: "400"}}>Revolutionizing <br /> Education</h1>
    </div>
  );
};

const ParticleAnimator = ({ particles, transitionProgress }) => {
  useFrame(() => {
    particles.material.uniforms.uProgress.value = transitionProgress;
  });

  return null; // This component doesn't render anything
};

// ... (CameraController and PointLogo components remain the same)

const CameraController = () => {
  const { camera, gl } = useThree();
  const cameraRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  // Set the initial camera position and rotation
  const initialCameraPosition = [
    -0.51060626732999, 2.5653556496200776, 1.1138060000393188,
  ];
  const initialCameraRotation = [
    -1.093226314496774, -0.1496363633338818, -0.28046697307679486,
  ];

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      mouseRef.current.y =
        -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gl.domElement]);

  useFrame(() => {
    const { x, y } = mouseRef.current;
    const maxRotation = 2 * (Math.PI / 180); // 1 degree in radians

    // Update camera rotation based on mouse movement, limited to 1 degree
    const deltaX = x * 0.005;
    const deltaY = y * 0.005;
    rotationRef.current.x += deltaY;
    rotationRef.current.y += deltaX;
    rotationRef.current.x = Math.max(
      -maxRotation,
      Math.min(maxRotation, rotationRef.current.x)
    );
    rotationRef.current.y = Math.max(
      -maxRotation,
      Math.min(maxRotation, rotationRef.current.y)
    );
    camera.rotation.x = initialCameraRotation[0] + rotationRef.current.x;
    camera.rotation.y = initialCameraRotation[1] + rotationRef.current.y;

    // Set initial camera position
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={initialCameraPosition}
      rotation={initialCameraRotation}
      makeDefault
      fov={75}
    />
  );
};

const PointLogo = ({ finalArray, randomsArray }) => {
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {finalArray.map((point, index) => (
        <Point
          key={point.idx}
          position={point.position}
          size={randomsArray[index]}
        />
      ))}
    </group>
  );
};

const Point = ({ position, size }) => {
  const ParticleMaterial = shaderMaterial(
    {
      uSize: 1,
      uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      uProgress: 0, // Update for animation (see useFrame)
      uColorA: new THREE.Color("#ff2876"),
      uColorB: new THREE.Color("#ffffff"),
    },
    particleVertex,
    particleFragment
  );

  extend({ ParticleMaterial });

  return (
    <Sphere position={position} args={[0.01 * size, 10, 10]}>
      {/* <mesh position={position} geometry={geometry}> */}

      {/* <meshBasicMaterial color={"#ff2876"} /> */}
      <particleMaterial />
      {/* </mesh> */}
    </Sphere>
  );
};

export default Morphing;
