'use client'
import React from 'react'
import style from './PaymentBlock.module.scss'
import { useCreatePaymentDialogStore } from '@/store/dialog.store'
import { DialogPayment } from '../../dialogs/dialog_payment/DialogPayment'
import { useRouter } from 'next/navigation'
import { usePaymentStore } from '@/store/payment.store'
import { IPaymentBlocks } from '@/types/payment.types'

type Props = {
  img:any,
  title:string,
  paymentBlockInfo: IPaymentBlocks
}

const PaymentBlock = ({img,title,paymentBlockInfo}: Props) => {

  const {setIsOpenState} = useCreatePaymentDialogStore()
  const {setCurrentPayments} = usePaymentStore()
  const router = useRouter()

  const handleClick = () => {
    if (title === "Transfers") {
      router.push('/dashboard/transfers');
    } else {
      setCurrentPayments(paymentBlockInfo);
      setIsOpenState(true);
    }
  };

  return (
    <>
      <div className={style.container} 
        onClick={()=>handleClick()}
      >
        {img}
        <p>{title}</p>
      </div>
    </>
  )
}

export default PaymentBlock