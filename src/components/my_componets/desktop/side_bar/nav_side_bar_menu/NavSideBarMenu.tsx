'use client'
import { Nav } from '@/components/ui/nav'
import {
    Home,
    Wallet2,
    ArrowLeftRight,
    User,
    PieChartIcon,
    BarChart4Icon,
    CreditCard
  } from "lucide-react"
import { NavCollapsed } from '@/components/ui/nav_collapsed'
import style from './NavSideBarMenu.module.scss'
import { useCardStore } from '@/store/card.store'
import { useEffect, useState } from 'react'
import { ICard } from '@/types/card.types'
import { cardService } from '@/services/card/card.service'
import { useUserStore } from '@/store/user.store'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useGetAllCards } from '@/hooks/api/useGetAllCards'
import { useTransactionStore } from '@/store/transaction.store'
import { transactionService } from '@/services/transaction/transaction.service'
import { userService } from '@/services/user/user.service'


type Props = {}



const NavSideBarMenu = (props: Props) => {

  const {arrayCardStore,setArrayCardStore,reloadCard,setReloadCard} = useCardStore()
  const {setAllTransactionByUser,allTransactionByUser} = useTransactionStore()
  const {userStore,setUserStore} = useUserStore()
  const id = userStore.id
  const arrayOfIds: string[] = arrayCardStore.map(obj => obj.id);

  const allCards = useQuery({
    queryKey: ['cards',id],
    queryFn: async()=> {
      setArrayCardStore(await cardService.getAllCards({userId :id}))
      return "data"
    },
    enabled:!!id,
    refetchInterval:60000
  })

  const allTransaction = useQuery({
    queryKey: ['transactionDashboard',allCards],
    queryFn: async()=> {
      setAllTransactionByUser(await transactionService.getAllByUser(arrayOfIds)) 
      return "transaction"
    },
    enabled:!!allCards,
    refetchInterval:60000
  })
  


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
              icon: CreditCard,
              variant: "ghost",
            },
            {
              title: "Payments",
              href:"/dashboard/payments",
              label: ``,
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
              title: "Statistics",
              href:"/dashboard/statistics",
              label: "",
              icon: BarChart4Icon,
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
              icon: CreditCard,
              variant: "ghost",
            },
            {
              title: "Payments",
              href:"/dashboard/payments",
              label: ``,
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
              title: "Statistics",
              href:"/dashboard/statistics",
              label: "",
              icon: BarChart4Icon,
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