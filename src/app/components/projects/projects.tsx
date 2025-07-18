"use client";


import React, {useState, useRef, useEffect, useCallback} from "react";
import './projects.css';
import Image from 'next/image'
import Link from 'next/link';
import { gsap } from 'gsap';
import ThreeScene from "../threescene/ThreeScene";



const projectsToBeShown:{
    title: string;
    slug: string;
    ref: string;
   
  }[]= [
    {
      title: "Canette 3D",
      slug: "canette3D",
      ref: "canette",
    },
    {
    title: "Immersive Gallery",
    slug: "immersiveGallery",
    ref: "IMGA",
    },
   
    {
    title: "Init 2",
    slug: "init2",
    ref: "init",
    },
    {
    title: "Portfolio Touzinaud",
    slug: "portfoliotouzinaud",
    ref: "pfval",
    },
    
  ];
  
export default function Projects() {

    let [index, setIndex] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isScrollingRef = useRef(false);
    const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const nextProjet = () => {
      const projectsName = document.querySelectorAll('#projet-title > *');
      const projectsNumber = document.querySelectorAll('#number-project > *');

      setIndex((prevIndex) => {
  
        if (prevIndex < projectsToBeShown.length) {

          let gap = '-100%'
          if(prevIndex != 0){
            gap = -100 * prevIndex + '%';
          }

        //  console.log(gap)
          gsap.timeline().to(projectsName, { y: gap,  duration: 0.25, ease : "circ.inOut"},0)  
           gsap.timeline().to(projectsNumber, 
            { y: gap,
              duration: 0.25,
              ease : "circ.inOut",
            
             },0) 

          return prevIndex + 1;
        }

      //  console.log('no next project');
        return prevIndex;
      });
        setCurrentIndex(prev => {
          const newIndex = Math.min(prev + 1, projectsToBeShown.length - 1);
          return newIndex;
        });
        //window.addEventListener("wheel", handleSceneWheel,  { passive: false });
    };

    const prevProjet = () => {
      const projectsName = document.querySelectorAll('#projet-title > *');
      const projectsNumber = document.querySelectorAll('#number-project > *');

      setIndex((prevIndex) => {
        
        if (prevIndex > 1) {
       // console.log(prevIndex)
        let gap = '0%'
        if(prevIndex != 2){
          gap = (-100 * (prevIndex - 1)) + 100 + '%';
        }

      //  console.log(gap)

   
        gsap.timeline().to(projectsName, { y: gap,  duration: 0.25, ease: "circ.inOut"},0)  
        gsap.timeline().to(projectsNumber, { y: gap, 
           duration: 0.25,
           ease : "circ.inOut",
            
          },0)  
    
          return prevIndex - 1;
        }
      //  console.log('no prev project');
        return prevIndex;
      });
      setCurrentIndex(prev => {
        const newIndex = Math.max(prev - 1, 0);
        return newIndex;
      });
     //window.addEventListener("wheel", handleSceneWheel,  { passive: false });
    };

   
    const handleSceneWheel = (e: WheelEvent) => {
  if (isScrollingRef.current) {
    e.preventDefault();
    return;
  }

  isScrollingRef.current = true;
  e.preventDefault();

  console.log("triggered");
  console.log(e);

  const adjusted = e.deltaY / 2;

  if (adjusted > 0.25) {
    nextProjet();
  } else if (adjusted < -0.25) {
    prevProjet();

  }

  if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
  wheelTimeout.current = setTimeout(() => {
    isScrollingRef.current = false;
    console.log("timeout");
  }, 1000); // tu peux ajuster cette durée si nécessaire pour un comm
};


    useEffect(() => {
      
      const projectsName = document.querySelectorAll('#projet-title > *');
    
      const handleKeyDown = (e: KeyboardEvent) => {    
        if (e.key === "ArrowDown") {
          nextProjet(); 
        } else if (e.key === "ArrowUp") {
           prevProjet();
        }
      };

      window.addEventListener("wheel", handleSceneWheel,  { passive: false });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("wheel", handleSceneWheel);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []); 
  

    return <div className="page-container landing-container">
        {/*<div id="cachecache"></div>*/}
        <div className="project-number">
            <div id="number-project">
            {projectsToBeShown.map((_, i) => (
              <p
                  key={i}
                >
                  {(i + 1).toString().padStart(2, '0')}
                </p>
              ))}
            </div>
            
            <p className="line"></p>
            <p>{projectsToBeShown.length.toString().padStart(2, '0')}</p>
        </div>
        <div className="all-projects-titles-container" id="projet-title">

          {projectsToBeShown.map((project, i) => (
                <h3 key={project.slug}  className="projet-title   hover-link">
                  {project.title}
                </h3>
          ))}
        </div>
        
        <div className="projet-image hover-project">
          
        </div>
        <Link href={`/projets/${projectsToBeShown[index - 1].slug}`}>
         
             <ThreeScene 
             nbPlane={projectsToBeShown.length}
             currentIndex={currentIndex}
             ></ThreeScene>
          </Link>
         
    </div>
    }