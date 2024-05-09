import React from 'react'
import style from './page.module.scss'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormAccount } from '@/components/my_componets/desktop/forms/form_accout/FormAccount'

type Props = {}

const AccountPage = (props: Props) => {

  return (
  <div className={style.container}>
    <div className={style.containerTop}>
      <h1>Account</h1>
    </div>
    <div className={style.containerData}>
      <div className={style.containerScroll}>
        <FormAccount/>
      </div> 
    </div>
  </div>   
  )
}

export default AccountPage