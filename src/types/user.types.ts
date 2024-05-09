export interface IUser{
    id:number,
    userFullName:string,
    userEmail:string,
    userPassword?:string,
    userPhoneNumber:string,
    userAddress:string
}

export interface IUpdateUser{
    id?:number,
    name?:string,
    email?:string,
    password?:string,
    phoneNumber?:string,
    address?:string
}