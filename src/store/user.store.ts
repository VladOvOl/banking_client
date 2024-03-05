import {create} from 'zustand'

interface IUserStore{
    emailStore:string,
    setEmailStore: (email:string) => void
}

export const useUserStore = create<IUserStore>((set)=>({
    emailStore: '',
    setEmailStore: (email)=> set((state)=> ({emailStore: email}))
}))