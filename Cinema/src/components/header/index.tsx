import { ModeToggle } from "../ui/toggleButton";
import { AlignLeft } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Label } from "../ui/label";
import Link from "next/link";

const inter = Poppins({ weight: ["200"], subsets: ["latin-ext"], style: "normal", display: "swap" })

export default function Header() {
    return (
        <nav className="flex items-center justify-between w-full px-8 h-16 pt-2 ">
            <AlignLeft className="md:hidden" />
            <Label className={inter.className + " text-2xl md:text-3xl font-semibold flex space-x-1 items-center"}>
                <Image src="/harvest.webp" alt="harvest-icon" width={40} height={40} className="hidden md:flex dark:invert" />
                <p>Harvest</p></Label>
            <div className="hidden space-x-10 md:flex z-10 items-center">
                <Link href="/">
                    Home
                </Link>
                <Link href="/search">
                    Search
                </Link>
                <Link href="/book">
                    Book Tickets
                </Link>
                <Link href="/premium">
                    Premium 
                </Link>
                <ModeToggle />
            </div>
            
        </nav>
    )
}