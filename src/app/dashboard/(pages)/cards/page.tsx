'use client'
import style from "./page.module.scss"
import { CarouselCard } from '@/components/my_componets/desktop/credit_cards/carousel_card/CarouselCard'
import { cardService } from '@/services/card/card.service'
import { useCardStore } from '@/store/card.store'
import { useUserStore } from '@/store/user.store'
import React, { useEffect, useState } from 'react'
import * as CryptoJS from 'crypto-js';
import { useQueryClient } from "@tanstack/react-query"


type Props = {}

/*

  
*/

const CardsPage = (props: Props) => {
  const[arr,setArr]=useState()

  const {userStore} = useUserStore()
  const {setArrayCardStore,arrayCardStore,getData,setReloadCard,reloadCard} = useCardStore()
  const queryClient = useQueryClient()
  

  
  

  async function add2(){
    try {
      await cardService.createCard(
        {cardTitle:"OnlineBank",
        cardUserFullName:"Roman Batkovich",
        cardNumber: '7667000000002121',
        cardDateMonth: 12,
        cardDateYear: 24,
        cardBalance: 500,
        cardStatus: true,
        cardUserPinCode:1234,
        cardCVC: 123,
        userId: userStore.id})
    } catch (error) {
      
    }finally{
     ()=>queryClient.invalidateQueries({queryKey:['cards']})
    } 
  }

  function name(){
    const yourString: string = "Your secret key";

// Шифрование строки
const originalMessage: string = "Hello, world!";
const encryptedMessage: string = CryptoJS.AES.encrypt(originalMessage, yourString).toString();

// Дешифрование строки
const decryptedMessage: string = CryptoJS.AES.decrypt(encryptedMessage, yourString).toString(CryptoJS.enc.Utf8);


  }

  /**
   <button onClick={()=>add2()}>
        createCard
      </button><br />
      
   */
  /**      <button onClick={()=>add2()}>
        createCard
      </button> */



  return (
   <div className={style.container}>
      <div className={style.containerTop}>
        <h1>Card Page</h1>
  
      </div>
      <div className={style.containerData}>
        <CarouselCard/>
      </div>
      
    
   </div>


     
  )
}

export default CardsPage