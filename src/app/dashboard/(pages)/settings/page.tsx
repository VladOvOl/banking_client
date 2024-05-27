import React from 'react'
import style from './page.module.scss'

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <h1>Settings</h1>
      </div>
      <div className={style.containerData}>

      </div>
    </div>
  )
}

export default SettingsPage