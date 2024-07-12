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
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import { Label } from "../ui/label"
import { MovieList } from "@/app/page"
import { Poppins } from "next/font/google"
import Link from "next/link"

const inter = Poppins({ weight: ["600"], subsets: ["latin-ext"], style: "normal", display: "swap" })

interface CarouselDemoProps {
  auto?: boolean;
  num?: number;
  list?: MovieList[]
}

const CarouselDemo: React.FC<CarouselDemoProps> = ({ auto, num, list }) => {
  return (
    <Carousel className={`w-screen ${num ? "md:w-[95%]" : "md:w-[85%]"} h-[150px] md:h-max`}
      opts={{
        slidesToScroll: num ? 1 : 4,
        loop: num ? true : false
      }}
      plugins={auto ? [
        Autoplay({
          delay: 5000,
        }),
      ] : []}
    >
      <CarouselContent className={`${num ? "" : "overflow-x-scroll "} md:overflow-x-visible`} style={{ scrollbarWidth: "none" }}>
        {list && list[0] && list.map((item, index) => (
          <CarouselItem key={index} className={num ? "" : "basis-1/4 md:basis-1/6 lg:basis-1/6"}>
            <div className={`p-1 ${"w-max"}`}>
              <Card className={num ? "w-max -z-10" : "w-[100px] md:w-[220px]"}>
                <CardContent className={`flex flex-col h-max items-center ${num ? "-mx-3" : ""}`}>
                  {num && item && item.backdrop_path ?
                    <div className={"overflow-hidden bg-cover"} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})` }}>
                      <div className="w-screen md:w-[70vw] h-[200px] md:h-[500px] shadow-md shadow-slate-600 dark:shadow-none flex flex-col justify-center items-center backdrop-blur-sm">
                        <div className="h-[70%] overflow-hidden border-2 rounded">
                          <Image src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                          alt={item.original_title} width={225} height={300} className=" h-full w-[100px] md:w-max hover:scale-125 duration-100 hover:opacity-80 " />                       
                        </div>
                        <svg className={"text-xl md:text-5xl md:font-semibold w-full h-[50px] md:h-[120px] select-none" + inter.className}>
                          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className=" fill-slate-400 stroke-black stroke-[0.5px] md:stroke-[2px] select-none">{item.original_title}</text>
                        </svg>
                      </div>
                    </div>
                    :
                    <Link href={"/movie/"+item.id.toString()} className="overflow-hidden bg-black rounded">
                      <Image src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        alt={item.original_title} width={300} height={400}
                        className="border-2 md:w-max dark:border-black rounded shadow-md shadow-slate-600 dark:shadow-slate-600 hover:scale-125 duration-100 hover:opacity-80" />
                    </Link>
                  }
                  {!num && <Label className="text-sm md:font-semibold mt-2">{item.original_title}</Label>}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
        {!list && Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index} className={num ? "" : "basis-1/4 md:basis-1/6 lg:basis-1/6"}>
            <div className="p-1 w-max">
              <Card className="w-[100]px] md:w-[150px]">
                <CardContent className="flex h-[120px] md:h-[220px] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {!auto && <div className="hidden md:flex"><CarouselPrevious />
        <CarouselNext /></div>}
    </Carousel>
  )
}

export default CarouselDemo
