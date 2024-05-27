'use client'
import React from 'react'
import style from './StatisticContainer.module.scss'
import StatisticCircleChart from '../../charts/statistic_circle_chart/StatisticCircleChart'

type Props = {}

function StatisticContainer({}: Props) {

  return (
    <div className={style.container}>
        <StatisticCircleChart/>
        <StatisticCircleChart/>
        <StatisticCircleChart/>
        <StatisticCircleChart/>
    </div>
  )
}

export default StatisticContainer