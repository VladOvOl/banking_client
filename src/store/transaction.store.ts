import { ICreateTransaction, ITransaction } from "@/types/transaction.types";
import { create } from "zustand";

interface ITransactionStore{
    currentTransactionForm:ICreateTransaction,
    allTransactionByUser: ITransaction[],
    setCurrentTransactionForm:(dto:ICreateTransaction)=>void,
    setAllTransactionByUser:(dto:ITransaction[])=>void,
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

    allTransactionByUser:[],

    setAllTransactionByUser:(dto)=>set(()=>({
        allTransactionByUser:dto
    })),

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

    