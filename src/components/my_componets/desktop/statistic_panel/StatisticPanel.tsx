'use client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import style from './StatisticPanel.module.scss'
import { useCardStore } from '@/store/card.store'
import { cardToolService } from '@/services/tools/cardTools.service'

type Props = {}

function StatisticPanel({}: Props) {

  const {arrayCardStore} = useCardStore()
  const [arrayCards,setArrayCards] = useState(arrayCardStore)

  return (
    <div className={style.container}>
      <Select>
        <SelectTrigger>
            <SelectValue placeholder="All cards" defaultValue={"All"}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All">All cards</SelectItem>
            {
            arrayCards.map((obj,key)=>(
              <SelectItem value={obj} key={key}>
                {cardToolService.maskCreditCardNumber(obj.cardNumber)}
              </SelectItem>
            ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
        
  )
}

export default StatisticPanel