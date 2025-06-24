import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './ThreeScene.css';
import { gsap } from 'gsap';

import vertexShader from '@/shader/planeShader/vertex.glsl';
import fragmentShader from '@/shader/planeShader/fragment.glsl';

import vertexTrailShader from '@/shader/trailShader/vertex.glsl';
import fragmentTrailShader from '@/shader/trailShader/fragment.glsl';
import { contain } from 'three/src/extras/TextureUtils.js';

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

interface Displacement {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  glowImage: HTMLImageElement;
  interactivePlane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  raycaster: THREE.Raycaster;
  screenCursor: THREE.Vector2;
  canvasCursor: THREE.Vector2;
  canvasCursorPrevious: THREE.Vector2;
  texture: THREE.CanvasTexture;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ nbPlane, onWheel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useRef<HTMLDivElement>(null);
  const planeRefs = useRef<THREE.Mesh[]>([]);
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.Camera>(null)
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const currentIndex = useRef<number>(0);

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

    //console.log(planeRefs)
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const width = containerRef.current?.offsetWidth ?? window.innerWidth;
      const widthForPlane = containerWidth.current?.offsetWidth ?? window.innerWidth;
      const height = containerRef.current?.offsetHeight ?? window.innerHeight;
      const extraHeight = height * 1.2;
  
      const camera = new THREE.PerspectiveCamera(75, width / extraHeight, 0.1, 1000);
  
      const renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true });
      
      renderer.setSize(width, extraHeight);
      renderer.setPixelRatio(2);
      const existingCanvas = containerRef.current?.querySelector('canvas');
      if (existingCanvas) {
        containerRef.current?.removeChild(existingCanvas);
      }
      containerRef.current?.appendChild(renderer.domElement);

      camera.position.z = 5;
     
      if (typeof window !== 'undefined') {
        const aspect = width / height;
        const fov = (camera.fov * Math.PI) / 180;
        const targetVisibleHeight = 2 * Math.tan(fov / 2) * camera.position.z;

        const ratio = height / extraHeight;
        const planeHeight = targetVisibleHeight * ratio;
        const planeWidth = planeHeight * aspect;
            
        const loader = new THREE.TextureLoader();

        const flagTexture = loader.load('/assets-img/canette.png')
       
    
      

      const displacement: Partial<Displacement> = {};


      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      canvas.style.position = 'fixed';
      canvas.style.width = '256px';
      canvas.style.height = '256px';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '10';
      //document.body.appendChild(canvas);

      displacement.canvas = canvas;


      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Impossible de récupérer le contexte 2D du canvas');
      }
      displacement.context = context;
      context.fillRect(0, 0, canvas.width, canvas.height);

      displacement.glowImage = new Image();
      displacement.glowImage.src = './debugging/glow.png';

      displacement.interactivePlane = new THREE.Mesh(new THREE.PlaneGeometry(planeWidth, planeHeight,10,10), new THREE.MeshBasicMaterial({ color : 'red', visible: false}))
      
        //  displacement.interactivePlane.position.y = 1
      scene.add(displacement.interactivePlane);
      displacement.raycaster = new THREE.Raycaster();
      displacement.screenCursor = new THREE.Vector2(999, 999);
      displacement.canvasCursor = new THREE.Vector2(999, 999);
      displacement.canvasCursorPrevious = new THREE.Vector2(999, 999);
      if(containerRef.current){
      const container = containerRef.current;
      if(!container) return;

      containerRef.current.addEventListener('pointermove', (event: { clientX: number; clientY: number; }) => {
        const rect = container.getBoundingClientRect();

        if(displacement.screenCursor){
            displacement.screenCursor.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            displacement.screenCursor.y = -((event.clientY - rect.top) / rect.height) * 2 + 1; //console.log(displacement.screenCursor)
        }

      })

      displacement.texture = new THREE.CanvasTexture(displacement.canvas)
      displacement.texture.minFilter = THREE.LinearMipMapLinearFilter;
      displacement.texture.magFilter = THREE.LinearFilter;
      displacement.texture.generateMipmaps = true;

      }
      
      for(let i = 0; i < nbPlane; i++){
          const textureIndex = i % texturePaths.length; // Pour boucler si nbPlane > texturePaths.length
          const texture = loader.load(texturePaths[textureIndex]);

          const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 10, 10);
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
           const materialShader = new THREE.ShaderMaterial({
              vertexShader,
              fragmentShader,
              transparent: true,
            //  wireframe: true,
              uniforms:
                {
     
                    uTime: { value: 0 },
                    uTrail : new THREE.Uniform(displacement.texture),
                    uTexture: { value: texture }
                }
            });
          const plane = new THREE.Mesh(planeGeometry, materialShader);
      
          if( i != 0 ){
            plane.position.y = planeHeight * 1.2 * -i ;
          }
          //(plane.material as THREE.MeshBasicMaterial).color.set(0xff0000);
          scene.add(plane);
          
       
          planeRefs.current[i] = plane;
        }
      


 // console.log(planeRefs)
        const clock = new THREE.Clock();
        const renderScene = () => {
            const elapsedTime = clock.getElapsedTime()
            planeRefs.current.forEach((plane, i) => {
              if (plane) {
               // plane.position.y += 0.05;
               // console.log(plane.position.y)
              const shaderMaterial = plane.material as THREE.ShaderMaterial;
              shaderMaterial.uniforms.uTime.value = elapsedTime;

              }
            });

            if(displacement.screenCursor && displacement.raycaster && displacement.interactivePlane){
              displacement.raycaster?.setFromCamera(displacement.screenCursor, camera);
              const intersections = displacement.raycaster.intersectObject(displacement.interactivePlane)
              if(intersections.length)
              {

                  const uv = intersections[0].uv
                //  console.log(uv)
                  if(displacement.canvasCursor && uv && displacement.canvas  && displacement.canvasCursorPrevious){

                        const cursorDistance = displacement.canvasCursorPrevious.distanceTo(displacement.canvasCursor)
                        displacement.canvasCursorPrevious.copy(displacement.canvasCursor)
                        

                      displacement.canvasCursor.x = uv.x * displacement.canvas.width;
                      displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height;
                    if(displacement.context && displacement.glowImage && displacement.texture){
                        /* Fade Out */
                        displacement.context.globalCompositeOperation = 'source-over'
                        displacement.context.globalAlpha = 0.1
                        displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)


                        const alpha = Math.min(cursorDistance * 0.2, 1)
    

                        const glowSize = displacement.canvas.width * 0.25;
                        displacement.context.globalCompositeOperation = 'lighten';
                        displacement.context.globalAlpha = alpha
                        displacement.context.drawImage(displacement.glowImage,
                           displacement.canvasCursor.x - glowSize * 0.5,
                          displacement.canvasCursor.y - glowSize * 0.5,
                          glowSize,
                          glowSize)
                        
                          // Texture

                          displacement.texture.needsUpdate = true;
                    }
                  }


              }
         


            }
          renderer.render(scene, camera);
          requestAnimationFrame(renderScene);

        };

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;


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

      if (e.deltaY > 2.5) {
        nextProjet();
      } else if (e.deltaY < -2.5) {
        prevProjet();
      }

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
     if (e.key === "ArrowDown") {
       nextProjet(); 
     } else if (e.key === "ArrowUp") {
        prevProjet();
     }
    };

    window.addEventListener('wheel', handleSceneWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleSceneWheel);
    };
  }
}, []);

 
  return <div ref={containerRef} className='container-canvas   hover-project'>
    <div ref={containerWidth} className='ref-container-size'></div>
  </div>

    
};
export default ThreeScene;