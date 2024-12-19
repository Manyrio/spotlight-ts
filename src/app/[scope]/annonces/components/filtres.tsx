import { AppContext } from "@/app/providers"
import { BienNature, TypeTransaction, translateAnnonceType } from "@/models/annonce"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useState } from "react"
import Contact from "./contact"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function FiltresAnnonces({ filtres, setFiltres }: { filtres: { [key: string]: string | number }, setFiltres: (value: { [key: string]: string | number }) => void }) {

    const [open, setOpen] = useState(false)
    const { colors } = useContext(AppContext)

    return (
        <section aria-labelledby="filter-heading" className=" pt-6 w-full">
            <Contact />

            <h2 id="filter-heading" className="sr-only">
                Filtres
            </h2>

            <div className="flex items-start gap-4 max-lg:gap-8 flex-wrap">


                {DropDown({ translate: translateAnnonceType, title: "Transaction", enumObject: TypeTransaction, setSelected: (value) => setFiltres({ ...filtres, " [transaction][$eq]": value }) })}

                {DropDown({ title: "Type de Bien", enumObject: BienNature, setSelected: (value) => setFiltres({ ...filtres, "[natureBien][$eq]": value }) })}




                <div className='cursor-pointer font-medium  flex items-center ' onClick={() => setOpen(!open)}
                    style={{ color: colors.attributes.indicator }}
                >Plus de critères
                    <ChevronDownIcon className='h-5 w-5'
                        style={{ color: colors.attributes.indicator }}
                    ></ChevronDownIcon>
                </div>

            </div>

            <div className='mt-8'>

                {open && <div className="flex items-start justify-start max-lg:gap-4 gap-8 flex-wrap">


                    <div>

                        <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                            style={{ color: colors.attributes.indicator }}
                        >
                            Localisation (code postal / ville)
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFiltres({ ...filtres, "[localisation][$eq]": e.target.value })}
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                            />
                        </div>
                    </div>


                    <div>

                        <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                            style={{ color: colors.attributes.indicator }}
                        >
                            Surface min (m²)
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFiltres({ ...filtres, "[surface][$gte]": e.target.value })}
                                type="number"
                                placeholder='0'
                                min={9}
                                max={1000}
                                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                            />
                        </div>
                    </div>



                    <div>

                        <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                            style={{ color: colors.attributes.indicator }}
                        >
                            Surface max (m²)
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFiltres({ ...filtres, "[surface][$lte]": e.target.value })}
                                type="number"
                                placeholder='0'
                                min={9}
                                max={1000}
                                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                            />
                        </div>
                    </div>






                    <div>

                        <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                            style={{ color: colors.attributes.indicator }}
                        >
                            Prix min (€)
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFiltres({ ...filtres, "[prix][$gte]": e.target.value })}
                                type="number"
                                placeholder='0'
                                min={9}
                                max={1000}
                                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                            />
                        </div>
                    </div>



                    <div>

                        <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                            style={{ color: colors.attributes.indicator }}
                        >
                            Prix max (€)
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFiltres({ ...filtres, "[prix][$lte]": e.target.value })}
                                type="number"
                                placeholder='0'
                                min={9}
                                max={1000}
                                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                            />
                        </div>
                    </div>




                    <div>

                        <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                            style={{ color: colors.attributes.indicator }}
                        >
                            Nombre de pièces min
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFiltres({ ...filtres, "[nombrePieces][$gte]": e.target.value })}
                                type="number"
                                placeholder='0'
                                min={9}
                                max={1000}
                                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                            />
                        </div>
                    </div>



                    <div>

                        <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                            style={{ color: colors.attributes.indicator }}
                        >
                            Nombre de pièces max
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={(e) => setFiltres({ ...filtres, "[nombrePieces][$lte]": e.target.value })}
                                type="number"
                                placeholder='0'
                                min={9}
                                max={1000}
                                className="bg-gray-600/40  border-[1px] block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                            />
                        </div>
                    </div>



                </div>
                }
            </div>
        </section>
    )
}



function DropDown({ title, enumObject, setSelected, translate }: { title: string, enumObject: any, setSelected: (value: string) => void, translate?: (value: any) => void }) {
    const { colors } = useContext(AppContext)

    let [selection, setSelection] = useState<string>()

    useEffect(() => {
        if (selection) setSelected(selection)


    }, [selection])

    return (

        <Menu as="div" className="relative inline-block dark:text-gray-200 text-left rounded-md ">
            <div>
                <MenuButton className="group inline-flex justify-center dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-gray-700 text-gray-900"

                    style={{ color: colors.attributes.indicator }}
                >
                    {selection ? selection : title}
                    <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 dark:text-gray-200 text-gray-400  text-gray-500"
                        style={{ color: colors.attributes.indicator }}
                        aria-hidden="true"
                    />
                </MenuButton>
            </div>

            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute left-0 z-30 mt-2 w-fit origin-top-left rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <div className="rounded-md overflow-hidden"
                        style={{ background: colors.attributes.tintedBackground }}
                    >
                        {enumObject &&
                            Object.keys(enumObject).map((key) => (
                                <MenuItem key={key}>
                                    {({ active }) => (
                                        <div
                                            onClick={() => setSelection(enumObject[key])}
                                            style={{ color: colors.attributes.indicator }}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 dark:text-gray-200 text-sm font-medium dark:text-gray-200 text-gray-900 cursor-pointer',
                                            )}
                                        >
                                            {translate ?
                                                translate(enumObject[key])
                                                :
                                                enumObject[key]}
                                        </div>
                                    )}
                                </MenuItem>
                            ))
                        }


                    </div>
                </MenuItems>
            </Transition>
        </Menu>)
}
