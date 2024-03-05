'use client'
import * as React from "react"
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
import { useUserStore } from "@/store/user.store"


 
export function FormLogin() {

  const router = useRouter()
  const[email, setEmail]=  React.useState('')
  const[password, setPassword]=React.useState('')
  const { toast } = useToast()

  const {emailStore,setEmailStore} = useUserStore()

  let data = {
    email: email,
    password: password
  }
  
  async function loginUser(data:any) {
    
    try {

      await authService.loginUser(data)

    } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Something went wrong with login....",
        description: `${error.response.data.message[0]}`,
      })
    }
    
    setEmailStore(email)
    router.replace('/dashboard')

  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type='email' placeholder="Name of your project" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Input id="email" type='password' placeholder="Name of your project" value={password} onChange={e=>setPassword(e.target.value)}/>

              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                        You agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={() => {
          loginUser(data)
        }}>Deploy</Button>
      </CardFooter>
    </Card>
  )
}