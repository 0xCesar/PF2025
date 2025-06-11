import React from "react";
import './projectsLabs.css';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})

export default function ProjectsLabs() {

  
    return <div className="labs-project" >
        <div className="labs-project-content">
            <h3 className={`${poppins.variable} labs-project-title`}>Mask Animation</h3>
            <p className={`${poppins.variable}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>
        <div className="labs-project-preview">
            <video width="320" height="240" autoPlay loop muted preload="none" className="previewVideo">
                        <source src="/assets-labs/maskAnimation.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
            </video>
             <div className={`${poppins.variable} labs-text-preview`}>
                <p>Mask Animation</p>
                <p>Jun 25’</p>
            </div>
        </div>
    </div>
    }
