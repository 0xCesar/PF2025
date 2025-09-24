"use client";

import Image from 'next/image'
import './about.css'
import { Poppins } from 'next/font/google'
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})


export default function About() {

    const titleRef = useRef(null);
    const textRef = useRef(null);
    const textRef2 = useRef(null);
  
    useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    const children = Array.from(titleRef.current.children);
 
    children.forEach((child, i) => {
      tl.from(child, {
        y: 50,
        opacity: 0,
        duration: 2,
          ease: "expo.out",
      }, i * 0.2); // petit décalage entre chaque mot
    });
    tl.from(
      textRef.current,
      {
        y: 25,
        opacity: 0,
        duration: 1,
      },
      "-=1.25" 
    );
    tl.from(
      textRef2.current,
      {
        y: 25,
        opacity: 0,
        duration: 1,
      },
      "-=0.75" 
    );
  }, []);

    return <div className="about-container">
            <div className={`${poppins.variable} about-info`}>
              <h3 ref={titleRef} className="about-title"> 
                <span>INDEPENDANT</span>
                <span> WEB DEVELOPPER</span>
                <span> & DESIGNER</span>
              </h3>
              
              <p ref={textRef}>
              Hi, I'm César, a freelancer. I love to build websites that are clean, responsive, with a touch of motion</p>
              <br/><br/>
              <p ref={textRef2}> I’m always looking to take on new challenges. Whether it’s collaborating with a team or handling a solo project, I care about delivering work that’s solid and well-thought-out. </p>
            </div>
          
            <div className="about-image">
              <div className='about-image-1'>
                <Image
                  fill
                  src={'/assets-about/me.png'}
                  alt=''
                  className="object-cover"
                />
                <p className={`${poppins.variable}`}>From Paris, France</p>
              </div>
              <div className='about-image-2'>
                <Image
                  className="object-cover"
                  fill
                  src={'/assets-about/me2.png'}
                  alt=''
                />
              </div>             
            </div>
        </div>
  }