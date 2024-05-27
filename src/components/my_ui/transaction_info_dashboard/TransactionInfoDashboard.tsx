import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {DollarSign,ArrowBigRight,ArrowBigLeft,MoveLeft,MoveRight } from 'lucide-react'
import { ITransaction } from '@/types/transaction.types'
import { dateAndTimeService } from '@/services/tools/dateAndTime.service'
import { userService } from '@/services/user/user.service'
import { cardToolService } from '@/services/tools/cardTools.service'
import style from './TransactionInfoDashboard.module.scss'


type Props = {
  card:ITransaction
}

function TransactionInfoDashboard({card}: Props) {
  
  const dateAndTime = dateAndTimeService.extractDateAndTime(card.createdAt)
  const name = userService.getFirstLetter(
    card.process !== "+"
    ? card.userRecipientFullName
    : card.userSenderFullName)
  const maskCreditCardNumber = cardToolService.maskCreditCardNumber( 
    card.process !== "+"
    ? card.userRecipientCardNumber
    : card.userSenderCardNumber)

  return (
    <div className={style.container}>
      <div className={style.containerLeft}>
      <Avatar className="h-6 w-6">
          <AvatarFallback>
            <p className={style.avatar}>{userService.getFirstLetter(
    card.process !== "+"
    ? card.userRecipientFullName
    : card.userSenderFullName)}</p>
          </AvatarFallback>
        </Avatar>
        <div className="">
          <p className={style.name}>
            {card.process !== "+"
            ? card.userRecipientFullName
            : card.userSenderFullName}
          </p>
          <p className={style.card}>
            {card.process !== "+"
            ? card.userRecipientCardNumber
            : card.userSenderCardNumber}
          </p>
        </div>
      </div>
        

        {card.process !== "+"
        ? <MoveLeft width={15}/>
        : <MoveRight width={15}/>}

      <div className={style.containerRight}>
        <Avatar className="h-6 w-6 flex items-center justify-center">
          <AvatarFallback>
          <p className={style.avatar}>{userService.getFirstLetter(
    card.process !== "-"
    ? card.userRecipientFullName
    : card.userSenderFullName)}</p>
          </AvatarFallback>
        </Avatar>
        <div className="">
          <p className={style.name}>
            {card.process !== "+"
            ? card.userSenderFullName
            : card.userRecipientFullName}
          </p>
          <p className={style.card}>
          {card.process !== "+"
            ? card.userSenderCardNumber
            : card.userRecipientCardNumber}
          </p>
        </div>
      </div>
        

        <div className={style.dateTime}>
          <p className={style.time}>
            {dateAndTime?.time}
          </p>
          <p className={style.time}>
            {dateAndTime?.date}
          </p>
        </div>
        <div className="">
          {
            <div className='flex items-center'>
              <p>{card.process}</p>
              <DollarSign width={10} height={10}/>
              <p>{card.value}</p>
            </div>
          }
        </div>

      </div>
  )
}

export default TransactionInfoDashboard