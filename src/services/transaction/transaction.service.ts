import { axiosWithAuth } from "@/api/interceptors";
import { ICreatePaymentForm } from "@/types/payment.types";
import { ICreateTransaction } from "@/types/transaction.types";

export const transactionService = {

  async getAllByCardId(cardId:string){
    const response = await axiosWithAuth.post("/transaction/getAll",
    {
      cardId:cardId
    })
    return response
  },

  async getAllByUser(cardId:string[]){
    const response = await axiosWithAuth.post("/transaction/getAllByUser",
    {
      cardIds:cardId
    })
    return response.data
  },

  async createTransaction(data:ICreateTransaction){
    const response = await axiosWithAuth.post("/transaction/create",
      {
        ...data
      })
      return response
  },

  async createPayment(data: ICreatePaymentForm){
    const response = await axiosWithAuth.post("/transaction/createPayment",
      {
        ...data
      }
    )
    return response
  }


}