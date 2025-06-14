"use client";

import { notFound } from "next/navigation";
import React, { useEffect, use } from "react";
import { gsap } from "gsap";
import "./project.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
    ref: "/paris2024",
    description:
      "Volympique est une application conçue pour aider les bénévoles à s'orienter...",
    competence: ["HTML", "SCSS", "JS", "FIGMA", "PHOTOSHOP", "PREMIERE PRO"],
    date: "12/02/2024",
    preview: ["/Moodboard1"],
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
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <ul>
        {project.competence.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </ul>
    </div>
  );
}
