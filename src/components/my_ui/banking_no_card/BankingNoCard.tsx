import React from 'react'
import style from './BankingNoCard.module.scss'

type Props = {}

function BankingNoCard() {
  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <p>1</p>
        <p>NFC</p>
      </div>

      <div className={style.containerBottom}>
        <div className={style.containerInfo}>
          <div className={style.containerInfoTop}>
            <div className={style.containerName}>
              <p>2</p>
            </div>
            <div className={style.containerData}>
              <p>2</p>
            </div>
          </div>
          <div className={style.containerCardNumber}>
            <p>2</p>
          </div>
        </div>
        <div className={style.containerType}>
        </div> 
          
      </div>
    </div>
  )
}

export default BankingNoCard