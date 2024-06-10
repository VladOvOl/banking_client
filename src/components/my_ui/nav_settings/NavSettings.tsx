'use client'
import { Nav } from '@/components/ui/nav'
import { NavCollapsed } from '@/components/ui/nav_collapsed'
import { LogOut, Settings } from 'lucide-react'
import style from './NavSettings.module.scss'
import { useCloseAppDialogStore } from '@/store/dialog.store'




type Props = {}

const NavSettings = (props: Props) => {
   
    const {setIsOpenState} = useCloseAppDialogStore()

    return (
      <>
        <div className={style.containerNonCollapsed}>
          <Nav
            links={[
              {
                title: "LogOut",
                href:"#",
                label: "",
                icon:  LogOut,
                variant: "ghost",
                action:()=>{
                 setIsOpenState(true)
                  
                }
                
              }
            ]}
          />
        </div>
           
        <div className={style.containerCollapsed}>
          <NavCollapsed 
            links={[
              {
                title: "LogOut",
                href:"#",
                label: "",
                icon:  LogOut,
                variant: "ghost",
                action:()=>{
                  setIsOpenState(true)
                }
              }
            ]}
          />
        </div>    
      </>       
  )
}

export default NavSettings