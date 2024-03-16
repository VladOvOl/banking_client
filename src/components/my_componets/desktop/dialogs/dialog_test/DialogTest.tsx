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
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResetPasswordDialogStore } from "@/store/dialog.store"
import { useState } from "react"


 
interface Props{
    open:boolean
}

export function DialogTest() {

  const [password,setPassword] = useState('')
  const [repeatPassword,setRepeatPassword] = useState('')
  const {isOpen,setIsOpenState,setNewPassword} = useResetPasswordDialogStore()

  return (
    <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Any unsaved data will be lost from your session.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Enter new password
            </Label>
            <Input
              id="password"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password2" className="text-right">
              Repeat new password
            </Label>
            <Input
              id="password2"
              defaultValue="@peduarte"
              className="col-span-3"
              value={repeatPassword}
              onChange={(e)=>setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setIsOpenState(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={()=>{
          password === repeatPassword ? 
          setNewPassword(password):
          alert("Error")
          setIsOpenState(false)
        }}>
          Update password
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}