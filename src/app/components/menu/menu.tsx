"use client";


import React, {useState, useRef, useEffect} from "react";
import './menu.css';
import Link from "next/link";
import { gsap } from 'gsap';

export default function Menu() {


      useEffect(() => {
        console.log("test")
        const bloc1 = document.getElementsByClassName('firstmenuanim')
        const bloc2 = document.getElementsByClassName('scondmenuanim')

        const tl = gsap.timeline();

        tl.fromTo(bloc1, { y: '100%' }, { y: 0, duration: 0.25, stagger: 0.15})
            .fromTo(bloc2, { y: '100%' }, { y: 0, duration: 0.25, stagger: 0.15 });

      }, [])

    
return <header className="nav">
                    <div className="nav-sub nav-sub-one">
                    <Link href={'/'} className="hover-link ">
                      
                        <h2 className="firstmenuanim">César SAINT-LO</h2>
                        <div className="pre">
                           <p className="spe firstmenuanim">frontend developper</p>
                        </div>
                    
                    {/* Commentaire important */}
                    </Link>
                  
                    
                    <nav>
                        <ul>
                            <li className="hover-link "><Link className="scondmenuanim" href={'/about'}>About</Link></li>
                            <li className="hover-link "><Link className="scondmenuanim" href={'/labs'}>Labs</Link></li>
                            <li className="hover-link "><Link className="scondmenuanim" href={'/contact'}>Contact</Link></li>
                        </ul>
                    </nav>
                    </div>
    
                    <div className="nav-sub nav-sub-two">
                    
                    <a className="hover-link " href="mailto:contact@cesar-saintlo.fr"><p className="firstmenuanim">contact@cesar-saintlo.fr</p></a>
                    <ul className="link-ext">
                        <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://github.com/0xCesar">Github</a></li>
                        <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://www.behance.net/0xCesar">Behance</a></li>
                        <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://bsky.app/profile/ceiz.bsky.social">Bluesky</a> </li>
                        <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://www.instagram.com/cesar_stlo_dev/">Instagram</a> </li>
                    </ul>
                    </div>
            </header>
    }
