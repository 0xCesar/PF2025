"use client";


import React, {useState, useRef, useEffect, useCallback} from "react";
import './projects.css';
import Image from 'next/image'
import Link from 'next/link';

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

    const nextProjet = () => {
      setIndex((prevIndex) => {
        if (prevIndex < projectsToBeShown.length) {
          return prevIndex + 1;
        }
        console.log('no next project');
        return prevIndex;
      });
    };
  
    const prevProjet = () => {
      setIndex((prevIndex) => {
        if (prevIndex > 1) {
          return prevIndex - 1;
        }
        console.log('no prev project');
        return prevIndex;
      });
    };
    
    const isScrollingRef = useRef(false);
    let wheelTimeout: ReturnType<typeof setTimeout>;
    const handleSceneWheel = (e: WheelEvent) => {
          e.preventDefault();

          if (isScrollingRef.current) return;
          isScrollingRef.current = true;

          console.log(e.deltaY)
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

    useEffect(() => {
      /*const handleWheel = (e: WheelEvent) => {
        e.preventDefault();

        if (isScrolling) return; 
        isScrolling = true;

        if (e.deltaY > 0) {
          nextProjet();
        } else if (e.deltaY < 0) {
          prevProjet();
        }

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          console.log('Fin du wheel event');
          isScrolling = false;
        }, 800);  // Animation Time
      };*/
     
  
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
        <div className="project-number">
            <p>{index.toString().padStart(2, '0')}</p>
            <p className="line"></p>
            <p>04</p>
        </div>
        <div >
          <h3 className="projet-title hover-link">{projectsToBeShown[index-1].title}</h3>

        </div>
        
        <div className="projet-image ">
          <Link href={`/projets/${projectsToBeShown[index - 1].slug}`}>
         
             <ThreeScene 
             nbPlane={projectsToBeShown.length}
             onWheel={handleSceneWheel}
             ></ThreeScene>
          </Link>
         
        </div>
    </div>
    }
