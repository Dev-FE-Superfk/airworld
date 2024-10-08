'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Popup from '../Popup/page'; 
import './city.scss';

const City = () => {
  const mountRef = useRef(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  useEffect(() => {
    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true; // Enable shadow maps
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: Set shadow map type

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048; // Optional: Set shadow map resolution
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5; // Optional: Adjust shadow camera settings
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20; // Adjust the left boundary of the shadow camera
    directionalLight.shadow.camera.right = 20; // Adjust the right boundary of the shadow camera
    directionalLight.shadow.camera.top = 20; // Adjust the top boundary of the shadow camera
    directionalLight.shadow.camera.bottom = -20; // Adjust the bottom boundary of the shadow camera
    directionalLight.shadow.bias = -0.001; // Optional: Adjust bias to avoid shadow artifacts
    scene.add(directionalLight);

    const mixers = []; // Array to store animation mixers

    // Load GLTF Models
    const loader = new GLTFLoader();
    const buildingFiles = [
        { file: '/models/Sirine_Building_w_animation.glb', name: 'Sirine Building' },
        { file: '/models/Nike_Building.glb', name: 'Nike Building' },
        { file: '/models/BMW_Building.glb', name: 'BMW Building' },
        { file: '/models/Uniqlo_Building.glb', name: 'Uniqlo Building' },
        { file: '/models/Bag_Store_Building.glb', name: 'Bag Store Building' },
        { file: '/models/Bank_Building.glb', name: 'Bank Building' },
        { file: '/models/Clocksmith_Building.glb', name: 'Clocksmith Building' },
        { file: '/models/General_Building.glb', name: 'General Building' },
        { file: '/models/Tape_Building.glb', name: 'Tape Building' },
      ];
  
      // Add Buildings with Different Textures and Positions
      const buildingPositions = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
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
    
          if (buildingData.file === '/models/Sirine_Building_w_animation.glb') {
            const mixer = new THREE.AnimationMixer(building);
            gltf.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
            mixers.push(mixer);
          }
    
          building.position.set(buildingPositions[index].x, buildingPositions[index].y, buildingPositions[index].z);
          building.userData = { name: buildingData.name };
          scene.add(building);
        });
      });

    const airbaloonFiles = [
      '/models/Ballon_A_Animate.glb',
      '/models/Ballon_B_Animate.glb',
      '/models/Ballon_C_Animate.glb',
    ];

    const airbaloonPositions = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ];

    airbaloonFiles.forEach((file, index) => {
        loader.load(file, (gltf) => {
            const airbaloon = gltf.scene;
            airbaloon.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true; // Ensure the airbaloon casts shadows
                node.receiveShadow = true; // Ensure the airbaloon receives shadows
            }
            });

            // Create a mixer for the animation
            const mixer = new THREE.AnimationMixer(airbaloon);
            gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
            });
            mixers.push(mixer);

            airbaloon.position.set(airbaloonPositions[index].x, airbaloonPositions[index].y, airbaloonPositions[index].z);
            scene.add(airbaloon);
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

    // Add mascot
    let mascot;
    loader.load('/models/Air_Citizen_Flying.glb', (gltf) => {
      mascot = gltf.scene;
      mascot.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true; // Ensure the mascot casts shadows
          node.receiveShadow = true; // Ensure the mascot receives shadows
        }
      });
      scene.add(mascot);
    });

    camera.position.set(0, 5, 10); // Initial camera position

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: Adds a slight delay to the controls
    controls.dampingFactor = 0.25; // Optional: Sets the damping factor
    controls.enableZoom = true; // Optional: Enables zooming
    controls.minPolarAngle = Math.PI / 4; // Minimum angle to look down
    controls.maxPolarAngle = Math.PI / 2; // Maximum angle to look up (down to the horizon)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Initialize raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector3();

    // Add event listener for click
    const handleClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld);
        raycaster.ray.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(raycaster.ray.origin).normalize();

        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject.parent && intersectedObject.parent.userData) {
                setSelectedBuilding(intersectedObject.parent.userData.name);
            }
        }
    };

        window.addEventListener('click', handleClick);

    // Define waypoints
    const waypoints = [
      new THREE.Vector3(0, 3.5, 0),
      new THREE.Vector3(5, 3.5, 5),
      new THREE.Vector3(-5, 3.5, 5),
      new THREE.Vector3(-5, 3.5, -6),
      new THREE.Vector3(5, 3.5, -5),
      new THREE.Vector3(0, 3.5, 0),
    ];

    // Create a CatmullRom curve from waypoints
    const curve = new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.5);

    let currentT = 0; // Parameter for interpolation along the curve
    const duration = 15000; // Duration for the entire loop in milliseconds (adjusted to slow down)
    const speed = 1 / (duration / 16); // Speed of movement, adjust as needed

    // Clock for animation
    const clock = new THREE.Clock();

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (mascot) {
        // Update parameter along the curve
        currentT += speed; // Increment by a small step

        // Loop back to start
        if (currentT > 1) {
          currentT = 0;
        }

        // Get position on the curve
        const position = curve.getPointAt(currentT);
        mascot.position.copy(position);

        // Calculate direction to next point on the curve
        const nextPosition = curve.getPointAt((currentT + 0.01) % 1);
        const direction = new THREE.Vector3().subVectors(nextPosition, mascot.position).normalize();

        // Calculate rotation from direction
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
        mascot.quaternion.slerp(targetQuaternion, 0.1); // Smooth rotation
      }

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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      // Clean up resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

    return (
        <>
            <div ref={mountRef}></div>
            {selectedBuilding && (
            <Popup buildingName={selectedBuilding} onClose={() => setSelectedBuilding(null)}/>
            )}
        </>
    );
};

export default City;
