"use client";


import React, {useState, useRef, useEffect} from "react";
import './landingMobile.css';


export default function LandingMobile() {

    

    
    return <div className="bodyMobile">
        <header>
            <p>CESAR SAINT-LO</p>
        </header>
        <section>
            <p>(visit this website on a desktop for full experience)</p>
            <img alt="" src={'/assets-about/contactflower.png'}/>
            <p>Cesar is a french developer that specialize in web developpement and integrating motion and 3D elements</p>
        </section>
        <footer>
            <p>Social Link :</p>
            <ul className="link-ext">
                        <li><a target="_blank" href="https://github.com/0xCesar">Github</a></li>
                        <li><a target="_blank" href="https://www.behance.net/0xCesar">Behance</a></li>
                        <li><a target="_blank" href="https://bsky.app/profile/ceiz.bsky.social">Bluesky</a> </li>
                        <li><a target="_blank" href="https://www.instagram.com/cesar_stlo_dev/">Instagram</a> </li>
            </ul>
        </footer>
    </div>
    }
