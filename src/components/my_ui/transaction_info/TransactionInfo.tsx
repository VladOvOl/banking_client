import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {DollarSign} from 'lucide-react'
import { ITransaction } from '@/types/transaction.types'
import { dateAndTimeService } from '@/services/tools/dateAndTime.service'
import { userService } from '@/services/user/user.service'
import { cardService } from '@/services/card/card.service'
import { cardToolService } from '@/services/tools/cardTools.service'



type Props = {
  card:ITransaction
}

function TransactionInfo({card}: Props) {
  
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
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage 
            src="/avatars/01.png" 
            alt="Avatar" 
          />
          <AvatarFallback>
            {name.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            {card.process !== "+"
            ? card.userRecipientFullName
            : card.userSenderFullName}
          </p>
          <p className="text-sm text-muted-foreground">
            {maskCreditCardNumber}
          </p>
        </div>
        <div className="ml-auto flex flex-col items-center justify-center">
          <p className="text-sm  leading-none">
            {dateAndTime?.time}
          </p>
          <p className="text-sm leading-none">
            {dateAndTime?.date}
          </p>
        </div>
        <div className="ml-auto w-fit font-medium ">
          {
            <div className='flex items-center'>
              <p>{card.process}</p>
              <DollarSign width={15} height={15}/>
              <p>{card.value}</p>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default TransactionInfo