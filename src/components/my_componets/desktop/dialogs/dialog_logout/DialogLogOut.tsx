'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { authService } from "@/services/auth/auth.service"
import { useCloseAppDialogStore } from "@/store/dialog.store"


import { useRouter } from "next/navigation"


 export function DialogLogOut() {

    const {isOpen,setIsOpenState} = useCloseAppDialogStore()
    const router = useRouter()

    return (
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Any unsaved data will be lost from your session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>setIsOpenState(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={()=>{
                authService.logOut()
                setIsOpenState(false)
                router.push('/')
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }