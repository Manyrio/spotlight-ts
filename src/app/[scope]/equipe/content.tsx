"use client"

import { SimpleLayout } from '@/components/SimpleLayout'
import { AcademicCapIcon, EnvelopeIcon, LanguageIcon, MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/20/solid'
import { Member } from '@/models/members'
import { useContext } from 'react'
import { AppContext } from '@/app/providers'
import TeamMember from './components/member'



export default function TeamContent({ members }: { members: Member[] }) {
    let { etude } = useContext(AppContext)


    return (
        <SimpleLayout
            title="L'équipe"
            intro="Rencontrez l'équipe et contactez-nous."
        >

            <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-300/90 dark: divide-gray-700 xl:col-span-3"
            >
                {members.map((member) => {
                    let allowed = false
                    member.attributes.etudes.data.forEach(element => {
                        if (element.attributes.slug == etude.attributes.slug) allowed = true
                    });

                    if (!allowed) return

                    return (
                        <TeamMember key={member.id} member={member} />
                    )
                })}
            </ul>

        </SimpleLayout >
    )
}
