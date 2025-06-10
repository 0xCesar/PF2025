"use client";

import Image from 'next/image'
import './labs.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})


export default function Labs() {
    return <div className="labs-container">
            <div className={`${poppins.variable} labs-info`}>
              <h3 className="labs-title">LABS</h3>
              <p className="labs-text">
              This is my digital playground — a space where I experiment with small ideas, creative code, and interactive concepts.
              <br/>    <br/>
                Some of these projects explore animations, UI/UX patterns, or just fun technical challenges. They're not always polished, but they help me learn, improve, and try new things outside of client work.
                <br/>    <br/>
                Feel free to explore — and maybe get inspired.
                </p>
            </div>
          
         
        </div>
  }