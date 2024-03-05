import { useUserStore } from '@/store/user.store'
import style from './SideBarLogo.module.scss'
import Image from 'next/image'

type Props = {}

const SideBarLogo = (props: Props) => {

 

  return (
    <div className={style.container}>

        <div className={style.containerImage}>
            <Image 
            src= {require("../../../public/logo.png")}
            alt="Logo"
            fill
            priority={true}
            />
        </div>

        <p>NeoBank</p>
      </div>
  )
}

export default SideBarLogo