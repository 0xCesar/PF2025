// components/StatsMonitor.jsx
"use client";

import { useEffect } from "react";
import Stats from "stats.js";

export default function StatsMonitor() {
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0); // 0: FPS, 1: MS, 2: MEM
    stats.dom.style.position = "fixed";
    stats.dom.style.left = "10px";
    stats.dom.style.top = "10px";
    document.body.appendChild(stats.dom);


    function animate() {
      stats.begin();
      // ton code d'animation pourrait être ici si tu veux mesurer plus précisément
      stats.end();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    return () => {
      stats.dom.remove();
    };
  }, []);

  return null; 
}
