export interface IPaymentBlocks{
    img: React.JSX.Element | null,
    title: string,
    underPaymentBlocks: IUnderPaymentBlocks[]
  }
  
export interface IUnderPaymentBlocks{
    title: string,
    arrayCategories: string[]
  }