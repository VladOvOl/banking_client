import React from 'react'
import style from './page.module.scss'
import StatisticContainer from '@/components/my_componets/desktop/containers/statistic_container/StatisticContainer'

type Props = {}

function Statistics({}: Props) {
  return (
    <div className={style.container}>
    <div className={style.containerTop}>
      <h1>Statistics</h1>
    </div>
    <div className={style.containerData}>
      <StatisticContainer/>
    </div>
      
  </div>
  )
}

export default Statistics