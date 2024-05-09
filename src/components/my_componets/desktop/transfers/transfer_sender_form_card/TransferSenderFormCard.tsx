'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cardToolService } from '@/services/tools/cardTools.service'
import { utilsService } from '@/services/tools/utils.service'
import { useCardStore } from '@/store/card.store'
import { useTransactionStore } from '@/store/transaction.store'
import { ICard } from '@/types/card.types'
import React from 'react'

type Props = {}

function TransferSenderFormCard({}: Props) {

  const {arrayCardStore} = useCardStore()
  const {currentTransactionForm,setCurrentTransactionForm} = useTransactionStore()

  return (
    <Card className="w-[100%]">
    <CardHeader>
      <CardTitle>Payment Method</CardTitle>
      <CardDescription>
      Choose your card to transaction
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="card">Your card number</Label>
          <Select onValueChange={(e:ICard)=>setCurrentTransactionForm({
                userSenderCardNumber: e.cardNumber,
                userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
                userSenderCardMonth: e.cardDateMonth.toString(),
                userSenderCardYear: e.cardDateYear.toString(),
                userSenderCardCVC: utilsService.decrypt(e.cardCVC.toString(),e.id),
                value: currentTransactionForm.value
              })}>
            <SelectTrigger id="card">
              <SelectValue placeholder="Choose your card" />
            </SelectTrigger>
            <SelectContent>
              {
                arrayCardStore.map((obj,key)=>(
                  <SelectItem value={obj} key={key}>
                    {cardToolService.maskCreditCardNumber(obj.cardNumber)}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
    </CardContent>
  </Card>
  )
}

export default TransferSenderFormCard