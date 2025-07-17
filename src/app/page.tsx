"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Menu from "./components/menu/menu";
import Projects from "./components/projects/projects";
import ReactLenis, { useLenis } from "lenis/react";

export default function Home() {
  

  return (
    
      
       <div>
          <Projects />
        <ReactLenis>
        </ReactLenis>
       </div>

    

  );
}
