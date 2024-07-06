import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface CarouselDemoProps {
  auto? : boolean
}

const CarouselDemo: React.FC<CarouselDemoProps> = ({auto}) => {
  return (
    <Carousel className="w-full h-[300px]"
    plugins={auto?[
      Autoplay({
        delay: 2000,
      }),
    ]:[]}
    >
      <CarouselContent>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index}className="md:basis-1/6 lg:basis-1/6">
            <div className="p-1">
              <Card className="w-[150px]">
                <CardContent className="flex h-[220px] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselDemo
