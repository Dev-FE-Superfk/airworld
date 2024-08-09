'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Popup from '@/components/Popup/page'
import './city.scss';

const City = () => {
  const mountRef = useRef(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

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
      { file: '/models/Sirine_Building_emmision.glb', category: 'sirine', name: '', position: { x: 0, y: 0, z: 0 }, masthead: '', description: '', thumbnails: [], tags: [] },
      { file: '/models/Apple_Building.glb', category: 'brands', name: 'Apple', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_apple.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
      { file: '/models/BMW_Building.glb', category: 'brands', name: 'BMW', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_bmw.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
      { file: '/models/Nike_Building.glb', category: 'brands', name: 'Nike', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_nike.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
      { file: '/models/Uniqlo_Building.glb', category: 'brands', name: 'Uniqlo', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_uniqlo.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
      { file: '/models/Cocacola_Building.glb', category: 'brands', name: 'Coca Cola', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_cocacola.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
      { file: '/models/Nintendo_Building.glb', category: 'brands', name: 'Nintendo', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_nintendo.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
      { file: '/models/Swatch_Building.glb', category: 'brands', name: 'Swatch', position: { x: 0, y: 0, z: 0 }, masthead: '/images/masthead_swatch.png', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure iusto aut nesciunt tempore impedit quisquam, obcaecati qui et molestias architecto deserunt unde alias incidunt exercitationem omnis repellendus deleniti laudantium sapiente', thumbnails: ['/images/thumbs.png', '/images/thumbs.png', '/images/thumbs.png'], tags: ['User Interface', 'Data Analytics', 'System Integration', 'User Dashboard', 'Multi Plafroem Access', 'Loc-Based System', 'Website'] },
      { file: '/models/Ballon_A_Animate.glb', category: 'balloon', position: { x: 0, y: 0, z: 0 }, image: '/images/mc_gamer.png', subclass: 'airworld', title: '<h3>Air World<span>TM</span></h3>', description: '<p>is a proprietary O2O social gaming network build upon the infrastructure of WEB2.0 / 3.0 Metaverse that allows users to play, learn, earn, entertain and socialize with strangers within the global community and people they know IRL.</p>' },  
      { file: '/models/Ballon_C_Animate.glb', category: 'balloon', position: { x: 0, y: 0, z: 0 }, image: '/images/mc_deer.png', subclass: 'airverse', title: '<h3>Air Verse<span>TM</span></h3>', description: '<p>[ Metaverse-as-a-Service ]  is an immersive infrastructure that enable a wide range of industries - from retail, F&B and real estate to education and entertainment - to harness the potential of interactive virtual experiences and actionable insights  to grow their revenue without the heavy investment in infrastructure and development expertise typically required.</p>' },  
      { file: '/models/Ballon_B_Animate.glb', category: 'balloon', position: { x: 0, y: 0, z: 0 }, image: '/images/mc_rabbit.png', subclass: 'anywhere', title: '<h3>Anywhere<span>TM</span></h3>', description: '<p>is the First Decentralized Location Based Social-Fi + DEPIN Data Network.</p><p>Our ANIWHERETM Social Platform provides users with the chance to connect with friends based on their physical locations. Users can adopt purely virtual identities and role-play as different characters through customizable avatars.</p><p>Our community can also engage in interactive quests created by other users and business partners such as retailers, shopping malls, hotels, and restaurants. These quests can be<ul><li>Simply as check-In</li><li>Funny gameplays</li><li>Make a purchase in a shop</li></ul></p>' },  
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
    
          const mixer = new THREE.AnimationMixer(building);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          mixers.push(mixer);

          building.position.set(buildingData.position.x, buildingData.position.y, buildingData.position.z);
          building.userData = { category: buildingData.category, subclass: buildingData.subclass, name: buildingData.name, masthead: buildingData.masthead, description: buildingData.description, thumbnails: buildingData.thumbnails, tags: buildingData.tags, image: buildingData.image, title: buildingData.title };
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

    // Load and set up the skybox from individual images
    const skyboxLoader = new THREE.CubeTextureLoader();
    const textureCube = skyboxLoader.load([
      '/textures/skybox/px.png', // Positive X
      '/textures/skybox/nx.png', // Negative X
      '/textures/skybox/py.png', // Positive Y
      '/textures/skybox/ny.png', // Negative Y
      '/textures/skybox/pz.png', // Positive Z
      '/textures/skybox/nz.png', // Negative Z
    ]);
    scene.background = textureCube;

    camera.position.set(0, 10, 20); // Initial camera position

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.minDistance = 10; // Jarak minimum zoom
    controls.maxDistance = 35; // Jarak maksimum zoom
    controls.minPolarAngle = Math.PI / 4; // Minimum angle to look down
    controls.maxPolarAngle = Math.PI / 2.25; // Maximum angle to look up

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Initialize raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

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
            const userData = intersectedObject.parent.userData;
            if (userData.category === 'balloon') {
              if (userData.subclass === 'airworld') {
                // Handle airworld balloon click
                setSelectedBuilding({
                  ...userData,
                  subclass: 'airworld'
                });
              } else if (userData.subclass === 'airverse') {
                // Handle airverse balloon click
                setSelectedBuilding({
                  ...userData,
                  subclass: 'airverse'
                });
              } else if (userData.subclass === 'anywhere') {
                // Handle anywhere balloon click
                setSelectedBuilding({
                  ...userData,
                  subclass: 'anywhere'
                });
              } else {
                // Handle other balloon subclasses if needed
                setSelectedBuilding(null);
              }
            } else if (userData.category === 'brands' || userData.category === 'sirine') {
              // Handle brands or sirine click
              setSelectedBuilding(userData);
            } else {
              setSelectedBuilding(null);
            }
          }
        }
    };

        window.addEventListener('click', handleClick);

    // Define waypoints
    const waypoints = [
      new THREE.Vector3(0, 3.5, 0),
      new THREE.Vector3(5, 3.5, 5),
      new THREE.Vector3(-5, 3.5, 5),
      new THREE.Vector3(-5, 3.5, -5),
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
            <Popup 
              brandsName={selectedBuilding.name} 
              brandsMasthead={selectedBuilding.masthead} 
              brandsDescription={selectedBuilding.description} 
              brandsThumbnail={selectedBuilding.thumbnails} 
              brandsTags={selectedBuilding.tags}
              category={selectedBuilding.category}
              image={selectedBuilding.image}
              title={selectedBuilding.title}
              subclass={selectedBuilding.subclass}
              onClose={() => setSelectedBuilding(null)}
            />
          )}
        </>
    );
};

export default City;