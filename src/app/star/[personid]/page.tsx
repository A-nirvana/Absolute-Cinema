"use client"

import { useEffect, useState } from "react";
import { actorExample } from "@/lib/example";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ActorPage() {
    const [actor, setActor] = useState(actorExample);
    const [poster, setPoster] = useState(actorExample.poster[0]);
    const [best, setBest] = useState<any[]>([])
    useEffect(() => {

    }, [actor]);
    return (
        <main className="flex justify-evenly mx-20 w-[80vw] min-h-[80vh] h-[90vh] mt-8">
            <section>
                {actor.poster.length >= 1 && <Image src={poster} alt={actor.name} width={200} height={200} />}
                <p className="mt-4 font-semibold">Proffessions: </p>
                {actor.profession && actor.profession.map((proff: string) => (
                    <Badge key={proff} variant="secondary" className="mx-1 mt-2">{proff}</Badge>
                ))}
            </section>
            <Separator className=" h-[90%] min-h-[50vh] self-center" orientation="vertical" />
            <section className="w-[50%]">
                <p className="text-2xl font-semibold">
                    {actor.name}
                </p>
                <p className="text-xl font-thin">{`(${actor.birthYear}`}-{`${actor.deathYear == "\\N" ? "present" : actor.deathYear})`}</p>
                <p className="text-muted-foreground text-sm ">Born on: {actor.born}</p>
                <p className="text-muted-foreground text-sm mb-4">Birth Name: {actor.birthName}</p>

                <p>Is best known for</p>
                <div className="mb-8 mt-2">{actor.knownForTitles.map((title, index) => (
                    <Button variant="outline" className="mr-5" key={index}><Link href={"/movie/" + title}>{index + 1}</Link></Button>
                ))}</div>


                <ScrollArea className="h-[50vh]"><p>{actor.bio}</p></ScrollArea>
            </section>

        </main>
    )
}