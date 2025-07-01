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
    let wheelTimeout: ReturnType<typeof setTimeout>;




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
          gsap.timeline().to(projectsName, { y: gap,  duration: 0.4, ease : "circ.inOut"},0)  
           gsap.timeline().to(projectsNumber, { y: gap,  duration: 0.4, ease : "circ.inOut" },0) 

          return prevIndex + 1;
        }

      //  console.log('no next project');
        return prevIndex;
      });
        setCurrentIndex(prev => {
          const newIndex = Math.min(prev + 1, projectsToBeShown.length - 1);
          return newIndex;
        });
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

   
        gsap.timeline().to(projectsName, { y: gap,  duration: 0.4, ease: "circ.inOut"},0)  
        gsap.timeline().to(projectsNumber, { y: gap,  duration: 0.4, ease : "circ.inOut"},0)  
    
          return prevIndex - 1;
        }
      //  console.log('no prev project');
        return prevIndex;
      });
      setCurrentIndex(prev => {
        const newIndex = Math.max(prev - 1, 0);
        return newIndex;
      });
    };


   
    const handleSceneWheel = (e: WheelEvent) => {
          e.preventDefault();

          if (isScrollingRef.current) return;
          isScrollingRef.current = true;

         // console.log(e.deltaY)
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

    useEffect(() => {

      /*const projectContainerBig = document.getElementById("cachecache");
      setTimeout(() => {
        gsap.to(projectContainerBig, {top : '100vh', duration : 1.2,ease: "power2.inOut",})
      }, 1500);*/
    
      
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
  

    return <div className="page-container">
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
        
        <div className="projet-image ">
          <Link href={`/projets/${projectsToBeShown[index - 1].slug}`}>
         
             <ThreeScene 
             nbPlane={projectsToBeShown.length}
             currentIndex={currentIndex}
             ></ThreeScene>
          </Link>
         
        </div>
    </div>
    }