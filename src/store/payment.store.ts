import { IPaymentBlocks, IUnderPaymentBlocks } from "@/types/payment.types";
import { ICreateTransaction, ITransaction } from "@/types/transaction.types";
import { create } from "zustand";

interface IPaymentStore{
    currentPayments: IPaymentBlocks,
    setCurrentPayments:(dto:IPaymentBlocks)=>void,
    setEmpty:()=>void
    
} 

export const usePaymentStore = create<IPaymentStore>()((set)=>({
   
    currentPayments:{
        img: null,
        title:'',
        underPaymentBlocks:[]
    },

    setCurrentPayments:(dto)=>set(()=>({
        currentPayments:dto
    })),

    setEmpty:()=>set(()=>({
        currentPayments:{
            img: null,
            title:'',
            underPaymentBlocks:[]
        }
    })),

    
    }))

    