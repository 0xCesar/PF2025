"use client";


import React, {useState, useRef, useEffect} from "react";
import './menu.css';
import Link from "next/link";
import { gsap } from 'gsap';

export default function Menu() {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    

        useEffect(() => {
            const checkMobile = () => setIsMobile(window.innerWidth <= 768);
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }, []);

      useEffect(() => {

        const bloc1 = document.getElementsByClassName('firstmenuanim')
        const bloc2 = document.getElementsByClassName('scondmenuanim')

        const tl = gsap.timeline();

        tl.fromTo(bloc1, { y: '100%' }, { y: 0, duration: 0.25, stagger: 0.15})
            .fromTo(bloc2, { y: '100%' }, { y: 0, duration: 0.25, stagger: 0.15 });

        

      }, [])

      useEffect(() => {
    if (!menuRef.current) return;
    console.log(menuRef.current);
    if (menuOpen) {
      gsap.to(menuRef.current, {
        top: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        top: "-100svh",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);


if (isMobile) {
    return <header className="nav">
                    <div className="nav-sub nav-sub-one">
                    <Link href={'/'} className="hover-link ">
                      
                        <h2 className={`firstmenuanim ${menuOpen ? "whited-mobile" : ""}`}>César SAINT-LO</h2>
                        <div className={`pre ${menuOpen ? "whited-mobile" : ""}`}>
                           <p className="spe firstmenuanim">frontend developper</p>
                        </div>
                    
                    </Link>
                  
                    
                    <nav>   
                           <p className={`${menuOpen ? "whited-mobile" : ""}`} onClick={() => setMenuOpen((prev) => !prev)}>MENU</p>
                    </nav>
                    </div>
                <div className="menu-mobil" id="menu-mobil"  ref={menuRef}>
                    <ul>
                        <li  onClick={() => setMenuOpen((prev) => !prev)} className="hover-link "><Link className="scondmenuanim" href={'/'}>Home</Link></li>
                        <li onClick={() => setMenuOpen((prev) => !prev)}  className="hover-link fere"><Link className="scondmenuanim" href={'/about'}>About</Link></li>
                        {/*<li className="hover-link "><Link className="scondmenuanim" href={'/labs'}>Labs</Link></li>*/}
                        <li  onClick={() => setMenuOpen((prev) => !prev)} className="hover-link "><Link className="scondmenuanim" href={'/contact'}>Contact</Link></li>
                         {/*<a className="hover-link " href="mailto:contact@cesar-saintlo.fr"><p className="firstmenuanim">contact@cesar-saintlo.fr</p></a>*/}
                    </ul>

                    <footer>
                        <ul className="link-ext-mobil">
                            <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://github.com/0xCesar">Github</a></li>
                            <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://www.behance.net/0xCesar">Behance</a></li>
                            <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://bsky.app/profile/ceiz.bsky.social">Bluesky</a> </li>
                            <li className="hover-link "><a className="scondmenuanim" target="_blank" href="https://www.instagram.com/cesar_stlo_dev/">Instagram</a> </li>
                        </ul>
                    </footer>
                </div>
            </header>;
}
return <header className="nav">
                    <div className="nav-sub nav-sub-one">
                    <Link href={'/'} className="hover-link ">
                        <h2 className="firstmenuanim">César SAINT-LO</h2>
                        <div className="pre">
                           <p className="spe firstmenuanim">frontend developper</p>
                        </div>
                    </Link>
                  
                    
                    <nav>
                        <ul>
                            <li className="hover-link "><Link className="scondmenuanim" href={'/about'}>About</Link></li>
                            {/*<li className="hover-link "><Link className="scondmenuanim" href={'/labs'}>Labs</Link></li>*/}
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
