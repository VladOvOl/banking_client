import { userService } from '@/services/user/user.service'
import { IUser } from '@/types/user.types'
import {create} from 'zustand'
import {persist,devtools} from 'zustand/middleware'

interface IUserStore{
    userStore: Omit<IUser,'password'>,
    setUserStore: (user:IUser) => void
    //getUserStore: (email:string) => void
}

export const useUserStore = create<IUserStore>()(persist(devtools((set)=>({
    userStore: {
        id:0,
        name:'',
        email:'',
        
    },
    setUserStore: (user)=> set(()=> ({userStore: {
        id:user.id,
        name:user.name,
        email:user.email
    }}))
})),{name:"user.store"}))