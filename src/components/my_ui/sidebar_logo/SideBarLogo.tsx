import style from './SideBarLogo.module.scss'
import Image from 'next/image'


type Props = {}

const SideBarLogo = (props: Props) => {

 

  return (
    <div className={style.container}>
        <div className={style.containerImage}>
          <Image 
            src= '/logo.png'
            alt="Logo"
            fill
          />
        </div>
        <p>NeoBank</p>
      </div>
  )
}

export default SideBarLogo