'use client'
import { Nav } from '@/components/ui/nav'
import useDeviceSize from '@/hooks/useDeviceSize'
import { Settings } from 'lucide-react'
import React from 'react'

type Props = {}

const NavSettings = (props: Props) => {
   
    const width = useDeviceSize()[0]
  

    return (
      <Nav
        isCollapsed={width > 900 ? false : true}
            links={[
              {
                title: "Settings",
                href:"/dashboard/settings",
                label: "",
                icon:  Settings,
                variant: "ghost",
              }
            ]}
        />   
  )
}

export default NavSettings