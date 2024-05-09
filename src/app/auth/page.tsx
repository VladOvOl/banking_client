import { FormLogin } from '@/components/my_componets/desktop/forms/form_login/FormLogin'
import { NextPage } from 'next'
import style from './page.module.scss'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FormRegistration } from '@/components/my_componets/desktop/forms/form_registration/FormRegistration'

type Props = {}

const AuthPage:NextPage = (props: Props) => {
  return (
    <div className={style.container}>
      <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="password">Registration</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <FormLogin/>
      </TabsContent>
      <TabsContent value="password">
        <FormRegistration />
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default AuthPage