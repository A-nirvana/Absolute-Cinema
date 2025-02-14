'use client';

import { Label } from '@/components/ui/label';
import CarouselDemo from '@/components/carousel';

export interface MovieList {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ClientComponentProps {
  upcoming: MovieList[];
  now: MovieList[];
  popular: MovieList[];
  top: MovieList[];
  picks: MovieList[];
  hoarding: MovieList[];
  trending: MovieList[];
}

const ClientComponent: React.FC<ClientComponentProps> = ({ hoarding, popular, now, upcoming, top, picks,trending }) => {
  return (
    <>
      <CarouselDemo auto num={1} list={hoarding} />
      <Label className="font-semibold text-xl text-muted-foreground mt-20 mb-4 w-[84%]">TRENDING</Label>
      <CarouselDemo list={trending} />
      <Label className="font-semibold text-xl text-muted-foreground mt-12 mb-4 w-[84%]">POPULAR</Label>
      <CarouselDemo list={popular} />
      <Label className="font-semibold text-xl text-muted-foreground mt-12 mb-4 w-[84%]">NOW PLAYING</Label>
      <CarouselDemo list={now} />
      <Label className="font-semibold text-xl text-muted-foreground mt-12 mb-4 w-[84%]">UPCOMING MOVIES</Label>
      <CarouselDemo list={upcoming} />
      <Label className="font-semibold text-xl text-muted-foreground mt-12 mb-4 w-[84%]">TOP RATED MOVIES</Label>
      <CarouselDemo list={top} />
      <Label className="font-semibold text-xl text-muted-foreground mt-12 mb-4 w-[84%]">Editor`&apos;`s Top Picks</Label>
      <CarouselDemo list={picks} />
    </>
  );
};

export default ClientComponent;
