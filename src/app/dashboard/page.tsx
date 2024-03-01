'use client'
import React from 'react'
import style from './page.module.scss'
import { axiosWithAuth, axiosWithOutAuth } from '@/api/interceptors'
import { toast } from "sonner"
import { ToastAction } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'


type Props = {}


const DashboardPage = async (props: Props) => {

  
  return (
    <div className={style.container}>
      <p>Dashboard</p>
      <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
    </div>
  )
}

export default DashboardPage