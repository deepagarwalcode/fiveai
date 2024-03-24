"use client";

import React, { useEffect, useMemo } from "react";
import styles from "./LogoParticles.module.css";
import {
  OrbitControls,
  PointMaterial,
  shaderMaterial,
  Sphere,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import particleVertex from "../shaders/particles/vertex.glsl";
import particleFragment from "../shaders/particles/fragment.glsl";

const Neurons = () => {
  // const model = useLoader(GLTFLoader, '/models/five-3d-logo.glb');
  // console.log(model)
  let particles = {};

  // const ParticleShaderMaterial = shaderMaterial(
  //   {
  //     uSize: new THREE.Uniform(1),
  //     uResolution: new THREE.Uniform(
  //       new THREE.Vector2(window.innerWidth, window.innerHeight)
  //     ),
  //     uProgress: new THREE.Uniform(0), // Update for animation (see useFrame)
  //     uColorA: new THREE.Uniform(new THREE.Color("#ffffff")),
  //     uColorB: new THREE.Uniform(new THREE.Color("#ffffff")),
  //   },
  //   particleVertex,
  //   particleFragment
  // );

  // declaratively
  // extend({ ParticleShaderMaterial });

  const model = useGLTF("/models/system.glb");
  // const model = useGLTF("/models/mid_poly.glb");
  // const model = useGLTF("/models/five-3d-logo.glb");
  // const model = useGLTF('/models/neuron_final_copy.glb')
  // console.log(model.scene);
  // const scale = 1;
  // model.scene.rotation.x = Math.PI / 2;
  // model.scene.position.y = -1 * scale;

  console.log(model.scene);

  const factor = 2

  particles.maxCount =
    model.scene.children[5].geometry.attributes.position.count/factor;

  // console.log(particles.maxCount)

  const position = model.scene.children[5].geometry.attributes.position;

  const sizesArray = new Float32Array(particles.maxCount);

  for (let i = 0; i < particles.maxCount; i++) {
    sizesArray[i] = Math.random();
  }

  particles.positions = [];

  const originalArray = position.array;
  const newArray = new Float32Array(particles.maxCount * 3);

  for (let i = 0; i < particles.maxCount; i++) {
    const i3 = i * 3;
    if (i3*factor < originalArray.length) {
      newArray[i3 + 0] = originalArray[i3*factor + 0] / 10;
      newArray[i3 + 1] = originalArray[i3*factor + 1] / 10;
      newArray[i3 + 2] = originalArray[i3*factor + 2] / 10;
    } else {
      const randomIndex = Math.floor(position.count * Math.random()) * 3;
      newArray[i3 + 0] = originalArray[randomIndex + 0] / 10;
      newArray[i3 + 1] = originalArray[randomIndex + 1] / 10;
      newArray[i3 + 2] = originalArray[randomIndex + 2] / 10;
    }
  }

  particles.positions.push(new THREE.Float32BufferAttribute(newArray, 3));
  const positionsArray = particles.positions[0].array;

  particles.geometry = new THREE.BufferGeometry();
  particles.geometry.setAttribute("position", particles.positions);

  // particles.material = new THREE.ShaderMaterial({
  //   blending: THREE.AdditiveBlending,
  //   depthWrite: false,
  // });

  particles.points = new THREE.Points(particles.geometry, particles.material);

  // console.log(positionsArray);

  const finalArray = Array.from(
    { length: positionsArray.length / 3 },
    (v, k) => k + 1
  ).map((num) => {
    const randomOffset = sizesArray[num] * 0;
    const x = positionsArray[num * 3 + 0] + randomOffset;
    const y = positionsArray[num * 3 + 1] + randomOffset;
    const z = positionsArray[num * 3 + 2] + randomOffset;

    return {
      idx: num,
      position: [x, y, z],
    };
  });

  // console.log(finalArray);

  // console.log(particles.points);

  // console.log(particles.positions)
  if (model?.scene)
    return (
      <div className={styles.container}>
        <Canvas
          className={styles.canvas}
          style={{ height: "100vh" }}
        >
          <directionalLight />
          {/* <pointLight position={[-30, 0, -30]} power={10.0} /> */}
          <OrbitControls />

          <PointLogo finalArray={finalArray} sizesArray={sizesArray} />
          {/* <PointLogo finalArray={finalArray} sizesArray={sizesArray} /> */}
          {/* <PointLogo finalArray={finalArray} sizesArray={sizesArray} /> */}
        </Canvas>
      </div>
    );
};

const PointLogo = ({ finalArray, sizesArray  }) => {
  // console.log(pointsInner);

  return (
    <group>
      {finalArray.map((point, index) => (
        <Point key={point.idx} position={point.position} size={sizesArray[index]} />
      ))}
    </group>
  );
};

const Point = ({ position, size }) => {
  const ParticleMaterial = shaderMaterial({
    uSize: 1,
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    uProgress: 0, // Update for animation (see useFrame)
    uColorA: new THREE.Color("#ff2876"),
    uColorB: new THREE.Color("#ffffff"),
  },
  particleVertex,
  particleFragment
  );

  extend({ParticleMaterial})

  const segments = 12; // Adjust for smoothness
  const radius = 0.02; // Adjust size as needed

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = 0; i <= segments; i++) {
    const theta = Math.PI * 2 * (i / segments);
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    vertices.push(x, y, 0); // Assuming flat circle (z = 0)
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  return (
    <Sphere position={position} args={[0.2*size, 10, 10]}>
    {/* <mesh position={position} geometry={geometry}> */}
      {/* <meshStandardMaterial
        emissive={"white"}
        emissiveIntensity={0.5}
        roughness={1}
        color={"white"}
      >
      </meshStandardMaterial> */}
      {/* <PointMaterial /> */}
      <meshBasicMaterial color={"#ff2876"}/>

      {/* <shaderMaterial
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={{
          uSize: new THREE.Uniform(1),
          uResolution: new THREE.Uniform(
            new THREE.Vector2(window.innerWidth, window.innerHeight)
          ),
          uProgress: new THREE.Uniform(0), // Update for animation (see useFrame)
          uColorA: new THREE.Uniform(new THREE.Color("#ff1045")),
          uColorB: new THREE.Uniform(new THREE.Color("#ffffff")),
        }}
      /> */}
      {/* <particleMaterial /> */}
    {/* </mesh> */}

     </Sphere>
  );
};

export default Neurons;
