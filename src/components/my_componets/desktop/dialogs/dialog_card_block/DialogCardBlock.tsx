'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { cardService } from "@/services/card/card.service"
import { useCardBlockDialogStore } from "@/store/dialog.store"
import { ICard } from "@/types/card.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"


type Props = {
  card: ICard
}

function DialogCardBlock({card}: Props) {

  const {isOpen,setIsOpenState} = useCardBlockDialogStore()
  const queryClient = useQueryClient()

  function onSubmit(){
    cardService.blockCard(
      {cardNumber:card.cardNumber,
      cardStatus: !card.cardStatus})
    setIsOpenState(false)
  }

  const mutation = useMutation({
    mutationKey:['fs'],
    mutationFn: async()=> await cardService.blockCard(
      {cardNumber:card.cardNumber,
       cardStatus: !card.cardStatus}
    ),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['card']})
      setIsOpenState(false)
    }
  })

  return (
    <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You can block and unblock your card when ever you want!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setIsOpenState(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          onClick={()=>mutation.mutateAsync()}
        >
          Block Card
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DialogCardBlock