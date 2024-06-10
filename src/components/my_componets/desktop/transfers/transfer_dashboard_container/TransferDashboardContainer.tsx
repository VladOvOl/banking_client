import React from 'react'
import style from './TransferDashboardContainer.module.scss'
import TransferSenderFormCard from '../transfer_sender_form_card/TransferSenderFormCard'
import TransferRecipientFormCardNumber from '../transfer_recipient_form_card_number/TransferRecipientFormCardNumber'
import { Button } from '@/components/ui/button'

type Props = {}

const TransferDashboardContainer = (props: Props) => {
  return (
    <div className={style.container}>
      <div className='flex w-full'>
        <TransferSenderFormCard/>
        <TransferRecipientFormCardNumber/>
      </div>
      <div className='w-full flex justify-end pr-6'>
        <Button>Continue</Button>
      </div>
    </div>
  )
}

export default TransferDashboardContainer