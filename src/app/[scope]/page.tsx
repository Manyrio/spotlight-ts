import { Method, call } from "@/scripts/api"
import HomeContent from "./content"
import { Etude } from "@/models/etudes"
import { ApiListResponse, ApiRetrieveResponse } from "@/models/other"
import { Member } from "@/models/members"
import { AnnonceObject } from "@/models/annonce"



export default async function Home() {
  let origin = process.env.NEXT_PUBLIC_URL

  let members: ApiListResponse<Member> = new ApiListResponse<Member>()
  let annonces: ApiListResponse<AnnonceObject> = new ApiListResponse<AnnonceObject>()

  try {
    members = await call("members?populate=*", Method.get)
    annonces = await call(origin + "/api/annonces", Method.get)
  } catch (error) {

  }


  return (
    <HomeContent members={members.data} annonces={annonces.data} />
  )

}
