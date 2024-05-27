'use client'
import React, { useState } from 'react'
import style from './TransferContainer.module.scss'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TransferSenderFormCardNumber from '../transfer_sender_form_card_number/TransferSenderFormCardNumber'
import TransferRecipientFormCardNumber from '../transfer_recipient_form_card_number/TransferRecipientFormCardNumber'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import TransferSenderFormCard from '../transfer_sender_form_card/TransferSenderFormCard'
import { useTransactionStore } from '@/store/transaction.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '@/services/transaction/transaction.service'
import { useLoadingStore } from '@/store/loading.store'
import { useToast } from '@/components/ui/use-toast'

type Props = {}

function TransferContainer({}: Props) {

  const queryClient = useQueryClient()
  const {toast} = useToast()
  const {currentTransactionForm,setEmpty} = useTransactionStore()
  const {setLoadingState} = useLoadingStore()
  const [btnState,setButtonState] = useState(true)


  const mutation = useMutation({
    mutationKey:['createTransaction'],
    mutationFn: async()=> {
      setButtonState(false),
      setLoadingState(true),
      await transactionService.createTransaction(currentTransactionForm)},
    onSuccess:()=>{
      toast({
        variant: "default",
        title: "Success",
        description: `Everything was correct`,
      })
      queryClient.invalidateQueries({queryKey:['transactionDashboard']})
    },
    onError:(error:any)=>{
      toast({
        variant: "destructive",
        title: "Something went wrong with transaction....",
        description: `${error.response.data.message}`,
      })
    },
    onSettled:()=>{
      setButtonState(true)
      setLoadingState(false)
      setEmpty()

    }
  })

  return (
    <div className={style.container}>
      <div className={style.containerTransfer}>
        <div className={style.containerSender}>
          <p className={style.titleContainer}>
            Sender
          </p>
          <Tabs defaultValue="card" className="w-[100%]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="cardNumber">Card Number</TabsTrigger>
            </TabsList>
            <TabsContent value="card">
            </TabsContent>
            <TabsContent value="cardNumber">
              <TransferSenderFormCardNumber/>
            </TabsContent>
            <TabsContent value="card">
              <TransferSenderFormCard/>
            </TabsContent>
          </Tabs>
        </div>

        <Separator orientation='vertical' className='h-25'/>

        <div className={style.containerRecipient}>
          <p className={style.titleContainer}>
            Recipient
          </p>
        <Tabs defaultValue="cardNumber" className="w-[100%]">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="cardNumber">Card Number</TabsTrigger>
          </TabsList>
          <TabsContent value="cardNumber">
            <TransferRecipientFormCardNumber/>
          </TabsContent>
        </Tabs>
        </div>
      </div>
      <Separator/>
      <div className={style.containerFooter}>
        <p>Click to "Continue" your agree with privity</p>
        <Button 
          onClick={()=>mutation.mutate()}
          disabled={btnState?false:true}
        >
          Continue
        </Button>
      </div>

    </div>
  )
}

export default TransferContainer