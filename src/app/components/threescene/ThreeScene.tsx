import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './ThreeScene.css';
import { gsap } from 'gsap';

const texturePaths = [
  '/assets-img/canette.png',
  '/assets-img/IMGA.png',
  '/assets-img/init.png',
'/assets-img/pfval.png'
];

interface ThreeSceneProps {
  nbPlane: number;
  onWheel?: (event: WheelEvent) => void;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ nbPlane, onWheel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRefs = useRef<THREE.Mesh[]>([]);
  const currentIndex = useRef(0);

  const nextProjet = () => {
    if (currentIndex.current < nbPlane - 1) {
      currentIndex.current += 1;
      animatePlanes();
    }
  };

  const prevProjet = () => {
    if (currentIndex.current > 0) {
      currentIndex.current -= 1;
      animatePlanes();
    }
  };
  const animatePlanes = () => {
  const geometry = planeRefs.current[0]?.geometry as THREE.PlaneGeometry;
  const planeHeight = geometry.parameters.height;

    planeRefs.current.forEach((plane, i) => {
      const targetY = planeHeight * 1.2 * (i - currentIndex.current) * -1;

      gsap.to(plane.position, {
        y: targetY,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    });
  };

  useEffect(() => {

    console.log(planeRefs)
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const width = containerRef.current?.offsetWidth ?? window.innerWidth;
      const height = containerRef.current?.offsetHeight ?? window.innerHeight;
      const extraHeight = height * 1.2;
  
      const camera = new THREE.PerspectiveCamera(75, width / extraHeight, 0.1, 1000);
  
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(width, extraHeight);
     /* if (containerRef.current && containerRef.current.children.length === 0) { */
       const existingCanvas = containerRef.current?.querySelector('canvas');
      if (existingCanvas) {
        containerRef.current?.removeChild(existingCanvas);
      }
      containerRef.current?.appendChild(renderer.domElement);
     /* } */
      camera.position.z = 5;
     
      if (typeof window !== 'undefined') {
        const aspect = width / height;
        const fov = (camera.fov * Math.PI) / 180;
        const targetVisibleHeight = 2 * Math.tan(fov / 2) * camera.position.z;

        const ratio = height / extraHeight;
        const planeHeight = targetVisibleHeight * ratio;
        const planeWidth = planeHeight * aspect;
            
        const loader = new THREE.TextureLoader();
    
        for(let i = 0; i < nbPlane; i++){
          const textureIndex = i % texturePaths.length; // Pour boucler si nbPlane > texturePaths.length
          const texture = loader.load(texturePaths[textureIndex]);

          const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
          const plane = new THREE.Mesh(planeGeometry, material);
   
          if( i != 0 ){
            plane.position.y = planeHeight * 1.2 * -i ;
          }
          //(plane.material as THREE.MeshBasicMaterial).color.set(0xff0000);
            scene.add(plane);
          
       
          planeRefs.current[i] = plane;
        }
        console.log(planeRefs)

        const renderScene = () => {
            planeRefs.current.forEach((plane, i) => {
              if (plane) {
               // plane.position.y += 0.05;
               // console.log(plane.position.y)

              }
            });
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
        };

        renderScene();
        // Render the scene and camera
        renderer.render(scene, camera);
           return () => {
            
            planeRefs.current.forEach((plane) => {
            if (plane) {
              scene.remove(plane);
              plane.geometry.dispose();
              if (Array.isArray(plane.material)) {
                plane.material.forEach((mat) => mat.dispose());
              } else {
                plane.material.dispose();
              }

              // Si une texture est utilisée
              const material = plane.material as THREE.MeshBasicMaterial;
              if (material.map) {
                material.map.dispose();
              }
            }
            });
            planeRefs.current = [];
            renderer.dispose();
          };
       }
  
    }
  }, []);

 useEffect(() => {
  if (typeof window !== 'undefined') {
    let wheelTimeout: NodeJS.Timeout;
    const isScrollingRef = { current: false };

    const handleSceneWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (e.deltaY > 3) {
        nextProjet();
      } else if (e.deltaY < -3) {
        prevProjet();
      }

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };

    window.addEventListener('wheel', handleSceneWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleSceneWheel);
    };
  }
}, []);

  return <div ref={containerRef} className='container-canvas   hover-project'/>;
};
export default ThreeScene;
