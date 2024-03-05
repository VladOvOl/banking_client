'use client'
import { Nav } from '@/components/ui/nav'
import {
    Home,
    Wallet2,
    ArrowLeftRight,
    User
  } from "lucide-react"
import useDeviceSize from '@/hooks/useDeviceSize'
import { NavCollapsed } from '@/components/ui/nav_collapsed'



type Props = {}

const NavSideBarMenu = (props: Props) => {
  
  
  const width = useDeviceSize()[0]
  

  return (
  <>
   { width>900? <Nav
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
    /> :    <NavCollapsed
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
  />} 
  </>
  )

}

export default NavSideBarMenu