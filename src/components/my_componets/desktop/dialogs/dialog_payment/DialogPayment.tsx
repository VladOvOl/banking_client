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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cardToolService } from "@/services/tools/cardTools.service"
import { utilsService } from "@/services/tools/utils.service"
import { transactionService } from "@/services/transaction/transaction.service"
import { useCardStore } from "@/store/card.store"
import { useCreatePaymentDialogStore } from "@/store/dialog.store"
import { usePaymentStore } from "@/store/payment.store"
import { ICard } from "@/types/card.types"
import { IUnderPaymentBlocks } from "@/types/payment.types"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

interface IProps{
    title: string
}

export function DialogPayment() {

  const {isOpen,setIsOpenState} = useCreatePaymentDialogStore()
  const {arrayCardStore} = useCardStore()
  const {
    currentPayments,
    currentPaymentForm,
    setCurrentPaymentForm,
    setEmptyForm
  } = usePaymentStore()

  const [arrayCard, setArrayCard] = useState(arrayCardStore)
  const [selectCard,setSelectCard] = useState(false)
  const [selectCategory,setSelectCategory] = useState(false)
  const [category,setCategory] = useState<IUnderPaymentBlocks>()
  const [inputCheck,setInputCheck] = useState(false)
  

  const onChooseSelectCard = (e: ICard) => {
    setSelectCard(true)
    setCurrentPaymentForm({
      userSenderCardNumber: e.cardNumber,
      userRecipientCardNumber: currentPaymentForm.userRecipientCardNumber,
      userRecipientCardName: currentPaymentForm.userRecipientCardName,
      userSenderCardMonth: e.cardDateMonth.toString(),
      userSenderCardYear: e.cardDateYear.toString(),
      userSenderCardCVC: utilsService.decrypt(e.cardCVC.toString(),e.id),
      value: currentPaymentForm.value,
      typeTransaction: currentPayments.type
    })
  }

  const onChooseSelectCategory = (e: IUnderPaymentBlocks) => {
    setCategory(e)
    setSelectCategory(true)
    setCurrentPaymentForm({
      userSenderCardNumber: currentPaymentForm.userSenderCardNumber,
      userRecipientCardNumber: currentPaymentForm.userRecipientCardNumber,
      userRecipientCardName: e.title,
      userSenderCardMonth: currentPaymentForm.userSenderCardMonth,
      userSenderCardYear: currentPaymentForm.userSenderCardYear,
      userSenderCardCVC: currentPaymentForm.userSenderCardCVC,
      value: currentPaymentForm.value,
      typeTransaction: currentPayments.type
    })
  }

  const onChangeInputNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCheck(true)
    setCurrentPaymentForm({
      userSenderCardNumber: currentPaymentForm.userSenderCardNumber,
      userRecipientCardNumber: e.target.value,
      userRecipientCardName: currentPaymentForm.userRecipientCardName,
      userSenderCardMonth: currentPaymentForm.userSenderCardMonth,
      userSenderCardYear: currentPaymentForm.userSenderCardYear,
      userSenderCardCVC: currentPaymentForm.userSenderCardCVC,
      value: currentPaymentForm.value,
      typeTransaction: currentPayments.type
    })
  }

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCheck(true)
    setCurrentPaymentForm({
      userSenderCardNumber: currentPaymentForm.userSenderCardNumber,
      userRecipientCardName: currentPaymentForm.userRecipientCardName,
      userRecipientCardNumber: currentPaymentForm.userRecipientCardNumber,
      userSenderCardMonth: currentPaymentForm.userSenderCardMonth,
      userSenderCardYear: currentPaymentForm.userSenderCardYear,
      userSenderCardCVC: currentPaymentForm.userSenderCardCVC,
      value: Number(e.target.value),
      typeTransaction: currentPayments.type
    })
  }

  const onClickCancel = () => {
    setEmptyForm()
    setCategory(undefined)
    setSelectCard(false)
    setSelectCategory(false)
    setInputCheck(false)
    setIsOpenState(false)
  }

  const onClickContinue = () => {
    mutation.mutate()
  }

  const mutation = useMutation({
    mutationKey:['createPaymentInDialog'],
    mutationFn: async () => await transactionService.createPayment(currentPaymentForm),
    onSuccess: () => {
      setIsOpenState(false)
    }     
    
  })
      
    return (
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{currentPayments.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {"Make "+currentPayments.title}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="card">
                Choose your credit card number
              </Label>
              //@ts-ignore
              <Select onValueChange={(e: ICard)=> onChooseSelectCard(e)} >
                <SelectTrigger id="card">
                  <SelectValue placeholder= 'Choose your card' />
                </SelectTrigger>
                <SelectContent>
                  {
                    arrayCard.map((obj,key)=>(
                    //@ts-ignore
                    <SelectItem value={obj} key={key}>
                        {cardToolService.maskCreditCardNumber(obj.cardNumber)}
                    </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            { selectCard &&
              <div className="flex flex-col gap-1">
                <Label htmlFor="d">
                    Choose category
                </Label>
                //@ts-ignore
                <Select onValueChange={(e: IUnderPaymentBlocks) => onChooseSelectCategory(e)}>
                  <SelectTrigger id="d">
                    <SelectValue placeholder="Choose your category" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      currentPayments.underPaymentBlocks.map((obj,key)=>(
                      //@ts-ignore
                      <SelectItem value={obj} key={key}>
                        {obj.title}
                      </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
            }

            { selectCategory && 
              <div>
                <Label htmlFor="card2">
                    {category?.label}
                </Label>
                <Input 
                  maxLength={16}
                  minLength={15}
                  placeholder={category?.placeholder} 
                  onChange={(e) => onChangeInputNumber(e)}
                  value={currentPaymentForm.userRecipientCardNumber}
                /> 
              </div>
            }

            { selectCategory && 
              <div>
                <Label htmlFor="card2">
                  Enter the amount to pay
                </Label>
                <Input 
                  type="number"
                  placeholder={"123.00"} 
                  onChange={(e) => onChangeInputValue(e)}
                  value={currentPaymentForm.value}
                /> 
              </div>
            }  
          </div>
    
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onClickCancel()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => onClickContinue()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }