"use client"
import { Metadata } from "next";
import { ApiListResponse } from "@/models/other";
import { Legal } from "@/models/legals";
import { Method, call } from "@/scripts/api";
import { SimpleLayout } from "@/components/SimpleLayout";
import Markdown from "react-markdown";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/providers";
import { Reservation, ReservationStatus } from "@/models/reservation";
import { Container } from "@/components/Container";
import { useSearchParams } from "next/navigation";


export enum ReservationAction {
  Confirm = "confirm",
  Reject = "reject",
}

export default function ReservationContent({ reservation }: { reservation: Reservation }) {

  let { colors, scope } = useContext(AppContext)

  let [action, setAction] = useState<ReservationAction>(useSearchParams().get("action") as ReservationAction)

  useEffect(() => {

    async function fetchData() {
      if (action === ReservationAction.Confirm) {

        try {
          await call("/api/" + scope + "/reservations/" + reservation.id, Method.put, { status: "confirmed" })
        } catch (error) {
          console.log(error)
        }
      }

      if (action === ReservationAction.Reject) {

        try {
          await call("/api/" + scope + "/reservations/" + reservation.id, Method.put, { status: "draft" })
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchData()


  }, [action])

  return (
    <Container className="mt-32 sm:mt-64">

      <div style={{ color: colors.attributes.accent }}>
        <h1 className="text-2xl font-semibold">Confirmation de rendez-vous</h1>
        <div className="text-base mt-8"> Votre rendez-vous a bien été {action == ReservationAction.Confirm ? "confirmé" : "annulé"}. Un e-mail a été envoyé au client pour le notifier.

          <div className="h-[1px] w-full my-4" style={{ background: colors.attributes.divider }}></div>

          <p>E-mail: {reservation.clientEmail}</p>
          <p>Nom: {reservation.clientFirstName} {reservation.clientLastName}</p>
          <p>Téléphone: {reservation.clientPhone}</p>
          <p>Motif: {reservation.message}</p>
          <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
          <p>Heure: {new Date(reservation.date).toLocaleTimeString()}</p>

        </div>
      </div>



    </Container>

  )
}

