import React from 'react'
import style from './page.module.scss'
import Statistic from '@/components/my_componets/desktop/pages/statistic/Statistic'

type Props = {}

function Statistics({}: Props) {
  return (
    <div className={style.container}>
    <div className={style.containerTop}>
      <h1>Statistics</h1>
    </div>
    <div className={style.containerData}>
      <Statistic/>
    </div>
      
  </div>
  )
}

export default Statistics