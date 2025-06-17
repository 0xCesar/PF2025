import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './ThreeScene.css';


const texturePaths = [
  '/assets-img/canette.png',
  '/assets-img/IMGA.png',
  '/assets-img/init.png',
'/assets-img/pfval.png'
];

interface ThreeSceneProps {
  nbPlane: number;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ nbPlane }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRefs = useRef<THREE.Mesh[]>([]);

 
  useEffect(() => {


    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const width = containerRef.current?.offsetWidth ?? window.innerWidth;
      const height = containerRef.current?.offsetHeight ?? window.innerHeight;
      const extraHeight = height * 1.2;
  
      const camera = new THREE.PerspectiveCamera(75, width / extraHeight, 0.1, 1000);
  
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, extraHeight);
      if (containerRef.current && containerRef.current.children.length === 0) {
        containerRef.current.appendChild(renderer.domElement);
      }
      camera.position.z = 5;
     
      if (typeof window !== 'undefined') {
        const aspect = width / height;
        const fov = (camera.fov * Math.PI) / 180;
        const targetVisibleHeight = 2 * Math.tan(fov / 2) * camera.position.z;

        const ratio = height / extraHeight;
        const planeHeight = targetVisibleHeight * ratio;
        const planeWidth = planeHeight * aspect;
    
        for(let i = 0; i < nbPlane; i++){
          const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
          const material = new THREE.MeshBasicMaterial({ color: 0x9999ff });
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
           /* planeRefs.current.forEach((plane, i) => {
              if (plane) {
               // plane.position.y += 0.1;
                console.log(plane.position.y)

              }
            });*/
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
        };

        renderScene();
        // Render the scene and camera
        renderer.render(scene, camera);
           return () => {
     
            renderer.dispose();
          };
       }
  
    }
  }, []);
  return <div ref={containerRef} className='container-canvas   hover-project'/>;
};
export default ThreeScene;
