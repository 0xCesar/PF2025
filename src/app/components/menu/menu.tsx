"use client";


import React, {useState, useRef, useEffect} from "react";
import './menu.css';
import Link from "next/link";

export default function Menu() {

    

    
    return <header className="nav">
                    <div className="nav-sub nav-sub-one">
                    <Link href={'./'}><h2>César SAINT-LO</h2></Link>
                    <nav>
                        <ul>
                            <li className="hover-link"><Link href={'/about'}>About</Link></li>
                            <li className="hover-link"><Link href={'/labs'}>Labs</Link></li>
                            <li className="hover-link"><Link href={'/contact'}>Contact</Link></li>
                        </ul>
                    </nav>
                    </div>
    
                    <div className="nav-sub nav-sub-two">
                    
                    <a>contact@cesar-saintlo.fr</a>
                    <ul className="link-ext">
                        <li className="hover-link"><a href="">Github</a></li>
                        <li className="hover-link"><a href="">Behance</a></li>
                        <li className="hover-link"><a href="">Bluesky</a> </li>
                        <li className="hover-link"><a href="">Instagram</a> </li>
                    </ul>
                    </div>
            </header>
    }
