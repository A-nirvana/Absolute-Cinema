"use client"

import { useEffect, useState } from "react";
import { useUser } from "../UserProvider";
import { getUser } from "@/lib/firebase/fireStore";
import { DocumentData } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

const Me: React.FC = () => {
    const user = useUser()
    const [userDetails, setUserDetails] = useState<DocumentData>()
    useEffect(() => {
        if (user) {
            getUser(user).then((data) => {
                setUserDetails(data)
            })
        }
    }, [user])
    return (
        <main className="flex flex-col justify-center items-center md:items-start md:flex-row md:h-[95vh] mt-4 md:mx-20 md:justify-between">
            <div className="text-center w-max flex flex-col items-center">
                <p className="text-2xl font-semibold text-muted-foreground">Account Details</p>
                <Avatar className="h-40 w-40 border shadow-[0.5rem_1rem_1rem_#00000070] bg-white mt-8" onClick={() => {
                    toast("hello")
                }}>
                    <AvatarImage src={userDetails?.avatar} />
                    <AvatarFallback>{userDetails?.username[0]}</AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium mt-2">{userDetails?.username}</p>
                <p className="text-md font-medium text-muted-foreground">{userDetails?.email}</p>
                <p className="text-md font-medium text-muted-foreground">Plan: {userDetails?.premium ? "Spotlight" : "Freeview"}</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <Button variant="default">Upgrade Plan</Button>
                    <Button variant="destructive" className="md:absolute bottom-4">Logout</Button>
                </div>

            </div>
            <Separator orientation="vertical" className="pl-0.5 h-4/5 self-center" />
            <div className="mt-12 md:w-[70%] md:min-h-[80vh]">
                <p className="text-2xl font-semibold text-muted-foreground">Favorites</p>
                <div className="flex flex-wrap">
                    {userDetails?.favorites?.map((favorite: any) => (
                        <div key={favorite.imdbid} className="flex flex-col items-center justify-between border-b border-muted-foreground p-4">
                            <div>
                                <Link href={`/movie/${favorite.imdbid}`}><Image src={favorite.poster} alt={favorite.name} width={150} height={225} className="w-16 h-24 md:w-[150px] md:h-[225px]" />
                                </Link>
                                <p>{favorite.name}</p>
                            </div>
                            <button className="text-red-500">Remove</button>
                        </div>
                    ))}
                </div>
                {userDetails?.favorites[0] ? <></> : <div className="h-[70vh] flex flex-col justify-center items-center">
                    <p className="text-4xl text-muted font-semibold text-center">Add some Favorites from Movies and Stars</p>
                    <Button variant="outline" className="mt-4"><Link href="/search">Explore</Link></Button>
                </div>}
            </div>
        </main>
    )
}

export default Me;