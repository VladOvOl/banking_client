'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { authService } from "@/services/auth/auth.service"
import { IUser } from "@/types/user.types"
import { useLoadingStore } from "@/store/loading.store"
import { useUserStore } from "@/store/user.store"


 
export function FormRegistration() {

  const router = useRouter()
  const { toast } = useToast()
  const {isLoading,setLoadingState} = useLoadingStore()
  const {setUserStore} = useUserStore()


  const[email, setEmail]=  useState('')
  const[name, setName]=  useState('')
  const[password, setPassword]=useState('')
  const[repeatPassword, setRepeatPassword]=useState('')
  const [showPassword, setShowPassword] = useState(false)
  

  let User = {
    email: email,
    name:name,
    password: password
  }

  console.log(User)

  function showErrorNotification(message:string){
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: `${message}`,
    })
  }
  
  async function registrationUser(data:IUser) {
    if(password === repeatPassword){
      try {
        setLoadingState(true)
        const result = await authService.registrationUser(data)
        setUserStore(result.data.user)
        router.replace('/dashboard')
        

      } catch (error:any) {
        showErrorNotification(error.response.data.message)
      }finally{
        setLoadingState(false)
      }
      
    }else{
      showErrorNotification("Password must be equals")
    }
    
  }
  

  return (
    <Card >
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter all string to create account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type='text' placeholder="Enter your full name" value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type='email' placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="repeatPassword">Repeat Password</Label>
              <Input id="repeatPassword" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={repeatPassword} onChange={e=>setRepeatPassword(e.target.value)}/>
            
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" onClick={() => setShowPassword(!showPassword)}/>
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
      <CardFooter className="flex justify-between">
        <Button  variant="outline">Clear form</Button>
        <Button 
          disabled={isLoading}
          onClick={() => {registrationUser(User)}}>
          Registration
        </Button>
      </CardFooter>
    </Card>
  )
}