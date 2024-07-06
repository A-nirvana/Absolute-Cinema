"use client"

import { fetchMovies } from "@/lib/apis"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { Filter, Search } from "lucide-react"
import DropdownMenuDemo from "./dropdown"
interface NavbarProps {
    setInfo: (value: any) => void;
    setLoading: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setInfo, setLoading }) => {
    const [movie, setMovie] = useState("")
    return (
        <section className="w-full h-max px-1 md:px-7 md:mt-4 bg-contain absolute z-10 flex flex-col items-center mt-4">
            <Label htmlFor="movie" className="font-semibold mb-2 hidden md:flex md:text-lg">Search Movies & Shows</Label>
            <div className="flex max-w-sm md:max-w-screen-lg md:w-full items-center justify-between mb-4">
                <Button variant="ghost" size="icon" className="mr-2 md:hidden"><Filter /></Button>
                <div className="hidden md:flex w-[60%] space-x-16">
                    <DropdownMenuDemo category="Category" items={["movie", "series"]} />
                    <DropdownMenuDemo category="Genre" items={["Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller"]} />
                    <DropdownMenuDemo category="Year" items={["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000"]} />
                    <DropdownMenuDemo category="Rating" items={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} />
                </div>
                <form onSubmit={async (e) => {
                        e.preventDefault();
                        if (movie) {
                            setLoading(true)
                            setInfo({})
                            try {
                                fetchMovies(movie).then((data) => {
                                    setInfo(data)
                                })
                            }
                            catch (e) {
                                console.log(e)
                            }
                            finally {
                                setLoading(false)
                            }
                        }
                    }} className="w-[80%] md:w-[60%] flex justify-between md:justify-end">
                    <Input id="movie" value={movie} className="mr-2 w-[80%] md:w-[50%]" onChange={(e) => { setMovie(e.target.value) }} />
                    <Button variant="default" size="icon" type="submit"><Search /></Button>
                </form>

            </div>
        </section>
    )
}

export default Navbar;