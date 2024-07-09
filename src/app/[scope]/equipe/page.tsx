
import { ApiListResponse } from '@/models/other'
import TeamContent from './content'
import { Member } from '@/models/members'
import { Method, call } from '@/scripts/api'


export default async function Projects() {
    let members: ApiListResponse<Member> = new ApiListResponse<Member>()
    try {
        members = await call("members?populate=*", Method.get)
    } catch (error) {

    }


    return (
        <TeamContent members={members.data}></TeamContent>
    )
}
