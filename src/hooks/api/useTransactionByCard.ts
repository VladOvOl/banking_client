import { transactionService } from "@/services/transaction/transaction.service"
import { useQuery } from "@tanstack/react-query"

export const useTransactionByCard = (cardId:string) => {
  return useQuery({
    queryKey: ['transaction'],
    queryFn: async()=> {
      await transactionService.getAllByCardId(cardId)  
    }
  })
}