'use client'
import {useState} from "react"
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


 
export function FormLogin() {

  const router = useRouter()
  const { toast } = useToast()
  const {setUserStore,userStore} = useUserStore()
  const {isLoading,setLoadingState} = useLoadingStore()

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[showPassword, setShowPassword] = useState(false)


  let data = {
    email: email,
    password: password
  }
  
  async function loginUser(data:any) {
    
    try {
      setLoadingState(true)
      const response = await authService.loginUser(data)
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
    
    router.replace('/dashboard')

  }

  const clearForm = ():void => {
    setEmail('')
    setPassword('')
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>Enter your account</CardTitle>
        <CardDescription>Enter all string to enter account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" type='email' placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="email" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)}/>

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
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clearForm}>
          Clear form
        </Button>

        <Button disabled={isLoading} className="px-8" onClick={() => {loginUser(data)}}>
            Login
        </Button>
      </CardFooter>
    </Card>
  )
}