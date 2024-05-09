'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { utilsService } from "@/services/tools/utils.service"
import { transactionService } from "@/services/transaction/transaction.service"
import { useTransferDialogStore } from "@/store/dialog.store"
import { useLoadingStore } from "@/store/loading.store"
import { useTransactionStore } from "@/store/transaction.store"
import { ICard } from "@/types/card.types"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"


type Props = {
  card:ICard
}

function DialogTransfer({card}: Props) {

  const {toast} = useToast()
  const {currentTransactionForm,setEmpty,setCurrentTransactionForm} = useTransactionStore()
  const {setLoadingState} = useLoadingStore()
  const [btnState,setButtonState] = useState(true)
  const {isOpen,setIsOpenState} = useTransferDialogStore()

  useEffect(()=>{
    setCurrentTransactionForm({
      userSenderCardNumber: card.cardNumber,
      userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
      userSenderCardMonth: card.cardDateMonth.toString(),
      userSenderCardYear: card.cardDateYear.toString(),
      userSenderCardCVC: utilsService.decrypt(card.cardCVC,card.id),
      value: currentTransactionForm.value
    })
  },[]) 

  const mutation = useMutation({
    mutationKey:['createTransactionDialog'],
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
    <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Any unsaved data will be lost from your session.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex  justify-between items-center">
          <Label className="w-full">
            Your card number
          </Label>
          <Label className="w-full">
            {card.cardNumber}
          </Label>
        </div>
          
          <div className="flex  justify-between items-center">
            <Label htmlFor="password" className="w-full">
              Enter recipient card number
            </Label>
            <Input
              id="card"
              className="w-full]"
              value={currentTransactionForm.userRecipientCardNumber}
              maxLength={16}
              onChange={(e)=>{setCurrentTransactionForm({
                userSenderCardNumber: currentTransactionForm.userSenderCardNumber,
                userRecipientCardNumber: e.target.value,
                userSenderCardMonth: currentTransactionForm.userSenderCardMonth,
                userSenderCardYear: currentTransactionForm.userSenderCardYear,
                userSenderCardCVC: currentTransactionForm.userSenderCardCVC,
                value: currentTransactionForm.value
              })}}
            /> 
            
          </div>
          <div className="flex  justify-between items-center">
            <Label htmlFor="card" className="w-full">
              Enter the amount of money
            </Label>
            <Input
              id="card"
              className="w-[50%]"
              value={currentTransactionForm.value}
              onChange={(e)=>{setCurrentTransactionForm({
                userSenderCardNumber: currentTransactionForm.userSenderCardNumber,
                userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
                userSenderCardMonth: currentTransactionForm.userSenderCardMonth,
                userSenderCardYear: currentTransactionForm.userSenderCardYear,
                userSenderCardCVC: currentTransactionForm.userSenderCardCVC,
                value: +e.target.value
              })}}
            /> 
            
          </div>
        </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setIsOpenState(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          onClick={()=>mutation.mutate()}
          disabled={btnState?false:true}
        >
          Create transaction
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DialogTransfer