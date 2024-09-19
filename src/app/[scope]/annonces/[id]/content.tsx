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

                    <p>
                        <AnnonceLines annonce={annonce}></AnnonceLines>
                    </p>
                </div>

            </Container>

        </>
    )
}
