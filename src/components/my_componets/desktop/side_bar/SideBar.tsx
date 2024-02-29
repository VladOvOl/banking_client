import NavSideBarMenu from "../nav_side_bar_menu/NavSideBarMenu";
import style from './SideBar.module.scss'


type Props = {}

const SideBar = (props: Props) => {
  return (
    <div className={style.container}>
      <NavSideBarMenu/> 
    </div>
      
  )

  
};

export default SideBar;