"use client"

import { AppContext } from '@/app/providers';
import { Container } from '@/components/Container';
import { RiHomeGearLine, RiShape2Line, RiShakeHandsLine, RiLayoutMasonryLine, RiBuilding2Line, RiBallPenLine, RiArrowUpLine, RiBuildingLine, RiWaterFlashLine, RiStackFill, RiShowersLine, RiHome2Line } from '@remixicon/react';
import React, { useContext } from 'react';
import Markdown from 'react-markdown'
import { Carousel } from 'react-responsive-carousel';
import { AnnonceLines, ElementAnnonce } from '../content';
import { Annonce, AnnonceObject, BienNature, Classes, currency, getAnnonceEtat, getAnnonceSurface, getAnnonceType, TypeTransaction } from '@/models/annonce';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


function DpeImage({ classe, value, gesValue }: { classe: Classes, value: number, gesValue: number }) {

    let dpeClasses: { [key: string]: string } = {
        [Classes.A]: "#00a774",
        [Classes.B]: "#00bb54",
        [Classes.C]: "#4ac57b",
        [Classes.D]: "#fdeb00",
        [Classes.E]: "#ffbc00",
        [Classes.F]: "#ff882f",
        [Classes.G]: "#ec0118"
    }

    let defaultClasses = [Classes.G, Classes.F, Classes.E, Classes.D, Classes.C, Classes.B, Classes.A]

    return (
        <div className='w-full '>
            <p className='text-base'>Diagnostic de performance énergétique (DPE)</p>

            <div className='relative w-full flex items-center gap-1'>

                {Object.keys(dpeClasses).map((dpeClasse, index) => {
                    return <div key={index} className={`h-3 flex items-center justify-center w-full rounded-sm ${classe == dpeClasse && "h-8"} ${index == 0 ? "rounded-l-lg" : ""} ${index == defaultClasses.length - 1 ? "rounded-r-lg" : ""}`} style={{ background: dpeClasses[dpeClasse] }} >

                        {classe == dpeClasse &&
                            <span className='text-xl font-bold'>{classe}</span>
                        }

                    </div>
                })
                }
            </div>
            <p className='text-sm'>Consommation:  {value} Kwh/m².an</p>
        </div>
    )



}



function GesImage({ classe, value }: { classe: Classes, value: number }) {

    let GesClasses: { [key: string]: string } = {
        [Classes.A]: "#a3dbfc",
        [Classes.B]: "#8ab5d2",
        [Classes.C]: "#5e708d",
        [Classes.D]: "#5e708d",
        [Classes.E]: "#4d5272",
        [Classes.F]: "#393550",
        [Classes.G]: "#291b35"
    }

    let defaultClasses = [Classes.G, Classes.F, Classes.E, Classes.D, Classes.C, Classes.B, Classes.A]

    return (<div className='w-full'>
        <p className='text-base'>Indice d'émission de gaz à effet de serre (GES)</p>

        <div className='relative w-full flex items-center gap-1'>
            {Object.keys(GesClasses).map((dpeClasse, index) => {
                return <div className={`h-3 flex items-center justify-center w-full rounded-sm ${classe == dpeClasse && "h-8"} ${index == 0 ? "rounded-l-lg" : ""} ${index == defaultClasses.length - 1 ? "rounded-r-lg" : ""}`} style={{ background: GesClasses[dpeClasse] }} >

                    {classe == dpeClasse &&
                        <span className='text-xl font-bold'>{classe}</span>
                    }

                </div>
            })
            }
        </div>

        <p className='text-sm'>Émissions: {value} kg CO2/m².an </p>
    </div>
    )




}


export default function AnnoncePageContent({ annonceObject }: { annonceObject: AnnonceObject }) {

    let { colors } = useContext(AppContext)

    let annonce = annonceObject.attributes.object
    let photos = annonceObject.attributes.photos || { data: null }


    return (
        <>
            <Container className='relative z-30 mt-32 md:mt-60 ' >
                <div className='w-full flex flex-col lg:flex-row'>
                    <div className='w-full lg:w-[60%] shrink-0'>
                        {
                            (photos.data && photos.data.length > 0) &&
                            <Carousel className='w-full max-w-4xl'
                                showStatus={false}>
                                {photos.data.map((image, index) => (
                                    <img key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`} className="h-full w-full object-cover object-center aspect-video rounded-md" />
                                ))}
                            </Carousel>

                        }
                        <h1 className='text-3xl font-bold'
                            style={{ color: colors.attributes.accent }}>
                            {annonce.bien.nature == BienNature.Autre ? "Bien" : annonce.bien.nature}  {annonce.transaction == TypeTransaction.location ? annonce.meuble ? " meublé " : "" + " à louer" : " à vendre"}
                            <p className='text-sm'>à {annonce.bien.commune.libelle} ({annonce.bien.commune.code_postal})</p>
                        </h1>


                        <div className=' rounded-md w-full  my-10'
                            style={{ color: colors.attributes.accent, }}
                        >
                            <h2 className='text-2xl font-bold mb-2'>
                                Détails du prix
                            </h2>

                            <p style={{ color: colors.attributes.indicator }}
                                className='mt-4 w-full'>
                                <AnnonceLines annonce={annonce}></AnnonceLines>
                            </p>
                        </div>



                        <div className=' rounded-md w-fit my-10 w-full'
                            style={{ color: colors.attributes.accent }}>

                            <h2 className='text-2xl font-bold white'>
                                Description du bien
                            </h2>
                            <p style={{ color: colors.attributes.indicator }}
                                className=' whitespace-pre-line'>
                                {annonce.description}
                            </p>

                        </div>



                        <div className=' rounded-md w-fit my-10 w-full'
                            style={{ color: colors.attributes.accent }}>

                            <h2 className='text-2xl font-bold'>
                                Caractéristiques
                            </h2>
                            <p style={{ color: colors.attributes.indicator }}
                                className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 w-full gap-2 mt-4'>

                                <CaracteristiqueElement value={getAnnonceType(annonce)} Icon={RiShakeHandsLine} />
                                {annonce.bien.etat && (
                                    <CaracteristiqueElement value={getAnnonceEtat(annonce)} Icon={RiBuildingLine} />
                                )}
                                <CaracteristiqueElement value={getAnnonceSurface(annonce) + "m²"} Icon={RiShape2Line} />
                                {annonce.transaction === TypeTransaction.location && annonce.meuble && (
                                    <CaracteristiqueElement value={"Meublé"} Icon={RiHomeGearLine} />
                                )}
                                <CaracteristiqueElement value={annonce.bien.nature} Icon={RiHome2Line} />
                                {annonce.bien.nb_pieces && (
                                    <CaracteristiqueElement value={annonce.bien.nb_pieces + " pièces"} Icon={RiLayoutMasonryLine} />
                                )}
                                {annonce.bien.nb_chambres && (
                                    <CaracteristiqueElement value={annonce.bien.nb_chambres + " chambres"} Icon={RiHomeGearLine} />
                                )}
                                {annonce.bien.nb_sdb && (
                                    <CaracteristiqueElement value={annonce.bien.nb_sdb + " salles de bain"} Icon={RiShowersLine} />
                                )}
                                {annonce.bien.nb_salles_eau && (
                                    <CaracteristiqueElement value={annonce.bien.nb_salles_eau + " salles d'eau"} Icon={RiWaterFlashLine} />
                                )}
                                {annonce.bien.nb_niveaux && (
                                    <CaracteristiqueElement value={annonce.bien.nb_niveaux + " étages"} Icon={RiStackFill} />
                                )}
                                {annonce.bien.balcon && (
                                    <CaracteristiqueElement value={"Balcon"} Icon={RiArrowUpLine} />
                                )}
                                {annonce.bien.terrasse && (
                                    <CaracteristiqueElement value={"Terrasse"} Icon={RiArrowUpLine} />
                                )}
                                {annonce.bien.cave && (
                                    <CaracteristiqueElement value={"Cave"} Icon={RiBuildingLine} />
                                )}
                                {annonce.bien.cuisine && (
                                    <CaracteristiqueElement value={"Cuisine équipée"} Icon={RiHomeGearLine} />
                                )}
                                {annonce.bien.piscine && (
                                    <CaracteristiqueElement value={"Piscine"} Icon={RiWaterFlashLine} />
                                )}
                                {annonce.bien.surface_carrez && (
                                    <CaracteristiqueElement value={annonce.bien.surface_carrez + " m² carrez"} Icon={RiShape2Line} />
                                )}
                                {annonce.bien.ascenseur && (
                                    <CaracteristiqueElement value={"Ascenseur"} Icon={RiArrowUpLine} />
                                )}


                            </p>



                        </div>


                        <div className=' rounded-md w-fit my-10 w-full'
                            style={{ color: colors.attributes.accent }}>
                            <h2 className='text-2xl font-bold '>
                                Diagnostics
                            </h2>
                            {(annonce.bien.performance_energetique && (Object.keys(annonce.bien.performance_energetique)).length > 0) ?
                                <div>
                                    <div className='flex items-center mt-4 mb-4'
                                        style={{ color: colors.attributes.indicator, }}
                                    >
                                        <RiHomeGearLine className='h-5 w-5 mr-2'></RiHomeGearLine>
                                        Effectué le :  {new Date(annonce.bien.performance_energetique.date_diagnostic).toLocaleDateString()}
                                    </div>
                                    <div className='flex sm:items-center gap-8 flex-col sm:flex-row'
                                        style={{ color: colors.attributes.indicator, }}
                                    >
                                        <DpeImage classe={annonce.bien.performance_energetique.dpe_classe} value={annonce.bien.performance_energetique.dpe_value} gesValue={annonce.bien.performance_energetique.ges_value}></DpeImage>
                                        <GesImage classe={annonce.bien.performance_energetique.ges_classe} value={annonce.bien.performance_energetique.ges_value}></GesImage>
                                    </div>

                                </div> : <div className='mt-4'>DPE non disponible</div>
                            }

                        </div>


                        <span className='text-sm mt-8'
                            style={{ color: colors.attributes.hint }}
                        >
                            *HN : Honoraire de négociation, hors frais de rédaction d'acte.<br />
                            Pour les ventes, les prix sont affichés hors droits d'enregistrement et de publicité foncière.
                        </span>
                    </div>

                    <div className='w-full lg:w-[40%]  h-fit sticky top-24 mt-8 lg:mt-6 ml-0 lg:ml-8'>
                        {annonce.contact.nom && (
                            <div className='rounded-md p-4'
                                style={{ background: colors.attributes.tintedBackground }}>
                                <h2 className='text-xl font-bold'
                                    style={{ color: colors.attributes.accent }}
                                >Contact</h2>
                                <p style={{ color: colors.attributes.indicator }}>{annonce.contact.nom}</p>
                                <a href={`tel: ${annonce.contact.telephone}`} style={{ color: colors.attributes.indicator }}>{annonce.contact.telephone}</a><br />
                                <a href={`mailto: ${annonce.contact.email}`} style={{ color: colors.attributes.indicator }}>{annonce.contact.email}</a>
                            </div>)
                        }

                    </div>


                </div>

            </Container >

        </>
    )
}



function CaracteristiqueElement({ value, Icon }: { value: string | number, Icon: any }) {
    return (
        <div className='flex items-center gap-2'>
            <Icon className='h-5 w-5'></Icon>
            <span>{value}</span>
        </div>
    )
}