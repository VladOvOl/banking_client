import { axiosWithAuth, axiosWithOutAuth } from "@/api/interceptors"
import { removeFromStorage, saveTokenStorage } from "./auth_token.service"
import {IAuthRequest,IAuthResponse} from '@/types/auth.types.ts'
import {IUser} from '@/types/user.types.ts'

export const authService = {

    async loginUser(data: IAuthRequest){
      const response = await axiosWithOutAuth.post<IAuthResponse>(`/auth/loginUser`,
      data
      )
      if(response.data.accessToken){
        saveTokenStorage(response.data.accessToken)
      }
      return response
    },

    async registrationUser(data: IAuthRequest){
      const response = await axiosWithOutAuth.post<IAuthResponse>(`/auth/registrationUser`,
      data
      )
      if(response.data.accessToken){
        saveTokenStorage(response.data.accessToken)
      }
      return response
    },

    async updateUser(data: IUser){
      const response = await axiosWithAuth.post<IAuthResponse>(`/auth/updateUser`,
      data
      )
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