import { ICreatePaymentForm, IPaymentBlocks, IUnderPaymentBlocks } from "@/types/payment.types";
import { ICreateTransaction, ITransaction } from "@/types/transaction.types";
import { create } from "zustand";

interface IPaymentStore{
    currentPayments: IPaymentBlocks,
    currentPaymentForm:ICreatePaymentForm,
    setCurrentPayments:(dto:IPaymentBlocks)=>void,
    setCurrentPaymentForm:(dto:ICreatePaymentForm)=>void,
    setEmpty:()=>void,
    setEmptyForm:()=>void,
} 

export const usePaymentStore = create<IPaymentStore>()((set)=>({
    currentPaymentForm:{
        userSenderCardNumber: '',
        userRecipientCardName:'',
        userRecipientCardNumber:'',
        userSenderCardMonth:'',
        userSenderCardYear: '',
        userSenderCardCVC:'',
        value: undefined,
        typeTransaction:"transfer"
    },

    currentPayments:{
        img: null,
        type:"transfer",
        title:'',
        underPaymentBlocks:[]
    },

    setCurrentPayments:(dto)=>set(()=>({
        currentPayments:dto
    })),

    setCurrentPaymentForm:(dto)=>set(()=>({
        currentPaymentForm:{
            userSenderCardNumber: dto.userSenderCardNumber,
            userRecipientCardNumber:dto.userRecipientCardNumber,
            userRecipientCardName:dto.userRecipientCardName,
            userSenderCardMonth: dto.userSenderCardMonth,
            userSenderCardYear: dto.userSenderCardYear,
            userSenderCardCVC: dto.userSenderCardCVC,
            value: dto.value,
            typeTransaction: dto.typeTransaction
        }
    })),

    setEmpty:()=>set(()=>({
        currentPayments:{
            img: null,
            title:'',
            type:"transfer",
            underPaymentBlocks:[]
        }
    })),

    setEmptyForm: () => set(() => ({
        currentPaymentForm:{
            userSenderCardNumber: '',
            userRecipientCardName:'',
            userRecipientCardNumber:'',
            userSenderCardMonth:'',
            userSenderCardYear: '',
            userSenderCardCVC:'',
            value: undefined,
            typeTransaction:"transfer"
    },
    }))

    
}))

    