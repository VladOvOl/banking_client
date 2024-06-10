'use client'
import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import style from './MainChart.module.scss'
import { useTransactionStore } from '@/store/transaction.store';
import {DollarSign} from 'lucide-react'
import { ITransaction } from '@/types/transaction.types';
import { transactionUtilsService } from '@/services/transaction/transaction_utils.service';
 


interface IProps {
  arr : any,
  total:number| false
}

const MainChart =({arr,total}:IProps)=> {


  
  return(
    <div className={style.container}>
      <div className={style.containerTotal}>
        Total money by period: {total} 
        <DollarSign width={15}/>
      </div>
      <ResponsiveContainer height={'90%'}>
        <LineChart 
          data={arr && [{},...arr]} 
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