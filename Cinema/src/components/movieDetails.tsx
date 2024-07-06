"use client"

import { fetchMovieDetails } from "@/lib/apis";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Badge, Sheet } from "lucide-react";
import { Label } from "./ui/label";
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

interface MovieDetailsProps {
    imdbid: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ imdbid }) => {
    const [details, setDetails] = useState({} as any);
    useEffect(() => {
        fetchMovieDetails(imdbid).then((data) => {
            setDetails(data)
        })
    }, [imdbid])
    return (
       <></>
    )
}

export default MovieDetails;