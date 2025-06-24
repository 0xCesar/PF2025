"use client";


import React, {useState, useRef, useEffect} from "react";
import './landingMobile.css';


export default function LandingMobile() {

    

    
    return <div className="bodyMobile">
        <header>CESAR SAINT-LO</header>
        <section>
            <p>(visit this website on a desktop for full experience)</p>
            <img alt="" src={'/assets-about/contactflower.png'}/>

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
