import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware'

interface IDialog{
    isOpen:boolean,
    setIsOpenState: (state:boolean) => void
}

interface IResetPasswordDialog{
    isOpen:boolean,
    newPassword:string,
    setIsOpenState: (state:boolean) => void,
    setNewPassword: (state2:string) => void
}



export const useCloseAppDialogStore = create<IDialog>()(devtools((set)=>({
    isOpen:false,
    setIsOpenState: (state) => set({isOpen:state})

})))


export const useResetPasswordDialogStore = create<IResetPasswordDialog>()(devtools((set)=>({
    isOpen:false,
    newPassword:'',
    setIsOpenState: (state) => set({isOpen:state}),
    setNewPassword: (state2) => {set({newPassword:state2})}
    
})))

export const useTransferDialogStore = create<IDialog>()(devtools((set)=>({
    isOpen:false,
    setIsOpenState: (state) => set({isOpen:state})

})))

export const useCardBlockDialogStore = create<IDialog>()(devtools((set)=>({
    isOpen:false,
    setIsOpenState: (state) => set({isOpen:state})

})))

export const useCreatePaymentDialogStore = create<IDialog>()(devtools((set)=>({
    isOpen:false,
    setIsOpenState: (state) => set({isOpen:state})

})))