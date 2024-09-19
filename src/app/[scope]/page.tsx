import { Method, call } from "@/scripts/api"
import HomeContent from "./content"
import { Etude } from "@/models/etudes"
import { ApiListResponse, ApiRetrieveResponse } from "@/models/other"
import { Member } from "@/models/members"
import { CarouselComponent } from "@/models/carousel"



export default async function Home() {

  let carousel: ApiRetrieveResponse<CarouselComponent> = new ApiRetrieveResponse<CarouselComponent>
  let members: ApiListResponse<Member> = new ApiListResponse<Member>()
  try {
    members = await call("members?populate=*", Method.get)
    carousel = await call("carousel?populate=*", Method.get)
  } catch (error) {

  }


  return (
    <HomeContent members={members.data} carousel={carousel.data} />
  )

}
