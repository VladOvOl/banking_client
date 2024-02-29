import { axiosWithOutAuth } from "@/api/interceptors"
import { removeFromStorage, saveTokenStorage } from "./auth_token.service"
import {IAuthRequest,IAuthResponse} from '@/types/auth.types.ts'

export const authService = {

    async main(type: 'loginUser' | 'registrationUser', data: IAuthRequest){
      const response = await axiosWithOutAuth.post<IAuthResponse>(`/auth/${type}`,
      data
      )
      if(response.data.accessToken){
        saveTokenStorage(response.data.accessToken)
      }
      return response
    },

    async getNewTokens(){

      const response = await axiosWithOutAuth.post<IAuthResponse>(`/auth/loginUser/access-token`)
      if(response.data.accessToken) {
        saveTokenStorage(response.data.accessToken)
      }
      return response
    },

    async logOut(){

      const response = await axiosWithOutAuth.post<boolean>('auth/logoutUser')
      if(response.data){
        removeFromStorage()
      }
      return response

    }
}