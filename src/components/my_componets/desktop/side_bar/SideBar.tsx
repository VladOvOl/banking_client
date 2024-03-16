import { Separator } from "@/components/ui/separator";
import style from './SideBar.module.scss'
import NavSettings from "@/ui/nav_settings/NavSettings";
import SideBarLogo from "@/ui/sidebar_logo/SideBarLogo";
import NavSideBarMenu from "../nav_side_bar_menu/NavSideBarMenu";
import { UserLabelAvatar } from "@/components/ui/user_label_avatar/user_label_avatar";



type Props = {}

const SideBar = (props: Props) => {
  return (
    <div className={style.container}>

      <SideBarLogo/>

      <div className={style.containerMain}>
        <NavSideBarMenu/> 
      </div>

      <NavSettings/>

      <Separator className="my-3"/>

      <UserLabelAvatar/>
      
    </div>
      
  )

  
};

export default SideBar;