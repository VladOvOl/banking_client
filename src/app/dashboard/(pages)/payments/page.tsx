import React from 'react'
import style from './page.module.scss'
import PaymentContainer from '@/components/my_componets/desktop/payment/payment_container/PaymentContainer'

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <h1>Payments</h1>
      </div>
      <div className={style.containerData}>
        <PaymentContainer/>
      </div>
    </div>
  )
}

export default SettingsPage