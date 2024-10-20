import { Color } from "@/models/colors";
import { Etude, SectionsTexte } from "@/models/etudes";
import { Button } from "./Button";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function TextSection({ section, etude }: { section: SectionsTexte, etude: Etude }) {

    let colors = etude.attributes.colors.data
    let scope = etude.attributes.slug
    let button = section.attributes.button
    let buttonHref = button?.href || ""
    if (buttonHref) {
        if (buttonHref.startsWith('/')) {
            buttonHref = "/" + scope + buttonHref
        } else if (buttonHref.startsWith('http')) {
            buttonHref = buttonHref
        } else {
            buttonHref = "/" + scope + '/' + buttonHref
        }
    }



    return <>


        <div className=' full py-8  w-full'>
            <div className='flex gap-8 w-full  flex-col lg:flex-row   max-w-7xl justify-between'>
                <div>
                    <h2 className=" text-3xl font-bold tracking-tight   text-4xl"
                        style={{ color: colors.attributes.accent }}
                    >
                        {section.attributes.title}
                    </h2>




                    <div className='text-base mt-6 whitespace-pre-line'
                        style={{ color: colors.attributes.indicator }}>
                        {section.attributes.content}

                    </div>


                    {button && (() => {
                        const buttonStyle = button.style || 'solid';

                        switch (buttonStyle) {
                            case 'solid':
                                return (
                                    <Button className="mt-4" href={buttonHref} style={{ background: colors.attributes.primary }}>
                                        {button.name}
                                    </Button>
                                );

                            case 'outline':
                                return (
                                    <Button
                                        className="mt-4"
                                        href={buttonHref}
                                        style={{ background: "transparent", borderColor: colors.attributes.primary, borderWidth: "1px", color: colors.attributes.primary }}
                                    >
                                        {button.name}
                                    </Button>
                                );

                            case 'plain':
                                return (
                                    <Link
                                        href={`/${scope}/equipe`}
                                        className="border-b border-indigo-400 w-fit mt-4 flex items-center"
                                        style={{ color: colors.attributes.primary, borderColor: colors.attributes.primary }}
                                    >
                                        Voir toute l'équipe <ChevronRightIcon className="h-4 w-4 ml-2" />
                                    </Link>
                                );

                            default:
                                return null;
                        }
                    })()}


                </div>

                {section.attributes.medias.data && section.attributes.medias.data.length > 0 &&

                    <Carousel className='mb-16 max-w-2xl block static'
                        showThumbs={false}
                        autoPlay={true}
                        interval={2000}
                        infiniteLoop={true}
                        showStatus={false}>
                        {section.attributes.medias.data.map((image, index) => (
                            <img key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`} className="h-full w-full object-cover object-center rounded-md" />
                        ))}
                    </Carousel>
                }

            </div>
        </div>
    </>

}