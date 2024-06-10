'use client'
import React from 'react'
import {ArrowBigLeft, ArrowBigRight} from 'lucide-react'
import style from './StatisticCurrentDate.module.scss'
import { useStatisticStore } from '@/store/statistic.store'
import { dateAndTimeService } from '@/services/tools/dateAndTime.service'

type Props = {}

function StatisticCurrentDate({}: Props) {
  let {count,setCount,setDate,date,periodState} = useStatisticStore()
  //console.log(count)
  //console.log(periodState)
  
  let currentDate
  //console.log(currentDate)
  //console.log(date)

  if(periodState != "all")
    currentDate = dateAndTimeService.calculatePeriod(date.startDate,periodState,count)

  function onClik(){
    setCount(count-1)
    //setDate(count-1)
    
  }

  function onClik2(){
    setCount(count+1)
    //setDate(count+1)
  }

  return (
    <>
      <ArrowBigLeft className={style.left} onClick={() => onClik()}/>
        <div>
          {
            periodState != "day"
              ?<>{currentDate?.startDate} - {currentDate?.endDate}</>
              :<>{currentDate?.endDate}</>
          }
        </div>
      <ArrowBigRight className={style.right} onClick={() => onClik2()}/>
    </>
  )
}

export default StatisticCurrentDate