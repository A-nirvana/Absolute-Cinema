"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchAdditionalDetails, fetchMovieDetails, fetchOMDbDetails } from "@/lib/apis"
import { titleExample, additionalExample } from "@/lib/example"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import Trailer from "@/components/ui/trailer"
import Link from "next/link"
import { ratingIcons, convertUrl, convertDuration, watchIcons } from "./utils"

interface Rating {
    Source: string;
    Value: string;
}

export default function SheetDemo() {
    const [currentMovie, setCurrentMovie] = useState({} as any)
    const [details, setDetails] = useState({} as any)
    const [omDetails, setOmDetails] = useState({} as any);
    const [ratings, setRatings] = useState<Rating[]>([])
    const [reviews, setReviews] = useState([""])
    const [videoId, setVideoId] = useState("")
    const params = useParams()
    const movieId = Array.isArray(params.imdbid) ? params.imdbid[0] : params.imdbid;
    // useEffect(() => {
    //         console.log(movieId)
    //         fetchMovieDetails(movieId).then((data) => {
    //             setCurrentMovie(data);
    //         });
    //         fetchAdditionalDetails(movieId).then((data) => {
    //             setDetails(data);
    //         });
    // }, [movieId])
    useEffect(() => {
        fetchOMDbDetails(movieId).then((data) => {
            setOmDetails(data)
            setRatings(data.Ratings);
        })
        setCurrentMovie(titleExample);
        setDetails(additionalExample);
        setReviews(additionalExample.reviews);
        setVideoId(convertUrl(additionalExample.trailerUrl[0]))
    }, [movieId])
    return (
        <main className="h-max" >
            <section className="flex justify-center w-full h-[92%] pt-8">
                <div className="w-[90%] md:w-[60%]">
                    <div className="text-pink-500"><Heart className="absolute fill-pink-500 hover:opacity-90 flex left-4 md:hidden" size={36} /></div>
                    <p className="text-3xl font-semibold md:text-start text-center">{currentMovie.title}</p>
                    <Label className="text-xs font-semibold mb-4 md:text-start text-center">{omDetails.Type} . {currentMovie.released} . {omDetails.Rated}-rated</Label>
                    <div className="flex md:border-2 md:dark:border-0 dark:border-slate-700 shadow-md shadow-slate-600 dark:shadow-none md:h-max h-30 rounded w-screen md:w-max absolute md:static left-0">
                        <div className="text-pink-500"><Heart className="absolute fill-pink-500 hover:opacity-90 hidden md:flex" size={36} /></div>
                        {(currentMovie.imageurl && currentMovie.imageurl[0]) ?
                            <Image src={currentMovie.imageurl[0]} alt={currentMovie.title} width={270} height={360} className="rounded-l border-r-4 border-transparent hidden md:block" /> :
                            <Skeleton className="h-[210px] w-[150px] border-2 rounded shadow-md shadow-slate-600 dark:shadow-slate-800 hidden md:block" />}
                        {videoId && <Trailer videoId={videoId} />}
                    </div>
                    <div className="mt-[250px] md:mt-4">
                        <div className="flex space-x-3 mt-1 mb-4" id="genre">
                            {currentMovie.genre && currentMovie.genre.map((genre: string) => (
                                <Badge key={genre} variant="secondary">{genre}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <p className="text-sm text-muted-foreground">{currentMovie.synopsis}</p>
                    </div>
                    <div className="flex text-sm items-center space-x-4 h-10 mb-4 justify-center mt-4">
                        <Link href={`https://imdb.com/title/${currentMovie.imdbid}`} className="flex items-center space-x-2 text-amber-500">
                            <Star className="fill-amber-500 outline-amber-500" />
                            <div className="text-black dark:text-white"><p>{currentMovie.imdbrating}/10</p>
                                <p>IMDb</p></div>
                            <p>{`(`}{omDetails.imdbVotes} votes</p>{`)`}
                        </Link>
                        <Separator orientation="vertical" />
                        <div className="">Duration <p>{convertDuration(currentMovie.runtime)}</p></div>
                    </div>
                    <Separator className="my-2" />
                    <Label className="text-accent-foreground text-2xl font-semibold">Cast & Crew</Label>
                    <Label className="text-muted-foreground font-semibold">Director: <Link className="text-accent-foreground font-normal" href={`/stars/${
                        additionalExample.people.length>0?(additionalExample.people.filter((person)=>person.category=="director")[0].peopleid):"unknown"
                    }`}>{omDetails.Director}</Link></Label>
                    <Label className="text-muted-foreground font-semibold flex space-x-2"><p>Writers:</p><p className="text-accent-foreground font-normal">{omDetails.Writer}</p></Label>
                    <Label className="text-muted-foreground font-semibold flex flex-wrap space-x-2"><p>Actors:</p> {
                        additionalExample.people.length>0?(additionalExample.people.map((person,index)=>(
                            (person.category=="actor" || person.category=="actress") && person.characters &&
                             <Link key={index} href={`/stars/${person.peopleid}`} className="text-accent-foreground font-normal">{person.characters[0]},</Link>
                        ))):(<p>No known actor</p>)}</Label>
                        <Separator className="my-2 w-[50%]" />
                    <div className="flex space-x-3">
                        <Label className="text-muted-foreground font-semibold">Awards: </Label>
                        <p className="text-sm font-semibold">{omDetails.Awards}</p>
                    </div>
                    <div className="h-max md:h-[30rem] block md:flex justify-between">
                        <div className="w-[90%] md:w-[30%]">
                            <Label className="text-muted-foreground font-semibold mt-2 mb-2">Ratings</Label>
                            <div className=" bg-muted py-4 px-4 rounded-md w-[70%] flex flex-col items-center ">
                                {ratings.length > 0 ? (
                                    ratings.map((rating, index) => (
                                        <div key={index} className="flex mb-2 items-center space-x-4">
                                            <Image src={ratingIcons[rating.Source]} alt={rating.Source} width={30} height={30} />:<p>{rating.Value}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No ratings available</p>
                                )}
                            </div>
                            <Label className="text-muted-foreground font-semibold mt-4">Stream Now on</Label>
                            <div className="flex flex-wrap mt-">
                                {currentMovie.streamingAvailability && currentMovie.streamingAvailability.country && currentMovie.streamingAvailability.country.US &&
                                    currentMovie.streamingAvailability.country.US.map((streamingService: any) => (
                                        <div key={streamingService.service} className="flex items-center space-x-2">
                                            {watchIcons[streamingService.platform] ?
                                                <Button variant="secondary" size="sm">
                                                    <Image src={watchIcons[streamingService.platform]} alt={streamingService.platform} width={60} height={30} className="" />
                                                </Button>
                                                : <Button variant="secondary" size="sm">{streamingService.platform}</Button>
                                            }
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-[80%] self-center mr-4 hidden md:block" />
                        <div className="max-w-[40rem] md:w-[50%] w-full">
                            {details.reviews && details.reviews[0] && <Label className="text-muted-foreground font-semibold mt-2">Reviews</Label>}
                            <div className="flex flex-wrap mt-2 w-[90%] md:w-[120%]">
                                {reviews.slice(0, 4).map((review: string) => (
                                    <li>
                                        <ScrollArea className="h-20 w-full text-xs p-0.5 px-2 md:px-3 md:h-48 md:w-48 border-2 rounded-md mr-8 mb-4 md:mb-8 md:text-sm md:p-3 text-muted-foreground bg-muted">
                                            <p>{review}</p>
                                        </ScrollArea>
                                    </li>


                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </main>
    )
}
