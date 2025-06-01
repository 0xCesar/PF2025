"use client";


import React, {useState, useRef, useEffect, useCallback} from "react";
import './projects.css';
import Image from 'next/image'

const projectsToBeShown:{
    title: string;
    slug: string;
    ref: string;
   
  }[]= [
    {
      title: "Canette 3D",
      slug: "Canette3D",
      ref: "canette",
    },
    {
    title: "Immersive Gallery",
    slug: "ImmersiveGallery",
    ref: "IMGA",
    },
    {
    title: "Fish eyes effect",
    slug: "FishEyesEffect",
    ref: "Fisheyes",
    },
    {
    title: "Init 2",
    slug: "init2",
    ref: "init",
    },
    {
    title: "Portfolio Touzinaud",
    slug: "PortfolioTouzinaud",
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
    
    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY > 0) {
          nextProjet();
        } else if (e.deltaY < 0) {
          prevProjet();
        }
      };
  
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
         prevProjet();
        } else if (e.key === "ArrowUp") {
          nextProjet();
        }
      };

      window.addEventListener("wheel", handleWheel);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []); 
  

    return <div className="projet-container">
        <div className="project-number">
            <p>{index.toString().padStart(2, '0')}</p>
            <p className="line"></p>
            <p>05</p>
        </div>
        <h3 className="projet-title hover-link">{projectsToBeShown[index-1].title}</h3>
 
        <div className="projet-image ">
            <Image 
                fill
                style={{ objectFit: 'cover' }}
                src={'/assets-img/' +projectsToBeShown[index-1].ref + '.png'} 
                alt="" 
                className="hover-project"
            />
        </div>
    </div>
    }
