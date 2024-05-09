import React from 'react'
import style from './page.module.scss'
import { EnumTokens } from '@/services/auth/auth_token.service'
import Cookies from 'js-cookie'
import { Hash } from 'crypto'


type Props = {}


const DashboardPage = async (props: Props) => {
    
  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <h1>Dashboard</h1>
      </div>
      <div className={style.containerData}>

      </div>
    </div>
  )
}

export default DashboardPage