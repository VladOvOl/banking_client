import type { Metadata } from "next";
import style from './layout.module.scss'
import SideBar from "@/components/my_componets/desktop/side_bar/SideBar";
import { Separator } from "@/components/ui/separator";
import NavFooterMenu from "@/components/my_componets/mobile/nav_footer_menu/NavFooterMenu";



export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={style.container}>
      <aside className={style.sideBar}>
        <SideBar/>
      </aside>
      <Separator className={style.separator}  orientation="vertical"/>
      <div className={style.containerMain}>
        {children}
      </div>
      <footer className={style.footer}>
        <NavFooterMenu />
      </footer>
    </section>
  );
}
