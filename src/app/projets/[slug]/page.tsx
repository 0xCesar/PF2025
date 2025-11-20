// src/app/projets/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import projects from "../../data/projects.json"; // adapte le path si besoin
import ProjectClient from "./projectClient";
// @ts-ignore
import "./project.css";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage(props: any) {
  // safety: read params de façon non typée
  const params = props?.params ?? {};
  const slug = params?.slug;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) return notFound();
  console.log(project)

  return (
    <div className="projectpage-container">
        <div className="projectpage-content">
          <h2 className="project-title">{project.title}</h2>

          <p>{project.description}</p>

          <p className="project-data">Date : {project.date} </p>
          <p className="project-data">Context : {project.context}</p>
          <p className="project-data">Roles : {project.role}</p>
          <p className="project-data">Techs : {project.skills} </p>
        </div>

        <ProjectClient slug={project.slug} previewCount={project.preview} />
    </div>
    
  
  );
}
