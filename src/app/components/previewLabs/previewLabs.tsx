import React, {useState, useRef, useEffect, useCallback} from "react";
import './previewlabs.css';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})


export default function PreviewLabs() {

  
    return (
        <div>
            <video width="320" height="240" autoPlay loop muted preload="none" className="previewVideo">
                        <source src="/assets-labs/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
            </video>
            <div className={`${poppins.variable} labs-text-preview`}>
                <p>Pixel Shader Effect</p>
                <p>Jun 25’</p>
            </div>
        </div>

    )
 
    }
