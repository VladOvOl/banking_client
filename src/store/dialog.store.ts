import { create } from "zustand";
import {devtools} from 'zustand/middleware'

interface IDialog{
    isOpen:boolean,
    setIsOpenState: (state:boolean) => void
}

interface IResetPasswordDialog{
    isOpen:boolean,
    newPassword:string,
    setIsOpenState: (state:boolean) => void,
    setNewPassword: (state:string) => void
}

export const useCloseAppDialogStore = create<IDialog>()(devtools((set)=>({
    isOpen:false,
    setIsOpenState: (state) => set({isOpen:state})

})))


export const useResetPasswordDialogStore = create<IResetPasswordDialog>()(devtools((set)=>({
    isOpen:false,
    newPassword:'',
    setIsOpenState: (state) => set({isOpen:state}),
    setNewPassword: (state) => set({newPassword:state})
    
})))