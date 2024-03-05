'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import useDeviceSize from "@/hooks/useDeviceSize"
import { useUserStore } from "@/store/user.store"

export function UserLabelAvatar() {

  const {emailStore} = useUserStore()

  console.log(emailStore)

  const width = useDeviceSize()[0]

  if(width < 900){
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    )
  }else{

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="*" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            {emailStore}
          </p>
        </div>
      </div>
    </div>
  )
  }
}
