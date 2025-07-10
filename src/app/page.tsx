"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Menu from "./components/menu/menu";
import Projects from "./components/projects/projects";
import ReactLenis, { useLenis } from "lenis/react";

export default function Home() {
  

  return (
    
      <ReactLenis>
          <div className="imposter-container">
             <div className="imposter-scroll unposter-1"></div>
             <div className="imposter-scroll unposter-2"></div>
             <div className="imposter-scroll unposter-3"></div>
          </div>
          <Projects />
          <p className="endofscroll">END OF SCROLL</p>
      </ReactLenis>
    

  );
}
