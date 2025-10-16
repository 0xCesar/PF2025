"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Menu from "./components/menu/menu";
import Projects from "./components/projects/projects";
import StatsMonitor from "./components/stats";

export default function Home() {
  

  return (
    
      
       <div>
          <Projects />
        {/*<StatsMonitor />*/}
       </div>

    

  );
}
