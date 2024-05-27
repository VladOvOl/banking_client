import React, { useState } from 'react'
import style from './BankingCard.module.scss'
import Image from 'next/image'
import { ICard } from '@/types/card.types'
import { cardToolService } from '@/services/tools/cardTools.service'
import {Eye,EyeOff} from 'lucide-react'
import { utilsService } from '@/services/tools/utils.service'

interface Props{
  card:ICard
}


function BankingCard({card}:Props){

  const [showCardNumber,setShowCardNumber] = useState(false)
  const cardNumberMask = cardToolService.maskCreditCardNumber(card.cardNumber)
  const cardNumber = cardToolService.formatCreditCardNumber(card.cardNumber)
  const cardCVC = utilsService.decrypt(card.cardCVC,card.id)

  return (
    <div className={style.container} 
      style={card.cardStatus
      ?{backgroundColor:'#222C37'}
      :{backgroundColor:'#7e7e7e'}}
    >
      <div className={style.containerTop}>
        <p>{card.cardTitle}</p>
        <p>NFC</p>
      </div>     
      <div className={style.containerBottom}>
        <div className={style.containerInfo}>
          <div className={style.containerInfoTop}>
            <div className={style.containerName}>
              <p>{card.cardUserFullName}</p>
            </div>
            <div className={style.containerData}>
              <p>{card.cardDateMonth}/{card.cardDateYear}</p>
            </div>
          </div>
          <div className={style.containerCardNumber}>
            {  
              showCardNumber?
              <>
                <p>{cardNumber}</p>
                <Eye onClick={()=>setShowCardNumber(false)}/>
              </>
              :
              <>
                <p>{cardNumberMask}</p>
                <EyeOff onClick={()=>setShowCardNumber(true)}/>
              </>
              
            }
            
          </div>
        </div>
        <div className={style.containerType}>
        </div> 
          <Image
              src='/tr.png'
              width={50}
              height={50}
              alt='gg'/>
      </div>
    </div>
  )
}

export default BankingCard