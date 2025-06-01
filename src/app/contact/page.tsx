import Image from 'next/image'

export default function Contact() {
    return <div>
        <p>Contact Page</p>
        <div>
        <Image 
          src={'/assets-about/contactflower.png'}
          alt=''
          fill
        />
        </div>
       
    </div> ;
  }