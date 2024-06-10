export interface IPaymentBlocks{
    img: React.JSX.Element | null,
    title: string,
    type: "transfer"|"communal"|"internet"|"mobile"|"television"|"charity"|"games"|"tickets"
    underPaymentBlocks: IUnderPaymentBlocks[]
  }
  
export interface IUnderPaymentBlocks{
    title: string,
    label:string,
    placeholder:string

}

export interface ICreatePaymentForm{
  value?:number,
  userSenderCardNumber: string,
  userRecipientCardNumber: string,
  userRecipientCardName: string,
  userSenderCardMonth: string,
  userSenderCardYear: string,
  userSenderCardCVC: string,
  typeTransaction: "transfer"|"communal"|"internet"|"mobile"|"television"|"charity"|"games"|"tickets"
}