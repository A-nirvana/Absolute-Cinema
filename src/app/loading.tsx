"use client"

import { Poppins } from "next/font/google";
import Image from "next/image";
import { Label } from "@/components/ui/label";

const inter = Poppins({weight:["400"],subsets:["latin-ext"],style:"normal", display:"swap"})

const Loading: React.FC = () => {
    return (
        <main className="flex justify-center items-center h-screen absolute top-0 z-10 bg-background w-screen">
            <div className={inter.className + "  flex flex-col space-x-1 items-center"}>
                <Image src="/harvest.webp" alt="harvest-icon" width={70} height={70} className="dark:invert animate-pulse"/>
                <Label className="flex text-2xl md:text-5xl my-2 space-x-2">
                    <p className=" animate-bounce repeat-infinite">H</p>
                    <p className=" animate-bounce" style={{animationDelay:"250ms"}}>a</p>
                    <p className=" animate-bounce" style={{animationDelay:"500ms"}}>r</p>
                    <p className=" animate-bounce" style={{animationDelay:"750ms"}}>v</p>
                    <p className=" animate-bounce" style={{animationDelay:"1000ms"}}>e</p>
                    <p className=" animate-bounce" style={{animationDelay:"1250ms"}}>s</p>
                    <p className=" animate-bounce" style={{animationDelay:"1500ms"}}>t</p></Label>
                <p className="text-muted-foreground text-center">`&quot;`Bringing to you the latest and the best movies and shows`&quot;`</p>
            </div>
        </main>
    )
}

export default Loading