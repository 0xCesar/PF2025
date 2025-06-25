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
          <p>Got a project in mind or just want to say hello? </p>
<p>I’m always open to new ideas, collaborations, or freelance opportunities — whether you're a startup, an agency, or an individual.</p>

<p>Just drop me a message and let’s build something great together.</p>

<a className="hover-link" href="mailto:contact@cesar-saintlo.fr">contact@cesar-saintlo.fr</a>


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