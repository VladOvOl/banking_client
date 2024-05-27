'use client'
import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import style from './Carouselcard.module.scss'
import BankingCard from "@/components/my_ui/banking_card/BankingCard"
import { useCardStore } from "@/store/card.store"
import BankingNoCard from "@/components/my_ui/banking_no_card/BankingNoCard"
import BankingCardInfo from "../banking_card_info/BankingCardInfo"
import { Button } from "@/components/ui/button"
import {ArrowLeftRight, CircleOffIcon} from "lucide-react"
import DialogTransfer from "../../dialogs/dialog_transfer/DialogTransfer"
import { useCardBlockDialogStore, useTransferDialogStore } from "@/store/dialog.store"
import DialogCardBlock from "../../dialogs/dialog_card_block/DialogCardBlock"
import TransactionList from "../../transfers/transaction_list/TransactionList"
import {useQueryClient } from "@tanstack/react-query"
import { ICard } from "@/types/card.types"
import { create } from "domain"
import { cardToolService } from "@/services/tools/cardTools.service"

const NOCardCarcas = {
  id: '0',
  cardTitle: 'NoCard',
  cardUserFullName: 'NoCard',
  cardNumber: '**** **** **** ****',
  cardDateMonth: 0,
  cardDateYear: 0,
  cardBalance : 0,
  cardCVC: '000',
  cardStatus: false,
  created_at: "",
}
 
export function CarouselCard() {

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [idCard, setIdCard] = useState(0)

  const {arrayCardStore} = useCardStore()
  const {setIsOpenState,isOpen} = useTransferDialogStore()
  const cardBlock = useCardBlockDialogStore()
  const queryClient  = useQueryClient()

  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let card:ICard = arrayCardStore[idCard]
  const arrayCardSort = cardToolService.sortArrayByDateDescending(arrayCardStore)

  console.log(arrayCardStore)
  console.log(arrayCardSort)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setIdCard(api.selectedScrollSnap())
      setCurrent(api.selectedScrollSnap() + 1)
      console.log(api.selectedScrollSnap() + 1)
  
    })
  }, [api])

  return (
    <div className={style.container}>
      <div className={style.containerLeft}>
        <Carousel 
          setApi={setApi} 
          className="w-full max-w-[400px]"
        >
          <CarouselContent>
            {
              arrayCardSort.length!=0 
              ? arrayCardSort.map((obj, index) => (
                <CarouselItem key={index}>
                  <BankingCard card={obj}/>   
                </CarouselItem>
                ))
              : <CarouselItem key={0}>
                  <BankingNoCard/>
                </CarouselItem>
            } 
          </CarouselContent>  
          {
            arrayCardSort.length!=0 &&
            <>
              <CarouselPrevious/>
              <CarouselNext/>
            </>
          }
        </Carousel>

        <div className="text-center text-sm text-muted-foreground">
          {
            arrayCardSort.length!=0 
            && `Slide ${current} of ${arrayCardSort.length}`
          }
        </div> 

        <div className="w-full flex justify-between gap-[5%]">
          <Button 
            className='w-[50%]'
            variant={"secondary"}
            onClick={()=>setIsOpenState(true)}
            disabled={
              card && card.cardStatus
              ?false
              :true}
          >
            <ArrowLeftRight className="mr-2 h-5 w-5"/> 
            Transfer
          </Button>
          <Button 
            className='w-[50%]'
            variant={card && card.cardStatus
              ?"secondary"
              :"default"
            }
            onClick={()=>cardBlock.setIsOpenState(true)}
          >
            <CircleOffIcon className="mr-2 h-5 w-5"/>
            {card && card.cardStatus
              ?<p>Blok Card</p>
              :<p>Un blok Card</p>
            }
          </Button>
        </div>
  
          {
            card && card.cardStatus
            ?
              <>
                { 
                arrayCardSort.length !== 0 
                ? api &&
                <BankingCardInfo 
                  cardId={api.selectedScrollSnap()} 
                  card={card}
                />
                : <BankingCardInfo cardId={0} card={NOCardCarcas}/>
                }
              </>
            : <p>Card block</p>
          }  
        </div>

        <div className={style.containerRight}>
          {card && card.cardStatus 
            ?
              <>
                {
                  card && 
                  <TransactionList cardId={card.id}/>
                }
              </>
            : <div className={style.containerListNone}>
                Card blocked
              </div>
            
          }
        </div>
        {
          arrayCardSort[idCard]&&
          <>
            <DialogTransfer card={card}/>
            <DialogCardBlock card={card}/>
          </>
        }
          
    </div>
      
        
  
  )
}