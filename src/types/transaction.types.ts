export interface ITransaction{
    id:number,
    value:number,
    userSenderFullName: string,
    userSenderCardNumber:string,
    userRecipientFullName:string,
    userRecipientCardNumber:string,
    process: string,
    createdAt: string,
    typeTransaction: "transfer"|"communal"|"internet"|"mobile"|"television"|"charity"|"games"|"tickets"
}

export interface ICreateTransaction{
    value:number,
    userSenderCardNumber: string,
    userRecipientCardNumber: string,
    userSenderCardMonth: string,
    userSenderCardYear: string,
    userSenderCardCVC: string,
    typeTransaction: "transfer"|"communal"|"internet"|"mobile"|"television"|"charity"|"games"|"tickets"
}
