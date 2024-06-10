"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { DialogTest } from "../../dialogs/dialog_update_password/DialogUpdatePassword"
import { useResetPasswordDialogStore } from "@/store/dialog.store"
import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { useUserStore } from "@/store/user.store"
import { authService } from "@/services/auth/auth.service"
import { useLoadingStore } from "@/store/loading.store"
import { Label } from "@/components/ui/label"
import style from './FormAccount.module.scss'


export function FormAccount() {
  const {isOpen,setIsOpenState,newPassword,setNewPassword} = useResetPasswordDialogStore()
  const { toast } = useToast()
  const {setUserStore,userStore} = useUserStore()
  const {isLoading,setLoadingState} = useLoadingStore()

  const [showPassword, setShowPassword] = useState(false)
  
  const [updateDataUser, setUpdateDataUser] = useState({
    userEmail:userStore.userEmail,
    userFullName:userStore.userFullName,
    userPhoneNumber:userStore.userPhoneNumber,
    userAddress: userStore.userAddress,
    userPassword:newPassword
  })
  
  console.log(updateDataUser)

  
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) =>{
    console.log([e.target.name], e.target.value);
    setUpdateDataUser(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
        
        
    }));
  },[])
  
/*
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) =>{
    setUserStore({
      ...userStore,
      [e.target.name]: e.target.value})
    
  },[])
*/

  async function onSubmit(data:any) {
    try {
      const newData = {...data, userPassword : newPassword}
      setLoadingState(true)
      const response = await authService.updateUser(newData)
      if(response.status ==200){
        setUserStore(response.data.user)
      }
    } catch (error:any) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Something went wrong with login....",
        description: `${error.response.data.message}`,
      })

    }finally{
      setLoadingState(false)
      setNewPassword('')
    } 
  }

  return (
    <>
    <DialogTest/>
    <div className="w-full ">
    <Card className="px-0">
      <CardHeader className="px-0 pt-0">
        <Label>Update account</Label>
        <CardDescription>Enter all string to create done account</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">
                Full Name
              </Label>
              <Input id="name" type='text' 
                name="userFullName"
                placeholder="Enter your full name" 
                value={updateDataUser.userFullName} 
                onChange={e => handleChange(e)}
              />
              <Label className="text-sm text-muted-foreground" 
                htmlFor="name"
              >
                All your information will be protected
              </Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">
                Email
              </Label>
              <Input id="email" 
                type='email' 
                name="userEmail"
                placeholder="Enter your email" 
                value={updateDataUser.userEmail} 
                onChange={e => handleChange(e)}
              />
              <Label 
                htmlFor="email"
                className="text-sm text-muted-foreground"
              >
                All your information will be protected
              </Label>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">
                Phone
              </Label>
              <Input id="phone" 
                name="userPhoneNumber"
                type= "text" 
                placeholder="Enter your password" 
                value={updateDataUser.userPhoneNumber} 
                onChange={e => handleChange(e)}
              />
              <Label 
                htmlFor="phone"
                className="text-sm text-muted-foreground"
              >
                All your information will be protected
              </Label>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">
                Address
              </Label>
              <Input id="address" 
                name="userAddress"
                type= "text" 
                placeholder="Enter your password" 
                value={updateDataUser.userAddress} 
                onChange={e => handleChange(e)}
              />
              <Label 
                htmlFor="address"
                className="text-sm text-muted-foreground"
              >
                All your information will be protected
              </Label>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="repeatPassword">
                Repeat Password
              </Label>
              <Input id="repeatPassword" 
                name="newPassword"
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter your password" 
                value={newPassword} 
                //onChange={(e) => handleChange(e)}
                onClick={() => setIsOpenState(true)}
              />
            
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" 
                  onClick={() => setShowPassword(!showPassword)}
                />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show password
                    </label>
                  </div>
                </div>
              </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-10 px-0">    
        <Button 
          disabled={isLoading}
          onClick={()=>onSubmit(updateDataUser)}>
          Registration
        </Button>
        <Button  
          variant="outline"
          onClick={()=>setUpdateDataUser({...userStore, userPassword:''})}
        >
          Clear form
        </Button>
      </CardFooter>
    </Card>
    </div>
    
    </>
    
  )
}
