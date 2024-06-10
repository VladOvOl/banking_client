'use client'
import React, { useEffect, useState } from 'react'
import style from './TransactionList.module.scss'
import TransactionInfo from '@/components/my_ui/transaction_info/TransactionInfo'
import { ITransaction } from '@/types/transaction.types'
import { transactionService } from '@/services/transaction/transaction.service'
import { useQuery } from '@tanstack/react-query'
import { Separator } from '@/components/ui/separator'


type Props = {
  cardId:string,
}

function TransactionList({cardId}: Props) {
  const[transaction,setTransaction] = useState<ITransaction[]>([])
 
  const query = useQuery({
    queryKey: ['transaction'],
    queryFn: async()=> {
      const response = await transactionService.getAllByCardId(cardId)
      setTransaction(response.data)  
      return response.data
    }
  })

  
  useEffect(()=>{query.refetch()},[cardId])
  const array = [...transaction].reverse()
 
  return (
    <div className={style.container}>  
      <div className={style.containerTop}>
        <p>Transaction</p>
      </div>
      <div className={style.containerScroll}>
        <div className={style.containerList}>
        {
          query.isFetching
            ?<p>Loading...</p>
            : transaction.length == 0 
                ?<p>No yet transactions</p>
                : array.map((card)=>(
                  <div key={card.id}>
                    <TransactionInfo card={card}/>
                    <Separator className='my-3'/>
                  </div>
                ))
        }
        </div>
      </div>
    </div>
    
     
  )
}

export default TransactionList