'use client'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import style from './MainChart.module.scss'
import {DollarSign} from 'lucide-react'
import { transactionUtilsService } from '@/services/transaction/transaction_utils.service';



interface IProps {
  period : string
  array: any
}

const MainChart =({period,array}:IProps)=> {

  const total = array.length != 0 && 
    transactionUtilsService.sumValues(array)
  
  return(
    <div className={style.container}>
      <div className={style.containerTotal}>
        Total money by period: {total} 
        <DollarSign width={15}/>
      </div>
      <ResponsiveContainer height={'90%'}>
        <LineChart 
          data={[{},...array]} 
          margin={{ top: 20, right: 30, bottom: 10, left: -10 }}
        >
          <Line type="monotone" dataKey="value" stroke="black" strokeWidth={2}/>
          <XAxis dataKey="name" stroke='grey'/>
          <YAxis stroke='grey' />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
    
)}
export default MainChart