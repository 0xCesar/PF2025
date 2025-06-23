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
      "Moontain est à la fois un vlog d'alpinisme et une boutique en ligne spécialisée...",
    competence: ["ILLUSTRATOR", "FIGMA", "PHOTOSHOP"],
    date: "12/04/2023",
    preview: ["/moontain-img1", "/moontain-img2", "/moontain-img3", "/moontain-img4"],
  },
  {
    title: "Immersive Gallery",
    slug: "immersiveGallery",
    ref: "/webmarmottes",
    description:
      "Web Marmottes est une agence web fondée dans le cadre de ma licence professionnelle...",
    competence: ["HTML", "SCSS", "JS", "FIGMA", "ILLUSTRATOR", "PHOTOSHOP", "WORDPRESS"],
    date: "22/11/2023",
    preview: ["/WebMarmottes1"],
  },
  {
    title: "Init2",
    slug: "init2",
    description:
      "Init2 is a company based at Nantes, France. They were asking me to do their refonte website. I was working with Marthe Aubineau ( designer ), I integrated her design in fully responsive website.",
    competence: ["HTML", "SCSS", "JS", "FIGMA", "PHOTOSHOP", "PREMIERE PRO"],
    preview: 4,
  },
  {
    title: "Portfolio Touzinaud",
    slug: "portfoliotouzinaud",
    ref: "/visuel",
    description:
      "Les affiches et visuels présentés sont issus de divers projets réalisés durant...",
    competence: ["LIGHTROOM", "PHOTOSHOP", "ILLUSTRATOR", "FIGMA"],
    date: "??/??/20XX",
    preview: ["/visuel1", "/visuel2", "/visuel3"],
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
      {
        Array.from({ length: project.preview as number }).map((_, i) => (
          <div key={i} className="projectpage-image-wrapper">
            <Image
              src={`/assets-projet/${project.slug}/img${i+1}.png`}
              alt={`Image ${i + 1}`}
              width={800}
              height={600}
              className="projectpage-image"
            />
          </div>
        ))
      }
     
    </div>
    
  );
}
