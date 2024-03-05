'use client'
import { Nav } from '@/components/ui/nav'
import { NavCollapsed } from '@/components/ui/nav_collapsed'
import useDeviceSize from '@/hooks/useDeviceSize'
import { Settings } from 'lucide-react'
import React from 'react'

type Props = {}

const NavSettings = (props: Props) => {
   
    const width = useDeviceSize()[0]
  

    return (
      <>
        {width > 900 ? 
        <Nav
        
        links={[
          {
            title: "Settings",
            href:"/dashboard/settings",
            label: "",
            icon:  Settings,
            variant: "ghost",
          }
        ]}
    />   : 
    <NavCollapsed
        
    links={[
      {
        title: "Settings",
        href:"/dashboard/settings",
        label: "",
        icon:  Settings,
        variant: "ghost",
      }
    ]}
/>}
      </>
       
  )
}

export default NavSettings