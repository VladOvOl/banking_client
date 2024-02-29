import { FormAuth } from '@/components/my_componets/desktop/form_auth/FormAuth'
import { NextPage } from 'next'
import style from './page.module.scss'

type Props = {}

const AuthPage:NextPage = (props: Props) => {
  return (
    <div className={style.container}>
      <FormAuth/>
    </div>
  )
}

export default AuthPage