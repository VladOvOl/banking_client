import { IUser } from "./user.types"

export interface IRegistrationRequest {
    userEmail: string,
    userFullName:string,
    userPassword: string
}

export interface ILoginRequest {
    userEmail: string,
    userPassword: string
}

export interface IAuthResponse{
    accessToken: string,
    user: IUser
}