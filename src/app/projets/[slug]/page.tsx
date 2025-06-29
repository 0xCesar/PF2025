"use client";

import { notFound } from "next/navigation";
import React, { useEffect, use } from "react";
import { gsap } from "gsap";
import Image from 'next/image'
import "./project.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})

gsap.registerPlugin(ScrollToPlugin);

const projects = [
  {
    title: "Canette 3D",
    slug: "canette3D",
    ref: "/moontain",
    description:
      "This was a personal project created during my studies, following Bruno Simon’s “Three.js Journey” course. I wanted to challenge myself and explore what I could build by combining 3D modeling in Blender with interactive web development using Three.js and GSAP.",
    context: "School Project",
    skills: "Web design, front-end development, motion design (GSAP), 3D modeling (Blender), 3D integration (Three.js)",
    date: "12/04/2023",

    preview: 1,
  },
  {
    title: "Immersive Gallery",
    slug: "immersiveGallery",
    ref: "/webmarmottes",
    description:
      "Immersive Gallery is a virtual museum built within a web page. As users scroll, they navigate through the space, revealing artworks and collections. I was responsible for integrating 3D elements and building the interactive experience using Babylon.js.",
    context: "Internship",
    skills: "JavaScript development, 3D modeling (Blender), real-time 3D rendering (Babylon.js)",
    date: "22/11/2023",
   preview: 2,
  },
  {
    title: "Init2",
    slug: "init2",
    description:
      "Init2 is a company based in Nantes, France. They hired me to rebuild their website. I collaborated with designer Marthe Aubineau, transforming her Figma designs into a fully responsive and accessible website.",
    context: "Freelance",
    skills: "Front-end development (HTML, CSS, JavaScript), responsive design", 
    preview: 4,
  },
  {
    title: "Portfolio Touzinaud",
    slug: "portfoliotouzinaud",
    ref: "/visuel",
    description:
      "Valentin Touzinaud, a web designer from La Rochelle, asked me to develop his personal portfolio. I used Next.js to create a fast and modern website that faithfully reproduced his design, ensuring responsiveness and a smooth user experience.",
    context: "Freelance",
    skills: "Web development (Next.js), responsive design, performance optimization",
    preview: 4,
  },
];



export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  

  return (
    <div>
      <div className='projectpage-container'>
    
            <div className='projectpage-content'>
              <h3>{project.title}</h3>
        
              <p>Context : {project.context}</p>
              <p>Skills Used & Developed: {project.skills}</p>
              <p>{project.description} </p>
            </div>
            <div className='projectpage-preview'>
              <Image 
                src={`/assets-projet/${project.slug}/img0.png`}
                alt=''
                fill
                style={{ objectFit: 'cover' }}
               
              />
            </div>
      </div> 
        {Array.from({ length: project.preview as number }).map((_, i) => {
          
          if (i % 2 !== 0) return null;

          return (
            <div key={i} className="projectpage-image-wrapper">
              <Image
                src={`/assets-projet/${project.slug}/img${i + 1}.png`}
                alt={`Image ${i + 1}`}
                width={800}
                height={600}
                className="projectpage-image"
              />
              {(i + 1) < (project.preview as number) && (
                <Image
                  src={`/assets-projet/${project.slug}/img${i + 2}.png`}
                  alt={`Image ${i + 2}`}
                  width={800}
                  height={600}
                  className="projectpage-image"
                />
              )}
            </div>
          );
        })}
            
    </div>
    
  );
}
