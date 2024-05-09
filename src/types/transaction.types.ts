export interface ITransaction{
    id:number,
    value:number,
    userSenderFullName: string,
    userSenderCardNumber:string,
    userRecipientFullName:string,
    userRecipientCardNumber:string,
    process: string,
    createdAt: string
}

export interface ICreateTransaction{
    value:number,
    userSenderCardNumber: string,
    userRecipientCardNumber: string,
    userSenderCardMonth: string,
    userSenderCardYear: string,
    userSenderCardCVC: string,
}