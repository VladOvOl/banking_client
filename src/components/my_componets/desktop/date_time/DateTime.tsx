import Clock from '@/components/my_ui/clock/Clock'
import DateSpan from '@/components/my_ui/date/Date'
import React from 'react'
import style from './DateTime.module.scss'

type Props = {}

export default function DateTime({}: Props) {
  return (
    <div className={style.containerDateTime}>
    <DateSpan/>
    <Clock/>
  </div>
  )
}