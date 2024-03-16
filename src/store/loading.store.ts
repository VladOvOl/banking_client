import { create } from "zustand";
import {devtools} from 'zustand/middleware'

interface ILoading{
    isLoading:boolean,
    setLoadingState: (state:boolean) => void
}

export const useLoadingStore = create<ILoading>()(devtools((set)=>({
    isLoading:false,
    setLoadingState: (state) => set({isLoading:state})

})))