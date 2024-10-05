'use client'

import { useContext, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { AppContext, NotificationColor, NotificationContent } from '@/app/providers'
import { CheckCircleIcon } from '@heroicons/react/24/outline'


export function Notification() {

    let { notifications } = useContext(AppContext)

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}

            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-start px-4 py-6  sm:p-6 z-[5000]"
            >
                <div className="flex w-full flex-col space-y-4 items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    {notifications?.map((notification) => {
                        return <NotificationPanel notification={notification} />
                    })}

                </div>
            </div >
        </>
    )
}


function NotificationPanel({ notification }: { notification: NotificationContent }) {

    let [show, setShow] = useState(false)

    const duration = notification?.duration || 3000;
    const color = notification?.color || NotificationColor.green
    const Icon = notification?.Icon || CheckCircleIcon

    useEffect(() => {
        if (notification) {
            setShow(true)
            // Timeout pour cacher la notification après la durée
            const timeout = setTimeout(() => {
                setShow(false)
            }, duration);

            // Nettoyage de l'intervalle et du timeout
            return () => {
                clearTimeout(timeout);
                setShow(false)
            };
        }

    }, [notification]);



    return <Transition show={show} key={notification.key}
        enter="transition duration-300 ease-in-out"
        enterFrom="transform translate-x-full"
        enterTo="transform translate-x-0"

        leave="transition duration-300 ease-in-out"
        leaveFrom="transform translate-x-0"
        leaveTo="transform translate-x-full"
    >
        <div className="relative pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Icon aria-hidden="true" className="h-6 w-6  text-gray-500" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{notification?.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{notification?.message}</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => setShow(false)}
                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="sr-only">Fermer</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </div>

                    <div className={`z-10 h-[3px] absolute bottom-0 rounded-lg left-0 w-full animate-progress `}
                        style={{
                            animationDuration: `${duration}ms`,
                            animationDirection: 'reverse',
                            backgroundColor: color
                        }}
                    ></div>
                </div>
            </div>
        </div>
    </Transition>

}