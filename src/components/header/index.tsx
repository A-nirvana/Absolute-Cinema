"use client"

import { ModeToggle } from "../ui/toggleButton";
import { AlignLeft } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/app/UserProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "@/lib/firebase/auth";


const inter = Poppins({ weight: ["200"], subsets: ["latin-ext"], style: "normal", display: "swap" })

export default function Header() {
    const user = useUser();
    return (
        <nav className="flex items-center justify-between w-full px-8 h-16 pt-2">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="px-0"><AlignLeft /></Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader className="flex justify-center items-center flex-row">
                            <Image src="/harvest.webp" alt="harvest-icon" width={40} height={40} className="dark:invert" />
                            <SheetTitle className={inter.className + " text-2xl ml-2"}>
                                Harvest</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-6 mt-6">
                            <Link href="/" className="flex justify-center">
                                <SheetClose>
                                    Home
                                </SheetClose>
                            </Link>
                            <Link href="/search" className="flex justify-center">
                                <SheetClose>
                                    Search
                                </SheetClose>
                            </Link>
                            <Link href="/book" className="flex justify-center">
                                <SheetClose>
                                    Tickets
                                </SheetClose>
                            </Link>
                            <Link href="/premium" className="flex justify-center">
                                <SheetClose>
                                    Pricing
                                </SheetClose>
                            </Link>
                            {user ? <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className="absolute bottom-4">
                                        <AvatarImage src={user?.photoURL || ""} />
                                        <AvatarFallback>{user.displayName}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                            </DropdownMenu> :
                                <div className="flex flex-col space-y-4 items-center">
                                    <Button variant="default">
                                        <Link href="/auth/register" className="flex justify-center">
                                            <SheetClose>
                                                Sign Up
                                            </SheetClose>
                                        </Link></Button>
                                    <Button variant="default"><Link href="/auth/login" className="flex justify-center">
                                        <SheetClose>
                                            Sign In
                                        </SheetClose>
                                    </Link></Button>
                                </div>
                            }
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <Label className={inter.className + " text-2xl md:text-3xl font-semibold flex space-x-1 items-center"}>
                <Image src="/harvest.webp" alt="harvest-icon" width={40} height={40} className="hidden md:flex dark:invert" />
                <p>Harvest</p></Label>
            <div className="hidden space-x-10 md:flex z-10 items-center -mr-2">
                <Link href="/">
                    Home
                </Link>
                <Link href="/search">
                    Search
                </Link>
                <Link href="/book">
                    Tickets
                </Link>
                <Link href="/premium">
                    Pricing
                </Link>
                <ModeToggle />
                {
                    user ? <DropdownMenu >
                    <DropdownMenuTrigger>
                        <Avatar className="bg-white">
                            <AvatarImage src={user?.photoURL || ""} />
                            <AvatarFallback>{user.displayName}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36 text-center">
                    <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex flex-col space-y-3 justify-center">
                            <Button><Link href="/me">View Profile</Link></Button>
                            <Button variant="destructive" onClick={() => { signOut() }}>
                                <Link href="/auth/login">Sign Out</Link></Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu> :
                        <div className="flex space-x-2">
                            <Button variant="outline"><Link href="/auth/register">Sign Up</Link></Button>
                            <Button variant="outline"><Link href="/auth/login">Sign In</Link></Button>
                        </div>
                }

            </div>
            <div className="md:hidden">
                <ModeToggle />
            </div>


        </nav>
    )
}