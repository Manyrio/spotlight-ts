import { Metadata } from 'next'
import ContactContent from './content'



// either Static metadata
export const metadata: Metadata = {
  title: "Contatez-nous",
}


export default function Contact() {
  return (

    <ContactContent></ContactContent>
  )
}
