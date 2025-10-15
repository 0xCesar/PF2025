// src/app/projets/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import projects from "../../data/projects.json"; // adapte le path si besoin
import ProjectClient from "./projectClient";
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

  return (
    <div className="projectpage-container">
      <div className="projectpage-content">
        <h3>{project.title}</h3>
        <p>Context: {project.context}</p>
        <p>Skills Used & Developed: {project.skills}</p>
        <p>{project.description}</p>
      </div>

      <div className="projectpage-preview">
        <Image
          src={`/assets-projet/${project.slug}/img0.png`}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <ProjectClient slug={project.slug} previewCount={project.preview} />
    </div>
  );
}
