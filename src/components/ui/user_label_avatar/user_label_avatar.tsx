'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useUserStore } from "@/store/user.store"
import style from './user_label_avatar.module.scss'
import { userService } from "@/services/user/user.service"


export const UserLabelAvatar =() =>  {

  const {userStore} = useUserStore()

  const name = userService.getFirstLetter(userStore.userFullName)
  
    return (
      <>
        <div className={style.containerCollapsed}>
          <div className="space-y-8">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{name.toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className={style.containerNonCollapsed}>
          <div className="space-y-8">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="*" alt="Avatar" />
                <AvatarFallback>{name.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{userStore.userFullName}</p>
                <p className="text-sm text-muted-foreground">
                  {userStore.userEmail}
                </p>
              </div>
            </div>
          </div>
        </div>     
      </>
    )
}

