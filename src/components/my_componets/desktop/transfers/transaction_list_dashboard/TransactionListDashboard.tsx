'use client'
import React, { useEffect, useState } from 'react'
import style from './TransactionList.module.scss'
import { ITransaction } from '@/types/transaction.types'
import { Separator } from '@/components/ui/separator'
import TransactionInfoDashboard from '@/components/my_ui/transaction_info_dashboard/TransactionInfoDashboard'
import { useCardStore } from '@/store/card.store'
import { useTransactionStore } from '@/store/transaction.store'
import { transactionUtilsService } from '@/services/transaction/transaction_utils.service'

type Props = {
  cardId : string,
  period : string
}

function TransactionListDashboard({cardId,period}: Props) {

  const[transaction,setTransaction] = useState<ITransaction[]>([])
  const {arrayCardStore} = useCardStore()
  const {setAllTransactionByUser,allTransactionByUser} = useTransactionStore()
  
  let arr:ITransaction[]=[]

  if(period === "all"){
    arr = allTransactionByUser
  }else{
    arr = period 
      ? transactionUtilsService.filterObjectsByPeriod(allTransactionByUser,period,0)
      :[]
  }
    
  const array = [...arr].reverse()
  
  //const arrayOfIds: string[] = arrayCardStore.map(obj => obj.id);
  

  return (
    <div className={style.containerMain}>
      <h1>Transaction</h1>
      <div className={style.containerScroll}>
        <div className={style.container}>
        {
          array.length == 0 
          ?<p>No yet transactions</p>
          : array.map((card)=>(
            <div key={card.id}>
              <TransactionInfoDashboard card={card}/>
              <Separator className='my-3'/>
            </div>
            ))
        }
        </div>
      </div>
    </div>
    
    
     
  )
}

export default TransactionListDashboard