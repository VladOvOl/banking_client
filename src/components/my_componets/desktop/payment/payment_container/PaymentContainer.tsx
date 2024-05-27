import React from 'react'
import style from './PaymentContainer.module.scss'
import PaymentBlock from '../payment_block/PaymentBlock'
import {ArrowLeftRightIcon,
  Gamepad2Icon,
  PlugZap,
  Repeat,
  PhoneCall,
  MonitorPlayIcon,
  Heart,
  TicketPercentIcon
} from 'lucide-react'
import { title } from 'process'
import { DialogPayment } from '../../dialogs/dialog_payment/DialogPayment'
import { IPaymentBlocks } from '@/types/payment.types'

type Props = {}


const arr: IPaymentBlocks[] = [
  {
    img:<PlugZap width={40} height={40}/>,
    title:"Communal payments",
    underPaymentBlocks:[
      {
        title:"Electric supply",
        arrayCategories:[
          "Ukrenergo",
          "Kyivenergo",
          "Kharkovoblenergo",
          "DTEK Donetskoblenergo",
          "DTEK Dneprooblenergo",
          "Odessaoblenergo",
          "Lvivoblenergo",
          "Zaporozhyeoblenergo",
          "Poltavaoblenergo",
          "Chernygovoblenergo",
          "Cherkassyoblenergo",
          "Sumyoblenergo",
          "Vynnitsaoblenergo",
          "Khmelnytskoblenergo",
          "Ternopoliblenergo",
          "Luhanskoblenergo",
          "Rovnooblenergo",
          "Ivano-Frankivskoblenergo",
          "Kirovgradoblenergo",
          "Chernovtsyoblenergo"]

      },
      {
        title:"Water supply",
        arrayCategories:["Kievvodokanal",
        "Kharkovvodokanal",
        "Dneprvodokanal",
        "Odessavodokanal",
        "Lvivvodokanal",
        "Zaporozhyevodokanal",
        "Krivbassvodokanal",
        "Mikolaivvodokanal",
        "Cherkasyvodokanal",
        "Vinnitsavodokanal",
        "Poltavavodokanal",
        "Sumyvodokanal",
        "Chernigovvodokanal",
        "Rovnovodokanal",
        "Lutskvodokanal",
        "Ternopilvodokanal",
        "Uzhgorodvodokanal",
        "Chernivtsivodokanal",
        "Khersonvodokanal",
        "Zhytomyrvodokanal"]
      },
      {
        title:"Gas supply",
        arrayCategories:[
          "Naftogaz of Ukraine",
          "Kievgaz",
          "Kharkovgaz",
          "Dnepropetrovskgaz",
          "Odessagaz",
          "Lvovgaz",
          "Zaporozhgaz",
          "Poltavagaz",
          "Chernigovgaz",
          "Cherkassygaz",
          "Sumygaz",
          "Vinnitsagaz",
          "Khmelnytskgaz",
          "Ternopolgaz",
          "Luganskgaz",
          "Rovnogaz",
          "Ivano-Frankivskgaz",
          "Kirovogradgaz",
          "Chernivtsigaz",
          "Zhytomyrgaz"]
      }]
  },
  {
    img:<ArrowLeftRightIcon width={40} height={40}/>,
    title:"Transfers",
    underPaymentBlocks:[]
  },
  {
    img:<Repeat width={40} height={40}/>,
    title:"Сurrency exchange",
    underPaymentBlocks:[
      
    ]
  },
  {
    img:<PhoneCall width={40} height={40}/>,
    title:"Mobile top-up",
    underPaymentBlocks:[]
  },
  {
    img:<MonitorPlayIcon width={40} height={40}/>,
    title:"Television",
    underPaymentBlocks:[{
      title:"Gas supply",
      arrayCategories:[]
    },
    {
      title:"Gas supply2",
      arrayCategories:[]
    },]
  },
  {
    img:<Heart width={40} height={40}/>,
    title:"Сharity",
    underPaymentBlocks:[]
  },
  {
    img:<Gamepad2Icon width={40} height={40}/>,
    title:"Games",
    underPaymentBlocks:[]
  },
  {
    img:<TicketPercentIcon width={40} height={40}/>,
    title:"Online tickets",
    underPaymentBlocks:[]
  },
]



const PaymentContainer = (props: Props) => {
  return (
    <>
      <div className={style.container}>
        {
          arr.map((obj,_index)=>
            <PaymentBlock 
              key= {_index} 
              img= {obj.img} 
              title= {obj.title}
              paymentBlockInfo= {obj}
            />)
        }
      </div>
      <DialogPayment/>
    </>

  )
}

export default PaymentContainer