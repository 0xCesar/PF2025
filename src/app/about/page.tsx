"use client";

import Image from 'next/image'
import './about.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})


export default function About() {
    return <div className="about-container">
            <div className={`${poppins.variable} about-info`}>
              <h3 className="about-title">WEB DEVELOPPER AND DESIGNER</h3>
              <p>
              Hi, I'm César, a freelancer. I love to build websites that are clean, responsive, with a touch of motion
              <br/><br/>
              I’m always looking to take on new challenges. Whether it’s collaborating with a team or handling a solo project, I care about delivering work that’s solid and well-thought-out. </p>
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