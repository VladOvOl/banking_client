'use client'
import { Nav } from '@/components/ui/nav'
import {
    Home,
    Wallet2,
    ArrowLeftRight,
    User
  } from "lucide-react"
import { NavCollapsed } from '@/components/ui/nav_collapsed'
import style from './NavSideBarMenu.module.scss'
import { useCardStore } from '@/store/card.store'
import { useEffect, useState } from 'react'
import { ICard } from '@/types/card.types'
import { cardService } from '@/services/card/card.service'
import { useUserStore } from '@/store/user.store'
import { useQuery } from '@tanstack/react-query'


type Props = {}



const NavSideBarMenu = (props: Props) => {

  const {arrayCardStore,setArrayCardStore,reloadCard,setReloadCard} = useCardStore()
  const {userStore} = useUserStore()
  const id = userStore.id

  /*useEffect(()=>{
    async function add(){
      try {
        if(userStore.id !== 0){
          const response = await cardService.getAllCards({userId :id})
          setArrayCardStore(response)
        }
      } catch (error) {
        console.log(error)
      }
      finally{

      }
    }   
    add()
       
  },[reloadCard])*/
  
  const {data} = useQuery({
    queryKey: ['card'],
    queryFn: async()=> {
      id!=0 && 
      setArrayCardStore(await cardService.getAllCards({userId :id}))
      return "data"
    },
    refetchInterval:60000
  })

  //setArrayCardStore(data)

  return (
  <>
  <div className={style.containerNonCollapsed}>
    <Nav
      links={[
        {
          title: "Dashboard",
          href:"/dashboard",
          label: "",
          icon:  Home,
          variant: "default",
        },
        {
          title: "Cards",
          href:"/dashboard/cards",
          label: `${arrayCardStore.length}`,
          icon: Wallet2,
          variant: "ghost",
        },
        {
          title: "Transfers",
          href:"/dashboard/transfers",
          label: "",
          icon: ArrowLeftRight,
          variant: "ghost",
        },
        {
          title: "Account",
          href:"/dashboard/account",
          label: "",
          icon: User,
          variant: "ghost",
        },    
      ]}
    />
  </div>
   
  <div className={style.containerCollapsed}>
    <NavCollapsed
      links={[
        {
          title: "Dashboard",
          href:"/dashboard",
          label: "1",
          icon:  Home,
          variant: "default",
        },
        {
          title: "Cards",
          href:"/dashboard/cards",
          label: "9",
          icon: Wallet2,
          variant: "ghost",
        },
        {
          title: "Transfers",
          href:"/dashboard/transfers",
          label: "",
          icon: ArrowLeftRight,
          variant: "ghost",
        },
        {
          title: "Account",
          href:"/dashboard/account",
          label: "",
          icon: User,
          variant: "ghost",
        },    
      ]}
    />
  </div>
  </>
  )

}

export default NavSideBarMenu