'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Nav } from '@/components/ui/nav'
import {
    Archive,
    ArchiveX,
    File,
    Home,
    Send,
    Trash2,
    CreditCard,
    Wallet2,
    WalletCards,
    Wallet,
  } from "lucide-react"
import useDeviceSize from '@/hooks/useDeviceSize'



type Props = {}

const NavSideBarMenu = (props: Props) => {
  
  
  const width = useDeviceSize()[0]
  

  return (
  
  <>
    <Nav
      isCollapsed={width > 900 ? false : true}
          links={[
            {
              title: "Dashboard",
              href:"",
              label: "1",
              icon:  Home,
              variant: "default",
            },
            {
              title: "Cards",
              href:"",
              label: "9",
              icon: Wallet2,
              variant: "ghost",
            },
            {
              title: "Sent",
              href:"",
              label: "",
              icon: Send,
              variant: "ghost",
            },
            {
              title: "Junk",
              href:"",
              label: "23",
              icon: ArchiveX,
              variant: "ghost",
            },
            {
              title: "Trash",
              href:"",
              label: "",
              icon: Trash2,
              variant: "ghost",
            },
            {
              title: "Archive",
              href:"",
              label: "",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
    </>
        
  )
}

export default NavSideBarMenu