import { IUser } from "./user.types"

export interface IAuthRequest {
    email: string,
    password: string
}

export interface IAuthResponse{
    accessToken: string,
    user: IUser
}