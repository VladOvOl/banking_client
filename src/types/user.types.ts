export interface IUser{
    id?:number,
    name:string,
    email:string,
    password?:string,
    phoneNumber?:string,
    address?:string
}

export interface IUpdateUser{
    id?:number,
    name?:string,
    email?:string,
    password?:string,
    phoneNumber?:string,
    address?:string
}