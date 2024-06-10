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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import style from './TransferSenderFormCardNumber.module.scss'
import { useTransactionStore } from '@/store/transaction.store'

type Props = {}

function TransferSenderFormCardNumber({}: Props) {

  const[month,setMonth]=useState('')
  const[year,setYear]=useState('')
  const {currentTransactionForm,setCurrentTransactionForm} = useTransactionStore()


  return (
    <div className={style.container}>
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle>
            Payment Method
          </CardTitle>
          <CardDescription>
            Enter your card information to transaction
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="number">Card number</Label>
            <Input 
              id="number" 
              placeholder="0000 **** **** 0000" 
              maxLength={16}
              onChange={(e)=>{setCurrentTransactionForm({
                userSenderCardNumber: e.target.value,
                userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
                userSenderCardMonth: currentTransactionForm.userSenderCardMonth,
                userSenderCardYear: currentTransactionForm.userSenderCardYear,
                userSenderCardCVC: currentTransactionForm.userSenderCardCVC,
                value: currentTransactionForm.value,
                typeTransaction:'transfer'
              })}}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">
                Month
              </Label>
              <Select  onValueChange={(e)=>setCurrentTransactionForm({
                userSenderCardNumber: currentTransactionForm.userSenderCardNumber,
                userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
                userSenderCardMonth: e.toString(),
                userSenderCardYear: currentTransactionForm.userSenderCardYear,
                userSenderCardCVC: currentTransactionForm.userSenderCardCVC,
                value: currentTransactionForm.value,
                typeTransaction:'transfer'
              })}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">January(1)</SelectItem>
                  <SelectItem value="2">February(2)</SelectItem>
                  <SelectItem value="3">March(3)</SelectItem>
                  <SelectItem value="4">April(4)</SelectItem>
                  <SelectItem value="5">May(5)</SelectItem>
                  <SelectItem value="6">June(6)</SelectItem>
                  <SelectItem value="7">July(7)</SelectItem>
                  <SelectItem value="8">August(8)</SelectItem>
                  <SelectItem value="9">September(9)</SelectItem>
                  <SelectItem value="10">October(10)</SelectItem>
                  <SelectItem value="11">November(11)</SelectItem>
                  <SelectItem value="12">December(12)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">
                Year
              </Label>
              <Select onValueChange={(e)=>setCurrentTransactionForm({
                userSenderCardNumber: currentTransactionForm.userSenderCardNumber,
                userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
                userSenderCardMonth: currentTransactionForm.userSenderCardMonth,
                userSenderCardYear: e.toString(),
                userSenderCardCVC: currentTransactionForm.userSenderCardCVC,
                value: currentTransactionForm.value,
                typeTransaction:'transfer'
              })}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i}  value={`${new Date().getFullYear() + i - 2000}`}>
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">
                CVC
              </Label>
              <Input 
                id="cvc" 
                placeholder="CVC" 
                maxLength={3}
                onChange={(e)=>setCurrentTransactionForm({
                  userSenderCardNumber: currentTransactionForm.userSenderCardNumber,
                  userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
                  userSenderCardMonth: currentTransactionForm.userSenderCardMonth,
                  userSenderCardYear: currentTransactionForm.userSenderCardYear,
                  userSenderCardCVC: e.target.value,
                  value: currentTransactionForm.value,
                  typeTransaction:'transfer'
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransferSenderFormCardNumber