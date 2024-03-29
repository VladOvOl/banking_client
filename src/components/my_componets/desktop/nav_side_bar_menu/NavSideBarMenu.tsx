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



type Props = {}

const NavSideBarMenu = (props: Props) => {
  
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