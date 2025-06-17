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
    
    let isScrolling = false; 
    let wheelTimeout: ReturnType<typeof setTimeout>;

    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
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
          isScrolling = false; // Libère le scroll
        }, 800); // durée estimée de l'animation
      };
  
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
         prevProjet();
        } else if (e.key === "ArrowUp") {
          nextProjet();
        }
      };

      window.addEventListener("wheel", handleWheel,  { passive: false });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []); 
  

    return <div className="page-container">
        <div className="project-number">
            <p>{index.toString().padStart(2, '0')}</p>
            <p className="line"></p>
            <p>04</p>
        </div>
        <h3 className="projet-title hover-link">{projectsToBeShown[index-1].title}</h3>

        <div className="projet-image ">
          <Link href={`/projets/${projectsToBeShown[index - 1].slug}`}>
            <Image 
                fill
                style={{ objectFit: 'contain' }}
                src={'/assets-img/' +projectsToBeShown[index-1].ref + '.png'} 
                alt="" 
                
                className="hover-project"
            />
             <ThreeScene nbPlane={projectsToBeShown.length}></ThreeScene>
          </Link>
         
        </div>
    </div>
    }
