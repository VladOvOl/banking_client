import { create } from "zustand";
import {devtools} from 'zustand/middleware'

interface ICloseAppDialog{
    isOpen:boolean,
    setIsOpenState: (state:boolean) => void
}

export const useCloseAppDialogStore = create<ICloseAppDialog>()(devtools((set)=>({
    isOpen:false,
    setIsOpenState: (state) => set({isOpen:state})

})))
