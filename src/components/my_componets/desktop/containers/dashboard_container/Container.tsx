'use client'
import React, { useState } from 'react'
import MainChart from '../../charts/dashboard_linear_chart/MainChart'
import style from './Container.module.scss'
import TransactionListDashboard from '../../transfers/transaction_list_dashboard/TransactionListDashboard'
import { useCardStore } from '@/store/card.store'
import CircleChart from '../../charts/dashboard_circle_chart/CircleChart'
import TransferDashboardContainer from '../../transfers/transfer_dashboard_container/TransferDashboardContainer'
import CircleChartDashboard from '../../charts/dashboard_circle_chart/CircleChart'
import { useTransactionStore } from '@/store/transaction.store'
import { ITransaction } from '@/types/transaction.types'
import { transactionUtilsService } from '@/services/transaction/transaction_utils.service'



type Props = {
  period : string
}

function Container({period}: Props) {
 
  const {arrayCardStore} = useCardStore()
  const {allTransactionByUser} = useTransactionStore()  

  let arrayTransaction: ITransaction[];
  let arr
  let arr2

  if(period != "all"){
    arrayTransaction = transactionUtilsService.filterObjectsByPeriod(allTransactionByUser,period,0)
    arr = transactionUtilsService.calculateSums(arrayTransaction, period)
    arr2 = transactionUtilsService.summarizeTransactionsByType(arrayTransaction)

  }else{
    arrayTransaction=allTransactionByUser
    arr = transactionUtilsService.calculateSums(arrayTransaction, period)
    arr2 = transactionUtilsService.summarizeTransactionsByType(arrayTransaction)
    
  }
  const total = arrayTransaction.length != 0 && 
    transactionUtilsService.sumValues(arrayTransaction)

  return (
    <div className={style.container}>
        <div className={style.containerLeft}>
            <div className={style.containerChart}>
                <MainChart arr={arr} total={total}/>
            </div>
            <div className={style.containerBottom}>
              <TransferDashboardContainer/>
            </div>
        </div>
        <div className={style.containerRight}>
            <div className={style.containerTop}>
              <p>Expenses by category</p>
              <div className="w-[100%] h-[100%]">
                 <CircleChartDashboard arr={arr2}/>
              </div>
            </div>
            <div className={style.containerBottom}>
                <TransactionListDashboard 
                  cardId = {arrayCardStore[0] && arrayCardStore[0].id}
                  period = {period}
                />
            </div>
            
        </div>
    </div>
  )
}

export default Container