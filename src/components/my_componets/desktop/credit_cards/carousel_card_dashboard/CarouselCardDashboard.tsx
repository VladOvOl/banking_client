import BankingCard from "@/components/my_ui/banking_card/BankingCard"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ICard } from "@/types/card.types"

interface IProps{
    array:ICard[]
}

 
function CarouselCardDashboard({array}:IProps) {
  return (
    <Carousel className="w-full h-full">
    <CarouselContent className="-ml-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2 bg-slate-400">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
  )
}

export default CarouselCardDashboard