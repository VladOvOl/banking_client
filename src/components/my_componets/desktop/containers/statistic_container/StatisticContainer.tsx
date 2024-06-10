'use client'
import React, { useEffect, useState } from 'react'
import style from './StatisticContainer.module.scss'
import StatisticCircleChart from '../../charts/statistic_circle_chart/StatisticCircleChart'
import StatisticBlockChart from '../../charts/statistic_block_chart/StatisticBlockChart'
import MainChart2 from '../../charts/statistic_linear_chart copy/MainChart'
import { useStatisticStore } from '@/store/statistic.store'
import { useTransactionStore } from '@/store/transaction.store'
import { ITransaction } from '@/types/transaction.types'
import { ISummary2, transactionUtilsService } from '@/services/transaction/transaction_utils.service'
import CircleChartDashboard from '../../charts/dashboard_circle_chart/CircleChart'
import { Label } from '@/components/ui/label'
import { useCardStore } from '@/store/card.store'
import TransactionListDashboard from '../../transfers/transaction_list_dashboard/TransactionListDashboard'

type Props = {
  period: string
}

function StatisticContainer({period}: Props) {

  const {periodState,setPeriod,setCount} = useStatisticStore()
  const {arrayCardStore} = useCardStore()
  const {allTransactionByUser} = useTransactionStore()  
  const {count,setDate2,date} = useStatisticStore()

  let arrayTransaction: ITransaction[];
  let arr
  let arr2
  let arr3

  if(period != "all"){
    let returnFun = transactionUtilsService.filterObjectsByPeriodToStatistic(allTransactionByUser,period,count)
    arrayTransaction = returnFun.filteredObjects
    arr = transactionUtilsService.calculateSums(arrayTransaction, period)
    arr2 = transactionUtilsService.calculateSums2(arrayTransaction, period)
    arr3 = transactionUtilsService.summarizeTransactionsByType(arrayTransaction)
  }else{
    arrayTransaction=allTransactionByUser
    arr = transactionUtilsService.calculateSums(arrayTransaction, period)
    arr2 = transactionUtilsService.calculateSums2(arrayTransaction, period)
    arr3 = transactionUtilsService.summarizeTransactionsByType(arrayTransaction)
  }
  
  useEffect(() => {
    setCount(0)
    setPeriod(period)
  },[periodState])
  //<StatisticBlockChart array={arr2 && arr2}/>

/**<MainChart2 period={period} array={arr}/> */
  return (
    <div className={style.container}>
        <div className={style.containerData}>
          <div className={style.containerTop}>
            <div className={style.containerLeft}>
              <MainChart2 period={period} array={arr}/>
            </div>

            <div className={style.containerRight}>
              Expenses by category
              <div className="h-[80%] w-[100%]">
                <CircleChartDashboard arr={arr3}/>
              </div>
            </div>
            

          </div>
          <div className={style.containerBottom}>

            <div className={style.containerLeft}>
            <p>Income and Expenses</p>
            <StatisticBlockChart array={arr2}/>
            </div>
            <div className="w-[48%] overflow-hidden">
              <TransactionListDashboard 
                cardId = {arrayCardStore[0] && arrayCardStore[0].id}
                period = {period}
              />
            </div> 
          </div>
        </div>   
    </div>
  )
}

export default StatisticContainer