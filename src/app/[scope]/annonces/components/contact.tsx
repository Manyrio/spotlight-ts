import { AppContext, NotificationColor } from "@/app/providers"
import { Button } from "@/components/Button"
import { Method, call } from "@/scripts/api"
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { RiErrorWarningLine } from "@remixicon/react"
import { useContext, useState } from "react"

export default function Contact() {
    const { etude, colors, addNotification } = useContext(AppContext)
    let [opened, setOpened] = useState(false)
    let [name, setName] = useState("")
    let [lastName, setLastName] = useState("")
    let [tel, setTel] = useState("")
    let [mail, setMail] = useState("")
    let [type, setType] = useState("Appartement")
    let [budget, setBudget] = useState("")
    let [loader, setLoader] = useState(false)

    async function submit(e: any) {
        e.preventDefault()
        if (loader) return
        setLoader(true)
        try {
            await call("/api/contact", Method.post, { etude: etude, message: `Budget: ${budget}€<br/>Type de bien recherché: ${type}<br/>Numéro de téléphone: ${tel}<br/>`, email: mail, name: name, lastName: lastName })

        } catch (error) {
            addNotification({ message: "Erreur lors de l'envoi", color: NotificationColor.red, title: "Erreur", Icon: RiErrorWarningLine })
            setLoader(false)
            return
        } finally {
            setLoader(false)
        }
        setOpened(false)
        addNotification({ title: "Demande envoyée avec succès ! ", message: "Nous reviendrons vers vous dans les plus brefs délais.", color: NotificationColor.green })

    }

    return (
        <div className="mt-6 w-full border-b pb-12 mb-12 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-8 dark:text-gray-200 text-base leading-7  sm:gap-y-16 lg:mx-0 lg:max-w-none "
            style={{ borderColor: colors.attributes.border }}>

            <div>
                <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900" style={{ color: colors.attributes.accent, borderColor: colors.attributes.primary }}>Marie-Sophie LEGASTELOIS</h3>
                <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600" style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}>
                    <a href={`tel:+33 2 96 83 96 84`} >+33 2 96 83 96 84</a>
                    <br />
                    <a href={`mailto:nego@notaires-caulnes.fr`}>nego@notaires-caulnes.fr</a>
                </address>
            </div>


            <div onClick={() => setOpened(true)} className='cursor-pointer'>
                <h3 className="border-l border-indigo-600 pl-6 font-semibold dark:text-gray-200 text-gray-900 flex items-center" style={{ color: colors.attributes.accent, borderColor: colors.attributes.primary }}>Envoyer ma demande <ChevronRightIcon className='h-6 w-6'></ChevronRightIcon></h3>
                <address className="border-l border-gray-200 pl-6 pt-2 not-italic dark:text-gray-200 text-gray-600" style={{ color: colors.attributes.hint, borderColor: colors.attributes.border }}>
                    <div>Demandez directement ce que vous recherchez</div>
                </address>
            </div>


            {opened &&

                <Dialog open={opened} onClose={() => setOpened(false)}
                    className="fixed z-[100] inset-0 flex w-screen items-center justify-center bg-black/30 p-4   "
                >
                    <div className="fixed inset-0 w-screen overflow-y-auto p-4 ">
                        <div className="flex min-h-full items-center justify-center">

                            <DialogPanel className="max-w-lg space-y-4  bg-white p-12 rounded-md"
                                style={{ color: colors.attributes.accent, background: colors.attributes.background }}
                            >
                                <DialogTitle className="font-bold"
                                    style={{ color: colors.attributes.accent }}
                                >Envoyer ma demande</DialogTitle>
                                <Description className={"pb-6"}
                                    style={{ color: colors.attributes.indicator }}

                                >Dites-nous ce que vous recherchez. Nous reviendrons vers vous rapidement.</Description>

                                <form onSubmit={(e) => submit(e)} >

                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="first-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                                                style={{ color: colors.attributes.indicator }}
                                            >
                                                Prénom
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="bg-gray-600/40 border-[1px]   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                                    style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="last-name" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                                                style={{ color: colors.attributes.indicator }}

                                            >
                                                Nom
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    value={lastName}
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="bg-gray-600/40 border-[1px]   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"
                                                    style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-2 ">
                                            <div className='mb-6'>
                                                <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                                                    style={{ color: colors.attributes.indicator }}

                                                >
                                                    Adresse e-mail
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        onChange={(e) => setMail(e.target.value)}
                                                        value={mail}
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        className="bg-gray-600/40 border-[1px]    block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                                                        style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                                                    />
                                                </div>
                                            </div>

                                            <div className='mb-6'>
                                                <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                                                    style={{ color: colors.attributes.indicator }}

                                                >
                                                    Numéro de téléphone
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        onChange={(e) => setTel(e.target.value)}
                                                        value={tel}
                                                        id="tel"
                                                        name="tel"
                                                        type="phone"
                                                        className="bg-gray-600/40 border-[1px]    block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                                                        style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                                                    />
                                                </div>
                                            </div>



                                            <div className='mb-6'>
                                                <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                                                    style={{ color: colors.attributes.indicator }}

                                                >
                                                    Type de bien recherché
                                                </label>
                                                <div className="mt-2.5">

                                                    <select
                                                        onChange={(e) => setType(e.target.value)}
                                                        value={type}
                                                        id="type"
                                                        name="type"
                                                        className="bg-gray-600/40 border-[1px]    block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                                                        style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}>

                                                        <option value="Appartement">Appartement</option>
                                                        <option value="Maison">Maison</option>
                                                        <option value="Terrain">Terrain</option>
                                                        <option value="Commerce">Commerce</option>
                                                        <option value="Immeuble">Immeuble</option>
                                                        <option value="Parking">Parking</option>
                                                        <option value="Autre">Autre</option>

                                                    </select>

                                                </div>
                                            </div>



                                            <div className='mb-6'>
                                                <label htmlFor="budget" className="block dark:text-gray-200 text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                                                    style={{ color: colors.attributes.indicator }}

                                                >
                                                    Budget maximum (€)
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        onChange={(e) => setBudget(e.target.value)}
                                                        value={budget}
                                                        id="budget"
                                                        name="budget"
                                                        type="number"
                                                        className="bg-gray-600/40  border-[1px]   block w-full rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:dark:text-gray-200 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:dark:text-gray-200 text-sm sm:leading-6"

                                                        style={{ background: colors.attributes.tintedBackground, color: colors.attributes.indicator, borderColor: colors.attributes.border }}

                                                    />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            disabled={loader}
                                            type="submit"
                                            className="w-full "
                                            style={{ background: colors.attributes.primary }}
                                        >
                                            Envoyer la demande
                                        </Button>
                                    </div>
                                    <div className="mt-4 dark:text-gray-200 text-sm leading-6 dark:text-gray-200 text-gray-500"
                                        style={{ color: colors.attributes.hint }}
                                    >
                                        En formulant votre demande, vous acceptez la{' '}
                                        <a href={`/${etude.attributes.slug}/privacy`} className="font-semibold dark:text-gray-200 text-indigo-600"
                                            style={{ color: colors.attributes.primary }}

                                        >
                                            politique de confidentialité
                                        </a>
                                        .
                                    </div>

                                </form>

                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>


            }

        </div>
    )
}
