import { axiosWithAuth} from "@/api/interceptors"

export const cardService = {

    async createCard(data: {}){
      const response = await axiosWithAuth.post<any>(`/card/createCard`,
      data
      )
      return response
    },

    async getAllCards(data:any) {  
      const response = await axiosWithAuth.post<any>(`/card/getAllCards`,
      data)
 
      return response.data
    },

    async blockCard(data:any){

      const response = await axiosWithAuth.post<any>(`/card/blockCard`,
      data)

      return response.data
    }
}