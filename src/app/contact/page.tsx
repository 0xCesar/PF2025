
"use client";
import gsap from 'gsap';
import Image from 'next/image'
import './contact.css'
import { Poppins } from 'next/font/google';
import { useEffect, useRef } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})

export default function Contact() {

    const titleRef = useRef(null);
    const textRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const linkRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.from(
          titleRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 2,
            ease: "expo.out",
          },
       
        ).from(
          textRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=1.25")
          .from(
          textRef1.current,
          {
            y: 25,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.75")
          .from(
          textRef2.current,
          {
            y: 25,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.75")
          .from(
          linkRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.75")
      }, []);
    return <div className='contact-container'>

        <div className='contact-content'>
          <h3 ref={titleRef}>Contact</h3>
          <p ref={textRef}>Got a project in mind or just want to say hello? </p>
          <p ref={textRef1}>I’m always open to new ideas, collaborations, or freelance opportunities — whether you're a startup, an agency, or an individual.</p>

          <p ref={textRef2}>Just drop me a message and let’s build something great together.</p>

<a ref={linkRef} className="hover-link" href="mailto:contact@cesar-saintlo.fr">contact@cesar-saintlo.fr</a>


        </div>
        <div className='contact-image'>
          <Image 
            src={'/assets-about/contactflower.png'} 
            /*src={'/rose.png'}*/
            alt=''
            fill
            style={{ objectFit: 'cover' }}
            className="hover-project"
          />
        </div>
       
    </div> ;
  }