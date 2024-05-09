import { userService } from '@/services/user/user.service'
import { IUser } from '@/types/user.types'
import {create} from 'zustand'
import {persist,devtools, createJSONStorage} from 'zustand/middleware'

interface IUserStore{
  userStore: Omit<IUser,"userPassword">,
  setUserStore: (user:IUser) => void,
  _hasHydrated:boolean,
  setHasHydrated: (boll:boolean) => void
    
}

export const useUserStore = create<IUserStore>()(persist(devtools((set,get)=>({
  userStore: {
    id:0,
    userFullName:'', 
    userEmail:'',
    userPhoneNumber:'', 
    userAddress:'' 
      
  },
  setUserStore:(user)=> set(()=> ({userStore: {
    id:user.id,
    userFullName:user.userFullName,
    userEmail:user.userEmail,
    userPhoneNumber:user.userPhoneNumber,
    userAddress:user.userAddress
  }})),

  _hasHydrated: false,

  setHasHydrated: (boll) => {
    set({
      _hasHydrated: boll
  })}

  }))
  ,{name:"user.store",
  
  
})) 