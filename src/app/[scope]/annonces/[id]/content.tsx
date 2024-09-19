"use client"

import { AppContext } from '@/app/providers';
import { Container } from '@/components/Container';
import { SimpleLayout } from '@/components/SimpleLayout'
import { Article } from '@/models/articles';
import { Color } from '@/models/colors';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { RiMarkdownFill } from '@remixicon/react';
import { useContext } from 'react';
import Markdown from 'react-markdown'
import { Carousel } from 'react-responsive-carousel';
import { AnnonceLines, ElementAnnonce } from '../content';
import { Annonce, BienNature, getAnnonceSurface, getAnnonceType, TypeTransaction } from '@/models/annonce';


function DpeImage({ classe, value }: { classe: string, value: number }) {
    return <div>
        <img src={`/diag/DPE__etiquette_energie${classe}.png`}></img>
        {value} Kwh/m².an
    </div>

}

function GesImage({ classe, value }: { classe: string, value: number }) {
    return <div className='relative'>
        <img src={`/diag/DPE__etiquetteGES_${classe}.png`}></img>
        <span className='absolute text-xl z-10 top-0 right-14'
            style={{
                top: classe == "A" ? "160px" :
                    classe == "B" ? "198px" :
                        classe == "C" ? "236px" :
                            classe == "D" ? "274px" :
                                classe == "E" ? "312px" :
                                    classe == "F" ? "350px" :
                                        classe == "G" ? "388px" : ""



            }}

        >{value} CO2/m².an</span>


    </div>

}

export default function AnnoncePageContent({ annonce }: { annonce: Annonce }) {

    let { colors } = useContext(AppContext)



    return (
        <>
            <Container className='relative z-30 mt-32 md:mt-80' >

                <Carousel className='mb-4 max-w-2xl '
                    showThumbs={false}
                    showStatus={false}>
                    {annonce.bien.photos.map((image) => (
                        <img src={`${image.href}`} className="h-full w-full object-cover object-center rounded-md" />
                    ))}
                </Carousel>

                <h1 className='text-2xl font-bold'
                    style={{ color: colors.attributes.accent }}>

                    {getAnnonceType(annonce)}- {annonce.bien.nature} - {getAnnonceSurface(annonce)}
                </h1>


                <div className=' rounded-md w-fit my-4'>
                    <h2 className='text-base font-bold mb-2'
                        style={{ color: colors.attributes.accent, }}>
                        Conditions de vente
                    </h2>

                    <p style={{ color: colors.attributes.accent }}>
                        <AnnonceLines annonce={annonce}></AnnonceLines>
                    </p>
                </div>



                <div className=' rounded-md w-fit my-4'>
                    <h2 className='text-base font-bold mb-2'
                        style={{ color: colors.attributes.accent, }}>
                        Description
                    </h2>

                    <p style={{ color: colors.attributes.accent }}>
                        {annonce.description}
                    </p>


                </div>


                <div className=' rounded-md w-fit my-4'>
                    <h2 className='text-base font-bold mb-2'
                        style={{ color: colors.attributes.accent, }}>
                        Diagnostic de performance énergétique
                    </h2>

                    <p style={{ color: colors.attributes.accent }}>
                        Date du diagnostic: {annonce.bien.performance_energetique.date_diagnostic} <br /><br />
                        <div className='grid grid-cols-1 md:grid-cols-2 align-start'>
                            <DpeImage classe={annonce.bien.performance_energetique.dpe_classe} value={annonce.bien.performance_energetique.dpe_value}></DpeImage>

                            <GesImage classe={annonce.bien.performance_energetique.ges_classe} value={annonce.bien.performance_energetique.ges_value}></GesImage>
                        </div>

                    </p>


                </div>

            </Container>

        </>
    )
}
