"use client";

import { useEffect, useState } from "react";

import Menu from "./menu/menu";
import Cursor from "./cursor/cursor";
import LandingMobile from "./landingMobile/landingMobile"; 
import ReactLenis, { useLenis } from "lenis/react";




export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
/*
  if (isMobile) {
    return <LandingMobile />;
  }*/

  return (
    <>
      <Menu />
 

          {children}

      <Cursor />
    </>
  );
}
