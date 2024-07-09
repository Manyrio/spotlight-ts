import { Method, call } from "@/scripts/api"
import HomeContent from "./content"
import { Etude } from "@/models/etudes"
import { ApiListResponse } from "@/models/other"
import { Member } from "@/models/members"

export default async function Example() {

  let members: ApiListResponse<Member> = new ApiListResponse<Member>()
  try {
    members = await call("members?populate=*", Method.get)
  } catch (error) {

  }


  return (
    <HomeContent members={members.data} />
  )

}
