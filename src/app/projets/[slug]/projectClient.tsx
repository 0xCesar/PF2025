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
    <>
      {Array.from({ length: previewCount }).map((_, i) => {
        if (i % 2 !== 0) return null;

        return (
          <div key={i} className="projectpage-image-wrapper">
            <Image
              src={`/assets-projet/${slug}/img${i + 1}.png`}
              alt={`Image ${i + 1}`}
              width={800}
              height={600}
              className="projectpage-image"
            />
            {(i + 1) < previewCount && (
              <Image
                src={`/assets-projet/${slug}/img${i + 2}.png`}
                alt={`Image ${i + 2}`}
                width={800}
                height={600}
                className="projectpage-image"
              />
            )}
          </div>
        );
      })}
    </>
  );
}
