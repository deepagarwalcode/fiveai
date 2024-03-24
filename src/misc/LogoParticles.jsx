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
import particleVertex from "../shaders/particles/vertex.glsl";
import particleFragment from "../shaders/particles/fragment.glsl";

const LogoParticles = () => {
  let particles = {};



  const model = useGLTF("/models/mid_poly.glb");

  console.log(model.scene);

  const factor = 2;

  particles.maxCount =
    model.scene.children[0].geometry.attributes.position.count / factor;

  const position = model.scene.children[0].geometry.attributes.position;

  const sizesArray = new Float32Array(particles.maxCount);

  for (let i = 0; i < particles.maxCount; i++) {
    sizesArray[i] = Math.random();
  }

  particles.positions = [];

  const originalArray = position.array;
  const newArray = new Float32Array(particles.maxCount * 3);

  for (let i = 0; i < particles.maxCount; i++) {
    const i3 = i * 3;
    const randomnessOffset = 0.1;
    if (i3 * factor < originalArray.length) {
      newArray[i3 + 0] =
        originalArray[i3 * factor + 0] / 10 + sizesArray[i] * randomnessOffset;
      newArray[i3 + 1] =
        originalArray[i3 * factor + 1] / 10 + sizesArray[i] * randomnessOffset;
      newArray[i3 + 2] =
        originalArray[i3 * factor + 2] / 10 + sizesArray[i] * randomnessOffset;
    } else {
      const randomIndex = Math.floor(position.count * Math.random()) * 3;
      newArray[i3 + 0] =
        originalArray[randomIndex + 0] / 10 +
        sizesArray[randomIndex] * randomnessOffset;
      newArray[i3 + 1] =
        originalArray[randomIndex + 1] / 10 +
        sizesArray[randomIndex] * randomnessOffset;
      newArray[i3 + 2] =
        originalArray[randomIndex + 2] / 10 +
        sizesArray[randomIndex] * randomnessOffset;
    }
  }

  particles.positions.push(new THREE.Float32BufferAttribute(newArray, 3));
  const positionsArray = particles.positions[0].array;

  particles.geometry = new THREE.BufferGeometry();
  particles.geometry.setAttribute("position", particles.positions);

  particles.points = new THREE.Points(particles.geometry, particles.material);

  const finalArray = Array.from(
    { length: positionsArray.length / 3 },
    (v, k) => k + 1
  ).map((num) => {
    const x = positionsArray[num * 3 + 0];
    const y = positionsArray[num * 3 + 1];
    const z = positionsArray[num * 3 + 2];

    return {
      idx: num,
      position: [x, y, z],
    };
  });

  const cameraPosition = [
    -0.3277834258804101, 2.3106249609219893, 1.0880734148165658,
  ];


  if (model?.scene)
    return (
      <div className={styles.container}>
        <Canvas className={styles.canvas} style={{ height: "100vh" }}>
          {/* <CameraPositionLogger /> */}
          {/* <PerspectiveCamera
          fov={75}
          position={cameraPosition} // Set the default camera rotation
          makeDefault // Make this camera the default
        /> */}
          <CameraController />
          {/* <OrbitControls /> */}
          <PointLogo finalArray={finalArray} sizesArray={sizesArray} />
        </Canvas>
      </div>
    );
};

const CameraPositionLogger = () => {
  const { camera } = useThree();
  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.addEventListener('change', () => {
        console.log('Camera Position:', camera.position);
      });
    }
  }, [camera]);

  return <OrbitControls ref={cameraRef} />;
};


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
    const maxRotation = 1 * (Math.PI / 180); // 1 degree in radians

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

// const CameraController = () => {
//   const { camera, gl } = useThree();
//   const cameraRef = useRef();
//   const mousePosRef = useRef({ x: 0, y: 0 });

//   // Set the initial camera position and rotation
//   const initialCameraPosition = [-0.51060626732999, 2.5653556496200776, 1.1138060000393188];
//   const initialCameraRotation = [-1.093226314496774, -0.1496363633338818, -0.28046697307679486];

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       mousePosRef.current = {
//         x: (event.clientX / gl.domElement.clientWidth) * 2 - 1,
//         y: -(event.clientY / gl.domElement.clientHeight) * 2 + 1,
//       };
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [gl.domElement]);

//   useFrame(() => {
//     const { x, y } = mousePosRef.current;
//     camera.position.x = initialCameraPosition[0] + x * 0.1;
//     camera.position.y = initialCameraPosition[1] + y * 0.1;
//     camera.position.z = initialCameraPosition[2];
//     camera.rotation.set(...initialCameraRotation);
//   });

//   return <PerspectiveCamera ref={cameraRef} makeDefault fov={75} />;
// };

const PointLogo = ({ finalArray, sizesArray }) => {
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {finalArray.map((point, index) => (
        <Point
          key={point.idx}
          position={point.position}
          size={sizesArray[index]}
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

export default LogoParticles;
