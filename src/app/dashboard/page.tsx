import React from 'react'
import style from './page.module.scss'


type Props = {}


const DashboardPage = async (props: Props) => {

  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <p>Dashboard</p>
      </div>
    </div>
  )
}

export default DashboardPage