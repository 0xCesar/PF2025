"use client";


import React, {useState, useRef, useEffect} from "react";
import './menu.css';
import Link from "next/link";

export default function Menu() {

    

    
    return <header className="nav">
                    <div className="nav-sub nav-sub-one">
                    <div>
                        <Link href={'/'}><h2>César SAINT-LO</h2></Link>
                        <p className="spe">front developper</p>
                    </div>    
                    
                    
                    <nav>
                        <ul>
                            <li className="hover-link"><Link href={'/about'}>About</Link></li>
                            <li className="hover-link"><Link href={'/labs'}>Labs</Link></li>
                            <li className="hover-link"><Link href={'/contact'}>Contact</Link></li>
                        </ul>
                    </nav>
                    </div>
    
                    <div className="nav-sub nav-sub-two">
                    
                    <a className="hover-link" href="mailto:contact@cesar-saintlo.fr">contact@cesar-saintlo.fr</a>
                    <ul className="link-ext">
                        <li className="hover-link"><a target="_blank" href="https://github.com/0xCesar">Github</a></li>
                        <li className="hover-link"><a target="_blank" href="https://www.behance.net/0xCesar">Behance</a></li>
                        <li className="hover-link"><a target="_blank" href="https://bsky.app/profile/ceiz.bsky.social">Bluesky</a> </li>
                        <li className="hover-link"><a target="_blank" href="https://www.instagram.com/cesar_stlo_dev/">Instagram</a> </li>
                    </ul>
                    </div>
            </header>
    }
