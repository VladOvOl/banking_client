import React from 'react'
import style from './PaymentContainer.module.scss'
import PaymentBlock from '@/components/my_ui/payment_block/PaymentBlock' 
import {ArrowLeftRightIcon,
  Gamepad2Icon,
  PlugZap,
  Repeat,
  PhoneCall,
  MonitorPlayIcon,
  Heart,
  TicketPercentIcon,
  Globe,
  Bus
  
} from 'lucide-react'
import { DialogPayment } from '../../dialogs/dialog_payment/DialogPayment'
import { IPaymentBlocks } from '@/types/payment.types'

type Props = {}


const arr: IPaymentBlocks[] = [
  {
    img:<PlugZap width={40} height={40}/>,
    title:"Communal payments",
    type:'communal',
    underPaymentBlocks:[
      {
        title: "Electric supply",
        label: "Enter your electric number",
        placeholder: "146582458743658"
      },
      {
        title:"Water supply",
        label:"Enter your water number",
        placeholder: "146582458743658"
        
      },
      {
        title:"Gas supply",
        label:"Enter your water number",
        placeholder: "146582458743658"
      }]
  },
  {
    img:<ArrowLeftRightIcon width={40} height={40}/>,
    title:"Transfers",
    type:'transfer',
    underPaymentBlocks:[]
  },
  /*{
    img:<Repeat width={40} height={40}/>,
    title:"Сurrency exchange",
    underPaymentBlocks:[
      
    ]
  },*/
  {
    img:<Globe width={40} height={40}/>,
    title:"Internet payment",
    type:'internet',
    underPaymentBlocks:[
      {
        title: "Kievstar",
        label: "Enter your internet number",
        placeholder: "4363254635"
      },
      {
        title: "Osnova",
        label: "Enter your internet number",
        placeholder: "4363254635"
      },
      {
        title: "UkrTelecom",
        label: "Enter your internet number",
        placeholder: "4363254635"
      },
      {
        title: "UltraNet",
        label: "Enter your internet number",
        placeholder: "4363254635"
      },
    ]
  },
  {
    img:<PhoneCall width={40} height={40}/>,
    title:"Mobile top-up",
    type:'mobile',
    underPaymentBlocks:[
      {
        title: "Kievstar",
        label: "Enter your mobile number",
        placeholder: "+380983423573"
      },
      {
        title: "Lifecell",
        label: "Enter your mobile number",
        placeholder: "+380633423572"   
      },
      {
        title: "Vodafon",
        label: "Enter your mobile number",
        placeholder: "+380953423571"     
      }
    ]
  },
  {
    img:<MonitorPlayIcon width={40} height={40}/>,
    title:"Television",
    type:'television',
    underPaymentBlocks:[{
      title: "OsnovaTV",
      label: "Enter your TV id",
      placeholder: "34564563536"
      
    },
    {
      title:"KievStarTV",
      label:"Enter your TV id",
      placeholder: "98756874765"
      
    },
    {
      title:"SwitTV",
      label:"Enter your TV id",
      placeholder: "98756874765"
      
    },
    {
      title:"Megogo",
      label:"Enter your TV id",
      placeholder: "98756874765"
      
    }]
  },
  {
    img:<Heart width={40} height={40}/>,
    title:"Сharity",
    type:'charity',
    underPaymentBlocks:[
      {
        title:"Povernis Guvim",
        label:"Enter number for send donate",
        placeholder: "98756874765"
        
      },
      {
        title:"Fond Prituli",
        label:"Enter number for send donate",
        placeholder: "98756874765"
        
      }
    ]
  },
  {
    img:<Gamepad2Icon width={40} height={40}/>,
    title:"Games",
    type:'games',
    underPaymentBlocks:[
      {
        title: "Steam",
        label: "Enter your steam account",
        placeholder: "Your steam"
      },
      {
        title: "EpicGame",
        label: "Enter your epicgame account",
        placeholder: " Your account"
      },
    ]
  },
  {
    img:<Bus width={40} height={40}/>,
    title:"Online tickets",
    type:'tickets',
    underPaymentBlocks:[
      {
        title: "AviaSales",
        label: "Enter your account",
        placeholder: " Your account"
      },
    ]
  },
]



const PaymentContainer = (props: Props) => {
  return (
  <div className={style.containerScroll}>
    <div className={style.container}>
      {
        arr.map((obj,_index)=>
          <PaymentBlock 
            key= {_index} 
            img= {obj.img} 
            title= {obj.title}
            type = {obj.type}
            paymentBlockInfo= {obj}
          />)
        }
    </div>
    <DialogPayment/>
  </div>
  )
}

export default PaymentContainer