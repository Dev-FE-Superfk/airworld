'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const City = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Focal Length to Field of View
    const focalLength = 50; // in mm
    const sensorHeight = 36; // Full-frame sensor height in mm
    const fov = 2 * Math.atan((sensorHeight / 2) / focalLength) * (180 / Math.PI);

    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true; // Enable shadow maps
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: Set shadow map type

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const mixers = []; // Array to store animation mixers

    // Load GLTF Models
    const loader = new GLTFLoader();
    const buildingFiles = [
      { file: '/models/Sirine_Building_emmision.glb', category: 'building', name: '', position: { x: 0, y: 0, z: 0 }, masthead: '', description: '', thumbnails: [], tags: [] },
      { file: '/models/Apple_Building.glb', category: 'building', name: 'Apple', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_apple.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
    ];
  
    buildingFiles.forEach((buildingData, index) => {
      loader.load(buildingData.file, (gltf) => {
        const building = gltf.scene;
        building.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
  
        if (buildingData.file === '/models/Sirine_Building_emmision.glb') {
          const mixer = new THREE.AnimationMixer(building);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          mixers.push(mixer);
        }

        building.position.set(buildingData.position.x, buildingData.position.y, buildingData.position.z);
        building.userData = { name: buildingData.name, masthead: buildingData.masthead, description: buildingData.description, thumbnails: buildingData.thumbnails, tags: buildingData.tags };
        scene.add(building);
      });
    });

    // Add road
    loader.load('/models/Jalan.glb', (gltf) => {
      const road = gltf.scene;
      road.traverse((node) => {
        if (node.isMesh) {
          node.receiveShadow = true; // Ensure the road receives shadows
        }
      });
      road.position.set(0, 0, 0); // Adjust position as needed
      scene.add(road);
    });

    // Add ground plane to receive shadows
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    camera.position.set(0, 10, 20); // Initial camera position

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.minDistance = 20; // Jarak minimum zoom
    controls.maxDistance = 50; // Jarak maksimum zoom
    controls.minPolarAngle = Math.PI / 4; // Minimum angle to look down
    controls.maxPolarAngle = Math.PI / 2; // Maximum angle to look up

    // Clock for animation
    const clock = new THREE.Clock();

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Clean up resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

    return (
        <>
            <div ref={mountRef}></div>
        </>
    );
};

export default City;
