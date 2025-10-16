"use client";


import React, {useState, useRef, useEffect, useCallback} from "react";
import './projects.css';
import Image from 'next/image'
import Link from 'next/link';
import { gsap } from 'gsap';
import ThreeScene from "../threescene/ThreeScene";
import projects from "../../data/projects.json";
/*
const projectsToBeShown:{
    title: string;
    slug: string;
    ref: string;}[]= [
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
];*/
const projectsToBeShown = projects.map(p => ({
  title: p.title,
  slug: p.slug,
  ref: p.ref ?? p.slug,
}));  


export default function Projects() {

    let [index, setIndex] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isScrollingRef = useRef(false);
    const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const nextProjet = () => {
      const projectsName = document.querySelectorAll('#projet-title > *');
      const projectsNumber = document.querySelectorAll('#number-project > *');

      setIndex((prevIndex) => {
  
        if (prevIndex < projectsToBeShown.length) {

          let gap = '-100%';
          let gapAdjusted = '-100%'; 

          if(prevIndex != 0){
            gap = -100 * prevIndex - 12 + '%';
            gapAdjusted = -100 * prevIndex + '%';
          }

          gsap.timeline().to(projectsName, { y: gap,  duration: 0.25, ease : "circ.inOut"},0);  
          gsap.timeline().to(projectsNumber, { y: gapAdjusted,duration: 0.25,ease : "circ.inOut",},0);

          return prevIndex + 1;
        }

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
        let gap = '0%'
        let gapAdjusted = '0%'
        if(prevIndex != 2){
          gap = (-100 * (prevIndex - 1)) + 100 - 12 + '%';
          gapAdjusted = (-100 * (prevIndex - 1)) + 100  + '%';
        }

          gsap.timeline().to(projectsName, { y: gap,  duration: 0.25, ease: "circ.inOut"},0)  
          gsap.timeline().to(projectsNumber, { y: gapAdjusted,  duration: 0.25, ease : "circ.inOut"},0)  
    
          return prevIndex - 1;
        }

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
      console.log(e)
      const adjusted = e.deltaY / 10;
      console.log(adjusted)
      if (adjusted > 5) {
        nextProjet();
      } else if (adjusted < -5) {
        prevProjet();
    }

    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        isScrollingRef.current = false;
    }, 250); 
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
{/*
          {projectsToBeShown.map((project, i) => (
                <h3 key={project.slug}  className="projet-title   hover-link">
                  {project.title}
                </h3>
          ))}*/}
          {projectsToBeShown.map((project) => (
            <h3 key={project.slug} className="projet-title hover-link">
              {project.title}
            </h3>
          ))}
        </div>
        
 
        {/**<Link  href={`/projets/${projectsToBeShown[index - 1].slug}`}>***/}
        <Link  href={`/projets/${projectsToBeShown[index - 1].slug}`}>
        <div className="projet-image hover-project  ">
            <Image 
                      fill
              style={{ objectFit: 'contain', visibility : "hidden" }}
                src={'/assets-projet/' +projectsToBeShown[index-1].slug + '/img0.png'} 
                alt="" 
                id="refImage3D"
                className="hover-project " 
                  onLoad={() => setImageLoaded(true)}
            />
        </div>
        
        <ThreeScene 
             nbPlane={projectsToBeShown.length}
             currentIndex={currentIndex}
              imageLoaded={imageLoaded} 
        ></ThreeScene>
        </Link>
        {/**</Link>***/}
         
    </div>
}