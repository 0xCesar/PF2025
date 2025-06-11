import Image from 'next/image'
import './contact.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',   
})

export default function Contact() {
    return <div className='contact-container'>

        <div className='contact-content'>
          <h3>Contact</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>
        <div className='contact-image'>
          <Image 
            src={'/assets-about/contactflower.png'}
            alt=''
            fill
            style={{ objectFit: 'cover' }}
            className="hover-project"
          />
        </div>
       
    </div> ;
  }