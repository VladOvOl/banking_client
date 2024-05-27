import { cardService } from "@/services/card/card.service"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCards = (id:number) => {
  return useQuery({
    queryKey: ['getAllCards2'],
    queryFn: async()=> {
      return await cardService.getAllCards({userId :id})
    },
    select: (data)=> data,
    refetchInterval:60000
  })
}