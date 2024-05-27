'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCardStore } from '@/store/card.store'
import React, { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Eye,EyeOff} from 'lucide-react'
import { ICard } from '@/types/card.types'
import { cardToolService } from '@/services/tools/cardTools.service'
import style from './BankingCardInfo.module.scss'

 interface IProps{
  cardId : number
  card : ICard
}



function BankingCardInfo({cardId,card}:IProps) {
  
	const{arrayCardStore} = useCardStore()
  const maskCreditCardNumber = cardToolService.maskCreditCardNumber(card.cardNumber)


  const invoices = [
    {
      invoice: "Card Number",
      paymentMethod: `${maskCreditCardNumber}`,
    },
    {
      invoice: "Card Title",
      paymentMethod: `${card.cardTitle}`,
    },
    {
      invoice: "Card Balance",
      paymentMethod: `${card.cardBalance}`,
    },
    {
      invoice: "Card Status",
      paymentMethod: "+/-",
    },
    {
      invoice: "Card User",
      paymentMethod: `${card.cardUserFullName}`,
    }

  ]
  



  return (
		<div className={style.container}>
      <div className={style.containerScroll}>
       
            
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={3}>Name</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
        <TableBody >
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium" colSpan={3}>{invoice.invoice}</TableCell>
              <TableCell className="text-right">{invoice.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
		

  )
}

export default BankingCardInfo