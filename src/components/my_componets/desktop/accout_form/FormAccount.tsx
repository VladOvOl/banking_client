"use client"
import {useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast, useToast } from "@/components/ui/use-toast"
import { DialogTest } from "../dialogs/dialog_test/DialogTest"
import { useResetPasswordDialogStore } from "@/store/dialog.store"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useUserStore } from "@/store/user.store"
import { authService } from "@/services/auth/auth.service"
import { IUpdateUser } from "@/types/user.types"
import { useLoadingStore } from "@/store/loading.store"


export function FormAccount() {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const {isOpen,setIsOpenState,newPassword,setNewPassword} = useResetPasswordDialogStore()
  const { toast } = useToast()
  const {setUserStore,userStore} = useUserStore()
  const {isLoading,setLoadingState} = useLoadingStore()

  const form = useForm({
    mode: "onSubmit",
  })


  async function onSubmit(data:any) {
    try {

      setLoadingState(true)
      const newData = {...data,email: userStore.email }
      const response = await authService.updateUser(newData)
      setUserStore(response.data.user)

    } catch (error:any) {

      toast({
        variant: "destructive",
        title: "Something went wrong with login....",
        description: `${error.response.data.message}`,
      })

    }finally{
      setLoadingState(false)
    } 
  }

  //form.setValue('password',newPassword)
  return (
    <>
    <DialogTest/>
  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />        
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />     

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Reset password</FormLabel>
              <FormControl>
                <Input placeholder="Reset your old password" {...field} 
                  //onClick={()=>setIsOpenState(true)}
                  type={isShowPassword ? "text" : "password"}/>
              </FormControl>
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" 
                  onClick={() => setIsShowPassword(!isShowPassword)}
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
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-5'>
          <Button type="submit">Update profile</Button>

          <Button type="button" 
            onClick={()=>{
              form.reset({
                fullName:"",
                phoneNumber:"",
                address:"",
                password:"" 
              })
              setNewPassword("")
          }}>
            Clear Form
          </Button>
        </div>
        
      </form>
    </Form>

    <DialogTest/>
    </>
  )
}
