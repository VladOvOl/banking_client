'use client'
import React, { useState } from 'react'
import MainChart from '../../charts/dashboard_linear_chart/MainChart'
import style from './Container.module.scss'
import TransactionListDashboard from '../../transfers/transaction_list_dashboard/TransactionListDashboard'
import { useCardStore } from '@/store/card.store'
import CircleChart from '../../charts/dashboard_circle_chart/CircleChart'



type Props = {
  period : string
}

function Container({period}: Props) {
 
  const {arrayCardStore} = useCardStore()

  return (
    <div className={style.container}>
        <div className={style.containerLeft}>
            <div className={style.containerChart}>
                <MainChart period={period}/>
            </div>
            <div className={style.containerBottom}>

            </div>
        </div>
        <div className={style.containerRight}>
            <div className={style.containerTop}>
              <div className={style.containerLeftTop}>
              
              </div>
              <div className={style.containerRightTop}>
         
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