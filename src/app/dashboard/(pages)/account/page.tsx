import React from 'react'
import style from './page.module.scss'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormAccount } from '@/components/my_componets/desktop/accout_form/FormAccount'

type Props = {}

const AccountPage = (props: Props) => {
  return (
    <div className={style.container}>
      <h1>Account</h1>
      <div className={style.containerForm}>
        <FormAccount/>
      </div>
    </div>
  )
}

export default AccountPage