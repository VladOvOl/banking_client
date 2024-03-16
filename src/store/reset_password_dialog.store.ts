import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IResetPasswordDialog{
    isOpen:boolean,
    setIsOpenState: (state:boolean) => void
}

export const useResetPasswordDialogStore = create<IResetPasswordDialog>()(devtools((set)=>({
    isOpen:false,
    setIsOpenState: (state) => set({isOpen:state})
})))