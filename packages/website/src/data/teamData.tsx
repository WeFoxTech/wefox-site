import { MenberData } from "../../components/team/Menber";

export const teamData: MenberData[] =[
  {
    name: 'fox', // English name , required
    cnName: undefined, // Chinese name , optional
    site: 'https://fox.mn', // personal website url , optional
    github: 'foxundermoon', // Github username , optional
    weibo: undefined, // weibo id , optional
    twitter: undefined, // twitter id , optional
    avatar : '', // avatar url , optional
    bio: '', // bio description , required  string or function Component
  }
]