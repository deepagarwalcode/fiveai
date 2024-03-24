"use client";

import React, { useEffect, useMemo, useRef, useState, Suspense, useLayoutEffect } from "react";
import styles from "./Neurons.module.css";
import {
  OrbitControls,
  PointMaterial,
  shaderMaterial,
  Sphere,
  useGLTF,
  useScroll,
  ScrollControls,
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
import flyThroughState from "../lib/fly-through.json"
import ScrollTrigger from "gsap/ScrollTrigger";

const Neurons = () => {

  const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene");

  let particles = {};

  const neuronGeometry = useGLTF("/models/system.glb");

  // console.log(neuronGeometry);

  const factor = 1;

  const cameraPosition = [
    -0.3277834258804101, 2.3106249609219893, 1.0880734148165658,
  ];

  particles.maxCount =
    neuronGeometry.scene.children[0].geometry.attributes.position.count /
    factor;

  particles.positions = [];

  const randomsArray = new Float32Array(particles.maxCount);

  for (let i = 0; i < particles.maxCount; i++) {
    randomsArray[i] = Math.random();
  }

  // NEURON START

  const neuronModel = neuronGeometry;

  const neuronPosition =
    neuronModel.scene.children[0].geometry.attributes.position;

  const neuronOriginalArray = neuronPosition.array;
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

  // Material
  constSphereParticles.colorA = "#ffffff";
  constSphereParticles.colorB = "#ffffff";
  constSphereParticles.material = new THREE.ShaderMaterial({
    vertexShader: particleVertex,
    fragmentShader: particleFragment,
    uniforms: {
      uSize: { value: 1 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
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

  const containerRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollDisperse2 = () => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${window.innerHeight * 3} bottom`,
          markers: true,
          onEnter: () => {
            gsap.fromTo(containerRef.current,{
              opacity: 0,
            }, {
              opacity: 1,
              duration: 2,
              delay: 2
            })

          },
          onLeaveBack: () => {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 2
            })
          }
        },
        // value: 0,
      });
    };

    scrollDisperse2();
  }, []);

  return (
    <Suspense fallback={null}>

      <div className={styles.container} ref={containerRef}>
        <Canvas
          className={styles.canvas}
          style={{ height: "100vh" }}
          gl={{ preserveDrawingBuffer: true }}
        >

          <ScrollControls damping={1} maxSpeed={1} pages={10}>
            <SheetProvider sheet={sheet}>
              <Scene
                neuronParticles={particles.points}
                bgParticles={constSphereParticles.points}
              />
            </SheetProvider>
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

  return (
    <>
      <primitive object={neuronParticles} />
      <primitive object={bgParticles} />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={75}
        near={0.1}
        far={100}
      />
    </>
  );
};
