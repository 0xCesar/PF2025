import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './ThreeScene.css';
import { gsap } from 'gsap';
import {Pane} from 'tweakpane';
import { useRouter } from 'next/navigation';

import vertexShader from '@/shader/planeShader/vertex.glsl';
import fragmentShader from '@/shader/planeShader/fragment.glsl';
import projects from "../../data/projects.json";
import { useWebGLSupport } from '@/app/hook/useWebGLSupport';

const texturePaths = projects.map(p => `/assets-projet/${p.ref?.replace(/^\/+/, '')}/img0.png`);
const texturePathsMobile = projects.map(p => `/assets-projet/${p.ref?.replace(/^\/+/, '')}/thumbnail-mobile.png`);
const linkPaths = projects.map(p => `/projets/${p.slug}`);
interface ThreeSceneProps {
  nbPlane: number;
  currentIndex: number; 
  imageLoaded: boolean;
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

const ThreeScene: React.FC<ThreeSceneProps> = ({ nbPlane, currentIndex, imageLoaded }) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const planeRefs = useRef<THREE.Mesh[]>([]);
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.Camera>(null)
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const displacement: Partial<Displacement> = {};

  // Hover state management
  const router = useRouter();
  const isHoveringPlaneRef = useRef(false);
  const [isHoveringPlane, setIsHoveringPlane] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const isWebGL = useWebGLSupport();
    
  
  useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const animatePlanes = () => {
  const geometry = planeRefs.current[0]?.geometry as THREE.PlaneGeometry;
  const planeHeight = geometry?.parameters?.height;

  if (!planeHeight) return;

  planeRefs.current.forEach((plane, i) => {
    const targetY = (planeHeight * 1.2 * (i - currentIndex ) * -1) + 50;
    console.log(targetY);
    const shaderMaterial = plane.material as THREE.ShaderMaterial;
    shaderMaterial.uniforms.uProgress.value = 0.0;

    gsap.to(plane.position, {
      y: targetY,
      duration: 0.8,
      ease: 'power3.inOut',
    });
   gsap.to(shaderMaterial.uniforms.uProgress, {
      value: 1,
      duration: 0.8,
      ease: 'power2.out',
  })
 
  });
  };

  const handleHoverChange = (hovering: boolean) => {
  setIsHoveringPlane(hovering);
  };


useEffect(() => {
  const newState = isHoveringPlane ? "hover-project" : "default";
  window.dispatchEvent(new CustomEvent("cursor-state-change", { detail: newState }));
}, [isHoveringPlane]);

useEffect(() => {
  animatePlanes();
}, [currentIndex]);


const getPlaneDimensions = (isMobile: boolean, refDim: DOMRect) => {
  if (isMobile) {
    return {
      width: refDim.width,   // tu peux adapter le ratio
      height: refDim.height, // par exemple plus petit sur mobile
    };
  } else {
    return {
      width: refDim.width,
      height: refDim.height,
    };
  }
};

  useEffect(() => {
    if (!imageLoaded) return;
    if (isWebGL === false) return; 
    if (isWebGL === null) return; 

    if (typeof window !== 'undefined') {

      // Debuugin Purpose
      const PARAMS = {
          frequency: -10.5,
          amplitude: 20.65,
          uStrenghtRatio: 0.2,
        };

      const pane = new Pane();
      // Comment to show tweaking panel
      pane.element.style.display = 'none';

      pane.addBinding(PARAMS, 'frequency', {
          min: -20,
          max: 20,
          step: 0.1
        });
      pane.addBinding(PARAMS, 'uStrenghtRatio', {
          min: -10.0,
          max: 20,
          step: 0.1
        });
      pane.addBinding(PARAMS, 'amplitude', {
          min: 0,
          max: 100,
        });

      const btn = pane.addButton({
        title: 'Start',
        label: 'Animation',   // optional
      });

      btn.on('click', () => {
        animatePlanes();
      });
   
     

      // Initialize Three.js scene, loader
      const scene = new THREE.Scene();
      const loader = new THREE.TextureLoader();

      // Get the container element
      const refImage = document.getElementById("refImage3D");
      const existingCanvas = containerRef.current?.querySelector('canvas');
      

      // Get the width and height of the container
      const width = containerRef.current?.offsetWidth ?? window.innerWidth;
      const height = containerRef.current?.offsetHeight ?? window.innerHeight;
      const extraHeight = height * 1.2;
    

      // Camera setup : merging threejs w/ html
      const camera = new THREE.PerspectiveCamera( 70, width/height, 0.01, 2000 );
      camera.position.z = 600;
      camera.fov = 2 * Math.atan( (height/2)/600 ) * (180/Math.PI);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true });
      renderer.setSize(width, extraHeight);
      renderer.setPixelRatio(2);

      // Fixing : bug with canvas not being removed ???
      if (existingCanvas) {
        containerRef.current?.removeChild(existingCanvas);
      }
      containerRef.current?.appendChild(renderer.domElement);

 

      // Set up 
      const rect = new DOMRect(0, 0, 500, 300);
      const refDim = refImage?.getBoundingClientRect() || rect;
      
     const { width: planeWidth, height: planeHeight } = getPlaneDimensions(isMobile, refDim);


    
      
      const canvas = document.createElement('canvas');

      // Set up the canvas for displacement effect
      canvas.width = 128;
      canvas.height = 128;
      canvas.style.position = 'fixed';
      canvas.style.width = '256px';
      canvas.style.height = '256px';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '10';

      // uncomment to append canvas : debugging purpose
      // document.body.appendChild(canvas);

      displacement.canvas = canvas; 

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Impossible de récupérer le contexte 2D du canvas');
      }
      displacement.context = context;
     
      context.fillRect(0, 0, canvas.width, canvas.height);
      displacement.glowImage = new Image();
      displacement.glowImage.src = './debugging/glow.png';
      displacement.interactivePlane = new THREE.Mesh(new THREE.PlaneGeometry(planeWidth, planeHeight,10,10), new THREE.MeshBasicMaterial({ color : 'red', visible : false}))
      displacement.interactivePlane.position.z = 1
      scene.add(displacement.interactivePlane);

      // Raycaster and cursor setup
      displacement.raycaster = new THREE.Raycaster();
      displacement.screenCursor = new THREE.Vector2(999, 999);
      displacement.canvasCursor = new THREE.Vector2(999, 999);
      displacement.canvasCursorPrevious = new THREE.Vector2(999, 999);
      if(containerRef.current){
      const container = containerRef.current;
       
      if(!container) return;
      window.addEventListener('pointermove', handlePointerMove);

       
      function handlePointerMove(event: PointerEvent) {
      // console.log(event)
          const container = containerRef.current;
          if (!container) return;
          const rect = container.getBoundingClientRect();
          if (displacement.screenCursor) {
            displacement.screenCursor.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            displacement.screenCursor.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
          }
      }

      
      displacement.texture = new THREE.CanvasTexture(displacement.canvas)
      displacement.texture.minFilter = THREE.LinearMipMapLinearFilter;
      displacement.texture.magFilter = THREE.LinearFilter;
      displacement.texture.generateMipmaps = true;
      }

      // Create planes projects with textures
      for(let i = 0; i < nbPlane; i++){
        let texture;
          if(isMobile){
          const textureIndex = i % texturePathsMobile.length; 
           texture = loader.load(texturePathsMobile[textureIndex]);
          }else{
            const textureIndex = i % texturePaths.length; 
           texture = loader.load(texturePaths[textureIndex]);
        }
          //const textureIndex = i % texturePaths.length; // Pour boucler si nbPlane > texturePaths.length
          //const texture = loader.load(texturePaths[textureIndex]);

          const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 10, 10);
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
           const materialShader = new THREE.ShaderMaterial({
              vertexShader,
              fragmentShader,
              transparent: true,
              wireframe: false,
              uniforms:
                {
                    uTime: { value: 0 },
                    uTrail : new THREE.Uniform(displacement.texture),
                    uTexture: { value: texture },
                    uProgress: { value: 0.0 },
                    uFrequency: { value: PARAMS.frequency },
                    uAmplitude: { value: PARAMS.amplitude },
                    uStrenghtRatio : { value : PARAMS.uStrenghtRatio }
                }
            });

          const plane = new THREE.Mesh(planeGeometry, materialShader);
          if( i != 0 && planeHeight){
            plane.position.y = planeHeight * 1.2 * -i ;
           
          }
          scene.add(plane);
          planeRefs.current[i] = plane;
        }

        //Animition function 
        const clock = new THREE.Clock();
        let rafId = 0;


        const renderScene = () => {
          /*  console.log('Rendering scene...');*/
            const elapsedTime = clock.getElapsedTime();

            // Linking uniforms plane with time
            planeRefs.current.forEach((plane, i) => {
              if (plane) {
                const shaderMaterial = plane.material as THREE.ShaderMaterial;
                shaderMaterial.uniforms.uTime.value = elapsedTime;
                shaderMaterial.uniforms.uFrequency.value = PARAMS.frequency;
                shaderMaterial.uniforms.uAmplitude.value = PARAMS.amplitude;
                shaderMaterial.uniforms.uStrenghtRatio.value = PARAMS.uStrenghtRatio;
              }
            });

            // Displacement effect with cursor
            if(displacement.screenCursor && displacement.raycaster && displacement.interactivePlane){
              
              displacement.raycaster?.setFromCamera(displacement.screenCursor, camera);
              const intersections = displacement.raycaster.intersectObject(displacement.interactivePlane)
              if(intersections.length > 0)
              { //console.log('je passe dedans');
   
                 handleHoverChange(true);
        
                 // console.log(intersections)
                  const uv = intersections[0].uv
                  // Passing event : 
                  

                  // Update the canvas cursor position based on the intersection UV coordinates
                  if(displacement.canvasCursor && uv && displacement.canvas  && displacement.canvasCursorPrevious){

                        const cursorDistance = displacement.canvasCursorPrevious.distanceTo(displacement.canvasCursor)
                        displacement.canvasCursorPrevious.copy(displacement.canvasCursor)
                        

                      displacement.canvasCursor.x = uv.x * displacement.canvas.width;
                      displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height;
                    if(displacement.context && displacement.glowImage && displacement.texture){
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
                      
                        displacement.texture.needsUpdate = true;
                    }
                  }
              }else{

                  
                  if(displacement.context && displacement.canvas && displacement.texture){
                    
                     //displacement.context.globalCompositeOperation = 'source-over'
                    displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)
                    displacement.texture.needsUpdate = true;
                }
                    handleHoverChange(false);
         
              }
            }

          renderer.render(scene, camera);
          rafId = requestAnimationFrame(renderScene);
        //  requestAnimationFrame(renderScene);
        };

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        renderScene();
        renderer.render(scene, camera);



          const handleResize = () => {
            const refImagResize = document.getElementById("refImage3D")?.getBoundingClientRect();

            const width = containerRef.current?.offsetWidth ?? window.innerWidth;
            const height = containerRef.current?.offsetHeight ?? window.innerHeight;
           // console.log("Resizing to:", width, height);

            if (camera instanceof THREE.PerspectiveCamera) {
              camera.aspect = width / height;
              camera.fov = 2 * Math.atan((height / 2) / camera.position.z) * (180 / Math.PI); // si tu veux garder ton calcul dynamique
              camera.updateProjectionMatrix();
            }

            renderer.setSize(width, height);
            camera.updateProjectionMatrix();

            const widthPlane = refImagResize?.width ?? window.innerWidth;
            const heightPlane = refImagResize?.height ?? window.innerHeight;
           // console.log("Resizing to:", widthPlane, heightPlane);
            if (displacement.interactivePlane) {
              const newGeometry = new THREE.PlaneGeometry(widthPlane, heightPlane, 50, 50);
              displacement.interactivePlane.geometry.dispose();
              displacement.interactivePlane.geometry = newGeometry;

              if(refImage)
              displacement.interactivePlane.position.x = refImage?.getBoundingClientRect().left - width/2 + refImage?.getBoundingClientRect().width / 2;
           
            }

            // Resize all image planes
            planeRefs.current.forEach((plane, i) => {
              plane.geometry.dispose();
              const newGeometry = new THREE.PlaneGeometry(widthPlane, heightPlane, 50, 50);
           //   console.log("New plane geometry:", newGeometry);
              plane.geometry = newGeometry;

              // Reposition according to new height
                 if(refImage && planeHeight){
                //    plane.position.y = i === 0 ? 0 : planeHeight * 1.2 * -i;
                   //  plane.position.y = 0;  // Animer sympa ? 
                    plane.position.x = refImage?.getBoundingClientRect().left - width/2 + refImage?.getBoundingClientRect().width / 2;
                 }

            });

            animatePlanes(); // reposition based on currentIndex
         };
          handleResize(); // Initial resize to set up the scene correctly
          window.addEventListener('resize', handleResize);
          
 // ✅ AJOUTEZ LE GESTIONNAIRE DE CLIC ICI
    const canvas1 = renderer.domElement;
    console.log( canvas1);

    const cliked = () => {
      console.log("clicked");
    };
    canvas.addEventListener("click", cliked);


    const handleCanvasClick = (event: MouseEvent) => {
      console.log("🖱️ Click détecté");
      
      if (!displacement.raycaster || !camera) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const mouse = new THREE.Vector2(x, y);
      displacement.raycaster.setFromCamera(mouse, camera);
      const intersects = displacement.raycaster.intersectObjects(planeRefs.current);

      console.log("🎯 Intersections:", intersects.length);

      if (intersects.length > 0) {
        const clickedPlane = intersects[0].object;
        const planeIndex = planeRefs.current.indexOf(clickedPlane as THREE.Mesh);
        
        console.log("✅ Index:", planeIndex, "Path:", linkPaths[planeIndex]);

        if (planeIndex !== -1) {
          router.push(linkPaths[planeIndex]);
        }
      }
    };
  console.log(canvas1);

   // canvas1.addEventListener("click", handleCanvasClick);
   //
   // 
  
          // Cleanup
           return () => {
             cancelAnimationFrame(rafId); // stop raf loop
            window.removeEventListener('resize', handleResize);
            canvas1.removeEventListener("click", handleCanvasClick);
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
            containerRef.current?.removeChild(renderer.domElement); 
 
          };
       
  
       
    }
  }, [imageLoaded, isMobile]);


   if (isWebGL === false) {
    return (
      <div className="text-center mt-10 text-red-500">
        ⚠️ Votre navigateur ou appareil ne supporte pas WebGL.<br />
        Essayez sur un autre appareil ou mettez à jour vos pilotes.
      </div>
    );
  }

  return <div ref={containerRef} className='container-canvas   hover-project'/>
    

    
};

export default ThreeScene;