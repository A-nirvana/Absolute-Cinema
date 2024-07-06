"use client"

import { useEffect, useState } from "react";
import Loading from "./loading";
import { Label } from "@/components/ui/label";
import CarouselDemo from "@/components/carousel";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
    
  if(loading) return <Loading/>
    return (
      <div className="flex flex-col mx-8 mt-8">
          <Label className="text-lg font-semibold text-muted-foreground">Popular Movies & Shows</Label>
          <CarouselDemo auto={true}/>
          <Label className="text-lg font-semibold text-muted-foreground">Now Playing</Label>
          <CarouselDemo/>
          <Label className="text-lg font-semibold text-muted-foreground">Upcoming Movies & Shows</Label>
          <CarouselDemo/>
          <Label className="text-lg font-semibold text-muted-foreground">Trending Movies & Shows</Label>
          <CarouselDemo/>
          <Label className="text-lg font-semibold text-muted-foreground">Suggested Movies</Label>
          <CarouselDemo/>
          <Label className="text-lg font-semibold text-muted-foreground">Editor's Choice</Label>
          <CarouselDemo/>
        </div>
    )
}

export default HomePage