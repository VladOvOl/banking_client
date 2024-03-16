'use client'
import { Nav } from '@/components/ui/nav'
import { NavCollapsed } from '@/components/ui/nav_collapsed'
import { LogOut, Settings } from 'lucide-react'
import style from './NavSettings.module.scss'
import { authService } from '@/services/auth/auth.service'
import { MyAlertDialog } from '../../components/my_componets/desktop/dialogs/alert_dialog/MyAlertDialog'
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
                title: "Settings",
                href:"/dashboard/settings",
                label: "",
                icon:  Settings,
                variant: "ghost",
                
              },
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
                title: "Settings",
                href:"/dashboard/settings",
                label: "",
                icon:  Settings,
                variant: "ghost",
              },
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