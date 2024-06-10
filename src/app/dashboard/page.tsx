import React from 'react'
import style from './page.module.scss'
import Container from '@/components/my_componets/desktop/containers/dashboard_container/Container'
import Dashboard from '@/components/my_componets/desktop/pages/dashboard/Dashboard'
import DateTime from '@/components/my_componets/desktop/date_time/DateTime'



type Props = {}


const DashboardPage = async (props: Props) => {
  

  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <h1>Dashboard</h1>
        <DateTime/>
      </div>
      <div className={style.containerData}>
        <Dashboard/>
      </div>
    </div>
  )
}

export default DashboardPage