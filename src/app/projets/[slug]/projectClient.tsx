"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

gsap.registerPlugin(ScrollToPlugin);

export default function ProjectClient({
  slug,
  previewCount,
}: {
  slug: string;
  previewCount: number;
}) {
  useEffect(() => {
    gsap.from(".projectpage-content h3", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="projectpage-images-container">
      {Array.from({ length: previewCount }).map((_, i) => (
        <Image
          key={i}
          src={`/assets-projet/${slug}/img${i}.png`}
          alt={`Image ${i}`}
          width={1920}
          height={1080}
          className="projectpage-image"
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: '2svh',
          }}
        />
      ))}
    </div>
  );
}
