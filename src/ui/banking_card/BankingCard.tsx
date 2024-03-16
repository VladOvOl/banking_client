import React from 'react'
import style from './BankingCard.module.scss'
import Image from 'next/image'

type Props = {}

const BankingCard = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.containerTop}>
        <p>Untiteled</p>
        <p>NFC</p>
      </div>

      <div className={style.containerBottom}>
        <div className={style.containerInfo}>
          <div className={style.containerInfoTop}>
            <div className={style.containerName}>
              <p>Vlad Ovsianik</p>
            </div>
            <div className={style.containerData}>
              <p>06/22</p>
            </div>
          </div>
          <div className={style.containerCardNumber}>
            <p>1223 **** ****  1234</p>
          </div>
        </div>
        <div className={style.containerType}>
        </div> 
          <Image
              src='/tr.png'
              width={50}
              height={50}
              alt='gg'/>
      </div>
    </div>
  )
}

export default BankingCard