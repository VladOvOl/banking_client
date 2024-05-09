import { ICreateTransaction } from "@/types/transaction.types";
import { create } from "zustand";

interface ITransactionStore{
    currentTransactionForm:ICreateTransaction,
    setCurrentTransactionForm:(dto:ICreateTransaction)=>void,
    setEmpty:()=>void
} 

export const useTransactionStore = create<ITransactionStore>()((set)=>({
    currentTransactionForm:{
        userSenderCardNumber: '',
        userRecipientCardNumber:'',
        userSenderCardMonth:'',
        userSenderCardYear: '',
        userSenderCardCVC:'',
        value: 0
    },
    setEmpty:()=>set(()=>({
        currentTransactionForm:{
            userSenderCardNumber: '',
            userRecipientCardNumber:'',
            userSenderCardMonth:'',
            userSenderCardYear: '',
            userSenderCardCVC:'',
            value: 0
        }
    })),

    setCurrentTransactionForm:(dto)=>set(()=>({
        currentTransactionForm:{
            userSenderCardNumber: dto.userSenderCardNumber,
            userRecipientCardNumber:dto.userRecipientCardNumber,
            userSenderCardMonth: dto.userSenderCardMonth,
            userSenderCardYear: dto.userSenderCardYear,
            userSenderCardCVC: dto.userSenderCardCVC,
            value: dto.value
        }
    }))
    }))