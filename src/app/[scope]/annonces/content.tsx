'use client';

import { useContext, useEffect, useState } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayoutWithTitleFooter } from '@/components/SimpleLayout'
import { Annonce, AnnonceObject, getAnnoncePeriodicite, getAnnonceSurface, getAnnonceType, getAnnonceEtat, TypeHonoraires, TypeTransaction } from '@/models/annonce'
import Link from 'next/link';
import { Method, call } from '@/scripts/api';
import { ApiListResponse } from '@/models/other';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { currency } from '../../../models/annonce';
import { RiHomeGearLine, RiShape2Line, RiLayoutMasonryLine, RiArrowUpLine, RiBuildingLine, RiWaterFlashLine, RiStackFill, RiShowersLine, RiHome2Line, RiImage2Line } from '@remixicon/react';
import FiltresAnnonces from './components/filtres';
import { AppContext } from '@/app/providers';


function CaracteristiqueElement({ value, Icon }: { value: string | number, Icon: any }) {
  return (
    <div className='flex items-center gap-2'>
      <Icon className='h-5 w-5 flex-0 shrink-0'></Icon>
      <span>{value}</span>
    </div>
  )
}


export function ElementAnnonce({ annonceObject, shrinked = false }: { annonceObject: AnnonceObject, shrinked?: boolean }) {
  const { colors, scope } = useContext(AppContext);
  let annonce = annonceObject.attributes.object
  let photos = annonceObject.attributes.photos || { data: null }
  console.log(annonceObject.attributes.photos)

  return (
    <div className={`md:grid w-full md:grid-cols-5 md:items-start gap-8 ${shrinked ? "sm:!flex sm:!flex-col sm:!gap-2" : ""}`} >


      <Card.Eyebrow as="div" className="mt-1 md:block md:col-span-3 w-full">
        <div
          key={annonce.uuid}
          className="relative isolate flex flex-col justify-end overflow-hidden max-md:w-full"
        >
          {photos.data && photos.data.length > 0 ?
            <Carousel className='inset-0 h-full w-full object-cover select-none  -mb-6'
              showStatus={false}
              swipeable={true}
              emulateTouch={true}
            >
              {photos.data.map((image, index) => (
                <img key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`} className="h-full w-full object-cover object-center aspect-video rounded-md" />
              ))}
            </Carousel> :
            <div
              className=" inset-0 -z-10 h-full w-full object-cover bg-gray-200 aspect-video rounded-2xl flex items-center justify-center"
            >
              <RiHome2Line className='h-12 w-12 text-gray-400'></RiHome2Line>
            </div>
          }
        </div>
      </Card.Eyebrow>
      <Link href={`/${scope}/annonces/${annonce.uuid}`} className='md:col-span-2 '>
        <Card className="w-full ">
          <span
            className="relative z-20 mb-[12px] inline-flex items-center rounded-full bg-gray-600/40 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10"
            style={{
              color: colors.attributes.accent,
              background: colors.attributes.tintedBackground,
            }}
          >

            {getAnnonceType(annonce)}


          </span>

          <Card.Title style={{ color: colors.attributes.accent }}>

            {annonce.transaction == TypeTransaction.location ?
              <>{currency(annonce.loyer)} {annonce.charges_incluses ? "cc" : ""} / {getAnnoncePeriodicite(annonce.loyer_periodicite)} </>
              :
              annonce.transaction == TypeTransaction.vente_viager ?
                <>{currency(annonce.rente.montant)} / {getAnnoncePeriodicite(annonce.rente.periodicite)}</>
                :
                <>{currency(annonce.prix_hni)}</>}
          </Card.Title>

          <p
            className="relative z-20 font-semibold md:block dark:text-gray-200 text-base text-zinc-600 "
            style={{ color: colors.attributes.indicator }}
          >
            {annonce.bien.commune.libelle} - {annonce.bien.commune.code_postal}
          </p>

          {/* <p
          className="relative z-20 font-semibold  text-base flex items-center mt-2"
          style={{ color: colors.attributes.hint }}
        >
          <RiBuilding3Line className='h-5 w-5 mr-1'></RiBuilding3Line>
          {annonce.bien.nature}
        </p> */}

          <p
            className="relative z-20 text-base flex items-center mt-4"
            style={{ color: colors.attributes.hint }}
          >
            {annonce.description.length > 120 ? annonce.description.substring(0, 120) + "..." : annonce.description}

          </p>

          <div style={{ color: colors.attributes.indicator }}
            className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 w-full gap-2 mt-4'>

            {annonce.bien.etat && (
              <CaracteristiqueElement value={getAnnonceEtat(annonce)} Icon={RiBuildingLine} />
            )}
            <CaracteristiqueElement value={getAnnonceSurface(annonce) + "m²"} Icon={RiShape2Line} />
            {annonce.bien.nb_pieces && (
              <CaracteristiqueElement value={annonce.bien.nb_pieces + " pièces"} Icon={RiLayoutMasonryLine} />
            )}
            {annonce.bien.nb_chambres && (
              <CaracteristiqueElement value={annonce.bien.nb_chambres + " chamb."} Icon={RiHomeGearLine} />
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
              <CaracteristiqueElement value={annonce.bien.surface_carrez + "m² carrez"} Icon={RiShape2Line} />
            )}
            {annonce.bien.ascenseur && (
              <CaracteristiqueElement value={"Ascenseur"} Icon={RiArrowUpLine} />
            )}


          </div>

          <Card.Cta>Voir l'annonce</Card.Cta>
        </Card>
      </Link>
    </div >
  );
}



export default function AnnoncesContent({ annonces }: { annonces: AnnonceObject[] }) {
  const { colors } = useContext(AppContext)

  let [filteredAnnonces, setFilteredAnnonces] = useState<AnnonceObject[]>(annonces)

  let [filtres, setFiltres] = useState<{ [key: string]: string | number }>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    async function fetchAnnonces() {
      setLoading(true)
      setFilteredAnnonces([])
      let filterString = Object.keys(filtres).map((key) => filtres[key] ? `filters${key}=${filtres[key]}` : "").join("&")
      let filteredAnnonces: ApiListResponse<AnnonceObject> = await call("/api/annonces?sort[0]=createdAt:desc&pagination[pageSize]=1000&" + filterString, Method.get)
      setFilteredAnnonces(filteredAnnonces.data)
      setLoading(false)

    }
    fetchAnnonces()
  }, [filtres])



  return (
    <SimpleLayoutWithTitleFooter
      title="Annonces Immobilières"
      footer={
        <FiltresAnnonces filtres={filtres} setFiltres={setFiltres} />}
    >
      <div className="md:border-l md:pl-6 " style={{ borderColor: colors.attributes.border }}>
        <div className="flex w-full flex-col space-y-16">
          {
            filteredAnnonces && filteredAnnonces.map((annonce) => {
              return (
                <ElementAnnonce key={annonce.id} annonceObject={annonce} />
              )
            })
          }
          {!filteredAnnonces || filteredAnnonces.length == 0 && !loading && <>
            <div className='w-full flex items-center justify-center text-gray-600'>
              Aucune annonce trouvée avec ces critères...
            </div>
          </>}
          {loading && <>
            <div className='w-full flex items-center justify-center text-gray-600'>
              Chargement de vos annonces...
            </div>
          </>}
        </div>
      </div>
    </SimpleLayoutWithTitleFooter>
  )
}


export function AnnonceLines({ annonce }: { annonce: Annonce }) {
  return (
    <>
      {
        annonce.transaction == TypeTransaction.location &&
        <>

          <div className='w-full flex items-center justify-between text-base font-bold'>
            <div>Loyer</div>
            <div className='text-right'>{currency(annonce.loyer)} {annonce.charges_incluses ? "cc" : ""} / {getAnnoncePeriodicite(annonce.loyer_periodicite)}</div>
          </div>

          {annonce.montant_charges != null &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div>Charges</div>
                <div className='text-right'>{currency(annonce.montant_charges)} / an</div>
              </div>
            </>}


          {annonce.montant_etat_lieux != null &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div>État des lieux</div>
                <div className='text-right'>{currency(annonce.montant_etat_lieux)}</div>
              </div>
            </>}

          {annonce.montant_depot_garantie != null &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div >Dépot de garantie</div>
                <div className='text-right'>{currency(annonce.montant_depot_garantie)}</div>
              </div>
            </>}


        </>
      }


      {(annonce.transaction == TypeTransaction.vente_traditionnelle || annonce.transaction == TypeTransaction.vente_immo_interactif) &&
        <>
          <div className='w-full flex items-center justify-between text-base font-bold'>
            <div>Prix</div>
            <div className='text-right'>{currency(annonce.prix_hni)}</div>
          </div>

          {annonce.type_honoraires == TypeHonoraires.charge_acquereur &&
            <>
              <div className='w-full flex items-center justify-between  opacity-80'>
                <div className='pl-2 border-l'>Dont Prix de Vente</div>
                <div className='text-right'>{currency(annonce.prix_nv)}</div>
              </div>

              <div className='w-full flex items-center justify-between  opacity-80'>
                <div className='pl-2 border-l'>Dont HN*</div>
                <div className='text-right'>{currency(annonce.honoraires)} ({annonce.honoraires_pourcentage}%) </div>
              </div>
            </>}
        </>
      }


      {
        annonce.transaction == TypeTransaction.vente_viager &&
        <>
          <div className='w-full flex items-center justify-between text-base font-bold'>
            <div>Rente</div>
            <div className='text-right'>{currency(annonce.rente.montant)} / {getAnnoncePeriodicite(annonce.rente.periodicite)}</div>
          </div>

          {
            annonce.bouquet &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div> Bouquet</div>
                <div className='text-right'>{currency(annonce.bouquet_hni)} </div>
              </div>

              {annonce.type_honoraires == TypeHonoraires.charge_acquereur &&
                <>
                  <div className='w-full flex items-center justify-between  opacity-80'>
                    <div className='pl-2 border-l'>Dont Prix Bouqet</div>
                    <div className='text-right'>{currency(annonce.bouquet_nv)} </div>
                  </div>

                  <div className='w-full flex items-center justify-between  opacity-80'>
                    <div className='pl-2 border-l'>Dont HN sur bouquet*</div>
                    <div className='text-right'>{currency(annonce.honoraires)} ({annonce.honoraires_pourcentage}%) </div>
                  </div>
                </>
              }
            </>
          }
          {
            annonce.charges_copropriete &&
            <>
              <div className='w-full flex items-center justify-between'>
                <div>Charges de copropriété</div>
                <div className='text-right'>{currency(annonce.charges_copropriete)} / an</div>
              </div>
            </>
          }

        </>
      }

    </>
  )
}