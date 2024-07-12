"use client"

import Navbar from "@/components/navBar"
import PaginationDemo from "@/components/pagination"
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
import { fetchOMDbDetails } from "@/lib/apis"
import { ArrowRight, ChevronRight, Heart, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useUser } from "../UserProvider"
import { addFavorite, getUser } from "@/lib/firebase/fireStore"
import { DocumentData } from "firebase/firestore"

function convertStringListToArray(genres: string): string[] {
    return genres.split(',').map(genre => genre.trim());
}

function convertDuration(durationStr:string) {
    const minutes = parseInt(durationStr, 10);
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours === 0) {
      return `${remainingMinutes} min`;
    }
  
    return `${hours} hr ${remainingMinutes} min`;
  }
  
export default function SheetDemo() {
    const [info, setInfo] = useState({} as any)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [currentMovie, setCurrentMovie] = useState({} as any)
    const [details, setDetails] = useState({} as any)
    const [count, setCount] = useState(0)
    const user = useUser()
    const [userDetails, setUserDetails] = useState<DocumentData>()
    useEffect(() => {
        if (user) {
            getUser(user).then((data) => {
                setUserDetails(data)
            })
        }
    }, [user])
    useEffect(() => {
        setDetails({})
        if (currentMovie.Title) fetchOMDbDetails(currentMovie.imdbID).then((data) => {
            setDetails(data)
        })
    }, [currentMovie.imdbID])
    useEffect(() => {
        setTotalPages(Math.ceil(info.totalResults / 10))
    }, [info])
    return (
        <main className="h-max w-[99vw]" >
            <section className="flex justify-between w-full h-full">
                <Navbar setInfo={setInfo} setLoading={setCount} page={page} setPage={setPage} />
                <section className="flex w-full justify-center mt-20 md:mt-32 flex-wrap h-max min-h-[80vh]">
                    {/* <p>Search results for '{currentMovie.Title}'</p> */}
                    {!info.Response && <div className="h-[80vh] flex justify-center items-center">
                        {count < 1 ? "Search for something good" : <Loader2 className="animate-spin" size={70} />}</div>}
                    {info.Response == "True" && info.Search.map((item: any) => (
                        <div key={item.imdbID} className="w-[100px] md:w-44 mb-4 ml-2 mr-2 md:mb-12 md:mr-6 md:ml-6 cursor-pointer overflow-hidden" >
                            <div className="h-max overflow-hidden w-max bg-black rounded" onClick={() => {
                                setCurrentMovie(item)
                                setSheetOpen(true)
                            }}>
                                <Image src={item.Poster != "N/A" ? item.Poster : "/srch-bg.jpg"} alt={item.Title} width={150} height={220} className=" w-[100px] md:w-[150px] md:h-[215px] dark:border-black shadow-md shadow-slate-600 dark:shadow-slate-600 hover:scale-125 duration-100 hover:opacity-75" />
                            </div>
                            <Label className="text-sm md:text-lg md:font-semibold flex mt-2">
                                {userDetails?.favorites.some((obj: any) => obj.imdbid === item.imdbID) ?
                                    <Heart className="fill-pink-500 hover:opacity-90 flex left-4 text-pink-500 cursor-pointer h-[24px]" size={24}
                                    /> :
                                    <Heart className="fill-white hover:opacity-90 flex left-4 cursor-pointer" size={24}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("Already in favorites")
                                            addFavorite(user, item.imdbID, item.Poster, item.Title)
                                            const element = e.currentTarget;
                                            if (element.classList.contains('fill-white')) {
                                              element.classList.remove('fill-white');
                                              element.classList.add('fill-pink-500', 'text-pink-500');
                                              addFavorite(user, item.imdbID, item.Poster, item.Title);
                                            } else {
                                              console.log("Already in favorites");
                                            }
                                        }}
                                    />}
                                <p className="w-4/5">{item.Title}</p></Label>
                        </div>
                    ))}
                    {info.Response == "False" && <div className="h-[80vh] flex justify-center items-center">No Movies or Shows found</div>}
                </section>
            </section>
            {info.Response == "True" && <PaginationDemo page={page} totalPages={totalPages} setPage={setPage} />}
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
                    {!details.Released && <div className="h-[50vh] w-full flex justify-center items-center">
                        <div className="h-max w-max"><Loader2 className=" animate-spin" size={70} /></div></div>}
                    {details.Released && <div className="flex flex-col">
                        <div className="flex text-sm items-center space-x-4 h-10 mb-4 justify-center mt-4">
                            <Link href={`https://imdb.com/title/${currentMovie.imdbID}`} className=""><p>{details.imdbRating}/10</p><p>IMDb</p></Link>
                            <Separator orientation="vertical" />
                            <p className="">Duration <p>{convertDuration(details.Runtime)}</p></p>
                        </div>
                        <Label htmlFor="genre" className="underline">Genres</Label>
                        <div className="flex space-x-3 mt-1 mb-4" id="genre">
                            {details.Genre && convertStringListToArray(details.Genre).map((genre: string) => (
                                <Badge key={genre} variant="secondary">{genre}</Badge>
                            ))}
                        </div>
                        <Label htmlFor="language" className="underline">Languages</Label>
                        <div className="flex space-x-3 mt-1 mb-4" id="language">
                            {details.Language && convertStringListToArray(details.Language).map((language: string) => (
                                <Badge key={language} variant="outline">{language}</Badge>
                            ))}
                        </div>
                    <Button className="self-center mt-4"><Link href={`movie/${currentMovie.imdbID}` }>Get the Details</Link></Button>      
                    </div>}
                </SheetContent>
            </Sheet>
        </main>
    )
}
