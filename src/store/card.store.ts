import { cardService } from "@/services/card/card.service"
import { ICard } from "@/types/card.types"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface ICardStore{
	currentCardStore: ICard,
	arrayCardStore:ICard[],
	reloadCard: boolean,
	id:number,
	setId:(i:number)=>void
	setCurrentCardStore: (card:ICard) => void,
	setArrayCardStore:(card:ICard[]) => void,
	setReloadCard:(b:boolean)=>void,
	getData: (userId:number)=>any
}

export const useCardStore = create<ICardStore>()(devtools((set)=>({
	id:0,
	setId:(i)=>set(()=>(
		{id:i}
	
	)),

	currentCardStore: {
		id: '0',
		cardTitle: '',
		cardUserFullName: '',
		cardBalance:0,
		cardNumber : '',
		cardDateMonth: 0,
		cardDateYear: 0,
		cardCVC: '0' ,
		cardStatus:true,
		created_at:"" 
	},

	arrayCardStore:[],

	reloadCard:false,
	setReloadCard:(b)=>set(()=>(
		{reloadCard:b}
	)),

	setCurrentCardStore:(card)=> set(()=> ({currentCardStore: {
		id: card.id,
		cardTitle: card.cardTitle,
		cardBalance: card.cardBalance,
		cardUserFullName: card.cardUserFullName,
		cardNumber : card.cardNumber,
		cardDateMonth: card.cardDateMonth,
		cardDateYear: card.cardDateYear,
		cardCVC: card.cardCVC,
		cardStatus: card.cardStatus,
		created_at: card.created_at
	}})),

	setArrayCardStore:(cards)=>set(()=>
		({arrayCardStore:cards})
	),

	getData: async(userId)=>{
		const response = await cardService.getAllCards({userId :userId })
		console.log(response)
		set({ arrayCardStore:  response })
		console.log()
		return response
	}

}))) 