'use client'
import { Nav } from '@/components/ui/nav_mobile'
import {
    Home,
    Wallet2,
    ArrowLeftRight,
    User,
    Settings
  } from "lucide-react"
import useDeviceSize from '@/hooks/useDeviceSize'



type Props = {}

const NavFooterMenu = (props: Props) => {
  
  
  const width = useDeviceSize()[0]
  

  return (
    <Nav
          links={[

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
              title: "Dashboard",
              href:"/dashboard",
              label: "1",
              icon:  Home,
              variant: "default",
            },
            {
              title: "Setting",
              href:"/dashboard/settings",
              label: "1",
              icon:  Settings,
              variant: "default",
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
  )
}

export default NavFooterMenu