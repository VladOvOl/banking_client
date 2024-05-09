import { axiosWithAuth } from "@/api/interceptors";
import { ICreateTransaction } from "@/types/transaction.types";

export const transactionService = {

  async getAllByCardId(cardId:string){

    const response = await axiosWithAuth.post("/transaction/getAll",
    {
      cardId:cardId
    })
    return response
  },

  async createTransaction(data:ICreateTransaction){
    const response = await axiosWithAuth.post("/transaction/create",
      {
        ...data
      })
      return response
  }
}