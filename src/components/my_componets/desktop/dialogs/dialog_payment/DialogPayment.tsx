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
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authService } from "@/services/auth/auth.service"
import { cardToolService } from "@/services/tools/cardTools.service"
import { utilsService } from "@/services/tools/utils.service"
import { useCardStore } from "@/store/card.store"
import { useCloseAppDialogStore, useCreatePaymentDialogStore } from "@/store/dialog.store"
import { usePaymentStore } from "@/store/payment.store"
import { useTransactionStore } from "@/store/transaction.store"
import { ICard } from "@/types/card.types"
import { IUnderPaymentBlocks } from "@/types/payment.types"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface IProps{
    title: string
}

/**setCurrentTransactionForm({
                userSenderCardNumber: e.cardNumber,
                userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
                userSenderCardMonth: e.cardDateMonth.toString(),
                userSenderCardYear: e.cardDateYear.toString(),
                userSenderCardCVC: utilsService.decrypt(e.cardCVC.toString(),e.id),
                value: currentTransactionForm.value}) */

 export function DialogPayment() {

    const {isOpen,setIsOpenState} = useCreatePaymentDialogStore()
    const {arrayCardStore} = useCardStore()
    const {currentTransactionForm,setCurrentTransactionForm,setEmpty} = useTransactionStore()
    const {currentPayments,setCurrentPayments} = usePaymentStore()

    const [arrayCard, setArrayCard] = useState(arrayCardStore)
    const [selectCard,setSelectCard] = useState(false)
    const [selectCategory,setSelectCategory] = useState(false)
    const [inputCheck,setInputCheck] = useState(false)
    //const [selectCard,setSelectCard] = useState(false)
    const [btn1,setBtn1] = useState<IUnderPaymentBlocks>()
    const [btn2,setBtn2] = useState<IUnderPaymentBlocks>()
    

    console.log(currentPayments)

    const onChooseSelectCard = (e: ICard) => {
      setSelectCard(true)
      setCurrentTransactionForm({
        userSenderCardNumber: e.cardNumber,
        userRecipientCardNumber: currentTransactionForm.userRecipientCardNumber,
        userSenderCardMonth: e.cardDateMonth.toString(),
        userSenderCardYear: e.cardDateYear.toString(),
        userSenderCardCVC: utilsService.decrypt(e.cardCVC.toString(),e.id),
        value: currentTransactionForm.value})
    }

    const onChooseSelectCategory = (e: IUnderPaymentBlocks) => {
      setBtn1(e)
      setSelectCategory(true)
    }

    const onChooseSelectUpperCategory = (e: IUnderPaymentBlocks) => {
      setBtn2(e)
      setInputCheck(true)
      
    }

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
              <Select onValueChange={(e: ICard)=> onChooseSelectCard(e)} >
                <SelectTrigger id="card">
                  <SelectValue placeholder= 'Choose your card' />
                </SelectTrigger>
                <SelectContent>
                  {
                    arrayCard.map((obj,key)=>(
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
                <Select onValueChange={(e: IUnderPaymentBlocks) => onChooseSelectCategory(e)}>
                  <SelectTrigger id="d">
                    <SelectValue placeholder="Choose your category" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      currentPayments.underPaymentBlocks.map((obj,key)=>(
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
              <div className="flex flex-col gap-1"> 
                <Label htmlFor="card2">
                    Choose {btn1?.title.toLowerCase()}
                </Label>
                <Select onValueChange={(e:IUnderPaymentBlocks)=> onChooseSelectUpperCategory(e)} >
                  <SelectTrigger id="card2">
                    <SelectValue placeholder="Choose your card" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      btn1 && btn1.arrayCategories.map((obj,key)=>(
                      <SelectItem value={obj.toString()} key={key}>
                          {obj}
                      </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              }

              { inputCheck && <>
                <Label htmlFor="card2">
                    Your card number
                </Label>
                <Input/>
                </>
              }
          </div>
          
          

          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{
                setEmpty()
                setSelectCard(false)
                setSelectCategory(false)
                setInputCheck(false)
                setBtn1(undefined)
                setBtn2(undefined)
                setIsOpenState(false)}}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={()=>{

                setIsOpenState(false)

              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }