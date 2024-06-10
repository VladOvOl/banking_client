'use client'
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" 
import style from './TransferRecipientFormCardNumber.module.scss'
import { useTransactionStore } from '@/store/transaction.store'

type Props = {}

function TransferRecipientFormCardNumber({}: Props) {

  const {currentTransactionForm,setCurrentTransactionForm}  = useTransactionStore()
  const[money,setMoney] = useState('')

  return (
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Enter recipient card information to transaction
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 h-[172px]">
          <div className="grid gap-2">
            <Label htmlFor="cardNumber">
              Card number
            </Label>
            <Input 
              id="cardNumber" 
              placeholder="0000 **** **** 0000" 
              maxLength={16}
              onChange={(e)=>{setCurrentTransactionForm({
                userSenderCardNumber: currentTransactionForm.userSenderCardNumber,
                userRecipientCardNumber: e.target.value ,
                userSenderCardMonth: currentTransactionForm.userSenderCardMonth,
                userSenderCardYear: currentTransactionForm.userSenderCardYear,
                userSenderCardCVC: currentTransactionForm.userSenderCardCVC,
                value: currentTransactionForm.value,
                typeTransaction:'transfer'
              })}}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              Suma
            </div>
            <div className="grid gap-2">
              <Input 
                id="cvc" 
                placeholder="Enter money"
                value={currentTransactionForm.value}
                onChange={e=>{setCurrentTransactionForm({
                  userSenderCardNumber: currentTransactionForm.userSenderCardNumber,
                  userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber ,
                  userSenderCardMonth: currentTransactionForm.userSenderCardMonth,
                  userSenderCardYear: currentTransactionForm.userSenderCardYear,
                  userSenderCardCVC: currentTransactionForm.userSenderCardCVC,
                  value: +e.target.value,
                  typeTransaction:'transfer'
                })}}
              />
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

export default TransferRecipientFormCardNumber