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
import { axiosWithOutAuth } from "@/api/interceptors"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import style from './FormAuth.module.scss'

 
export function FormAuth() {

  const router = useRouter()
  const[email, setEmail]=  React.useState('')
  const[password, setPassword]=React.useState('')
  const { toast } = useToast()
  let data = {
    email: email,
    password: password
  }

  function show(message:string){
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }

  
  async function LoginUser(data:any) {

    try {
      let result = await axiosWithOutAuth.post('auth/loginUser',data)

      console.log(result.data)
      
    } catch (error:any) {
      show(error.response.data.message[0])
      console.log(error.response.data.message[0])
    }
    
    router.replace('/dashboard')

  }

  return (
    <Card className={style.container}>
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
          LoginUser(data)
        }}>Deploy</Button>
      </CardFooter>
    </Card>
  )
}