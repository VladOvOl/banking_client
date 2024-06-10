import TransferContainer from '@/components/my_componets/desktop/containers/transfer_container/TransferContainer'
import React from 'react'
import style from './page.module.scss'

type Props = {}

const TransfersPage = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <h1>TransfersPage</h1>
      </div>
      <div className={style.containerData}>
        <TransferContainer/>
      </div>
    </div>

  )
}

export default TransfersPage