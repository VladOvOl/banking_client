import { ICard } from "./card.types";

export interface IDateStatistic{
    currentCard: ICard | "all",
    currentDate: string
}