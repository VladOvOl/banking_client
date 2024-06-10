'use client'
import {ChangeEvent, useCallback, useEffect, useState} from "react"
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
import { useToast } from "@/components/ui/use-toast"
import { authService } from "@/services/auth/auth.service"
import { useUserStore } from "@/store/user.store"
import { useLoadingStore } from "@/store/loading.store"
import { ILoginRequest } from "@/types/auth.types"



export function FormLogin() {

  const router = useRouter()
  const { toast } = useToast()
  const {setUserStore,userStore} = useUserStore()
  const {isLoading,setLoadingState} = useLoadingStore()

  const[showPassword, setShowPassword] = useState(false)
  const[user, setUser] = useState({
    userEmail:'',
    userPassword:''
  })

  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) =>{
    setUser(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
  },[])

  
  async function loginUser(data:ILoginRequest) {
    
    try {
      setLoadingState(true)
      const response = await authService.loginUser(data)
      if(response.status==200){
        setUserStore(response.data.user)
        console.log(response.data.user)
      }
      
    } catch (error:any) {

      toast({
        variant: "destructive",
        title: "Something went wrong with login....",
        description: `${error.response.data.message}`,
      })

    }finally{
      setLoadingState(false)
      router.replace('/dashboard')
      router.refresh()
    }
    
  }

  const clearForm = ():void => {
    //setEmail('')
    //setPassword('')
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>
          Enter your account
        </CardTitle>
        <CardDescription>
          Enter all string to enter account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">
                Email
              </Label>
              <Input 
                id="name" 
                name="userEmail"
                type='email' 
                placeholder="Enter your email" 
                value={user.userEmail} 
                onChange={e=>handleChange(e)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">
                Password
              </Label>
              <Input 
              id="email" 
              name="userPassword"
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter your password" 
              value={user.userPassword} 
              onChange={e=>handleChange(e)}/>

              <div className="items-top flex space-x-2">
                <Checkbox 
                  id="terms1" 
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
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={clearForm}
        >
          Clear form
        </Button>

        <Button 
          disabled={isLoading} 
          className="px-8" 
          onClick={() => {loginUser(user)}}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}