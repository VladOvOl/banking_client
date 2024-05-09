import { axiosWithAuth } from "@/api/interceptors"

export const userService = {

    async getUserInfo(){
      const response = await axiosWithAuth.get('/user/byEmail')

      return response
    },

    getFirstLetter(fullName:string):string{
      const words = fullName.split(" ");
      const initials = words.map(word => word.charAt(0));
      const result = initials.join("");

      return result;
    }
    
}