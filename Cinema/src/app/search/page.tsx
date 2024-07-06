"use client"

import Navbar from "@/components/navBar"
import { PaginationDemo } from "@/components/pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchMovieDetails } from "@/lib/apis"
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SheetDemo() {
    const [info, setInfo] = useState({} as any)
    const [loading, setLoading] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false)
    const [currentMovie, setCurrentMovie] = useState({} as any)
    const [details, setDetails] = useState({} as any)
    useEffect(() => {
        setDetails({})
        if(currentMovie.Title)fetchMovieDetails(currentMovie.imdbID).then((data) => {
            setDetails(data)
        })
    }, [currentMovie.imdbID])
    return (
        <main className="h-max w-screen" >
            <section className="flex justify-between w-full h-full">
                <Navbar setInfo={setInfo} setLoading={setLoading} />
                <section className="flex w-full justify-center mt-20 md:mt-32 flex-wrap h-max min-h-[80vh]">
                    {/* <p>Search results for '{currentMovie.Title}'</p> */}
                    {!info.Response && <div className="h-[80vh] flex justify-center items-center">Search for something good</div>}
                        {info.Response=="True" && !loading && info.Search.map((item: any) => (
                        <div key={item.imdbID} className="w-[100px] md:w-44 mb-4 ml-2 mr-2 md:mb-12 md:mr-6 md:ml-6 cursor-pointer" onClick={() => {
                            setCurrentMovie(item)
                            setSheetOpen(true)
                        }}>
                            {(item.Poster != "N/A") ?
                                <Image src={item.Poster} alt={item.Title} width={300} height={400} className="border-2 w-[100px] md:w-max dark:border-black rounded shadow-md shadow-slate-600 dark:shadow-slate-600" /> :
                                <Skeleton className="h-[210px] w-[150px] border-2 rounded shadow-md shadow-slate-600 dark:shadow-slate-800" />}
                            <Label className="text-sm md:text-lg md:font-semibold">{item.Title}</Label>
                        </div>
                    ))}
                    {info.Response=="False" && <div className="h-[80vh] flex justify-center items-center">No Movies or Shows found</div>}
                    {loading && <Loader2 className="animate-spin" size={70} />}
                </section>
            </section>
            {info.Response=="True" && <PaginationDemo/>}
            <Sheet open={sheetOpen}>
                <SheetContent className="overflow-y-scroll">
                    <SheetClose asChild className="fixed top-2 right-[350px] hidden md:flex" onClick={() => {
                        setSheetOpen(false)
                    }}>
                        <Button className="rounded-full" variant='outline' size='icon'><ChevronRight /></Button>
                    </SheetClose>
                    <SheetHeader className="flex flex-col items-center">
                    <SheetClose asChild className="fixed top-2 left-2 flex md:hidden" onClick={() => {
                        setSheetOpen(false)
                    }}>
                        <Button className="rounded-full" variant='outline'><ArrowRight /></Button>
                    </SheetClose>
                        <SheetTitle className="text-center">{currentMovie.Title}   {`(${currentMovie.Type})`}</SheetTitle>
                        {(currentMovie.Poster) ?
                            <Image src={currentMovie.Poster} alt={currentMovie.Title} width={225} height={300} className="border-4 dark:border-slate-700 rounded shadow-md shadow-slate-600 dark:shadow-none" /> :
                            <Skeleton className="h-[210px] w-[150px] border-2 rounded shadow-md shadow-slate-600 dark:shadow-slate-800" />}
                        <SheetDescription className="text-center">
                            {details.released}
                            {currentMovie.synopsis && <p className="text-start">{currentMovie.synopsis}</p>}
                        </SheetDescription>
                    </SheetHeader>
                     <Separator className="my-2" />
                     {!details.released && <div className="h-[50vh] w-full flex justify-center items-center">
                        <div className="h-max w-max"><Loader2 className=" animate-spin" size={70}/></div></div>}
                    {details.released && <div>
                        <div className="flex text-sm items-center space-x-4 h-10 mb-4 justify-center mt-4">
                            <Link href={`https://imdb.com/title/${currentMovie.imdbid}`} className=""><p>{details.imdbrating}/10</p><p>IMDb</p></Link>
                            <Separator orientation="vertical"/>
                            <p className="">Duration <p>{details.runtime}</p></p>
                        </div>
                        <Label htmlFor="genre" className="underline">Genres</Label>
                        <div className="flex space-x-3 mt-1 mb-4" id="genre">
                            {details.genre && details.genre.map((genre: string) => (
                                <Badge key={genre} variant="secondary">{genre}</Badge>
                            ))}
                        </div>
                        <Label htmlFor="language" className="underline">Languages</Label>
                        <div className="flex space-x-3 mt-1 mb-4" id="language">
                            {details.language && details.language.map((language: string) => (
                                <Badge key={language} variant="outline">{language}</Badge>
                            ))}
                        </div>
                        <Label className="underline">Stream Now on</Label>
                        <div className="flex flex-wrap mt-1">
                            {details.streamingAvailability && details.streamingAvailability.country && details.streamingAvailability.country.US &&
                                details.streamingAvailability.country.US.map((streamingService: any) => (
                                    <div key={streamingService.service} className="flex items-center space-x-2">
                                        <Button variant="link" size="sm">{streamingService.platform}</Button>
                                    </div>
                                ))}
                        </div>
                    </div>}
                </SheetContent> 
            </Sheet>
        </main>
    )
}
