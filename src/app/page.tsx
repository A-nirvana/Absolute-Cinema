import { Suspense } from 'react';
import { editorChoice, fetchNowPlaying, fetchPopular, fetchTop, fetchUpcoming } from '@/lib/apis';
import ClientComponent from '@/components/ClientComponent';
import Loading from './loading';

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

const HomePage = async () => {
  const now = await fetchNowPlaying('movie').then((data) => data.results);
  const picks = await editorChoice().then((data) => data.results);
  const top = await fetchTop('movie').then((data) => data.results);
  const popular = await fetchPopular('movie').then((data) => data.results);
  const upcoming = await fetchUpcoming().then((data) => data.results);
  const hoarding = [popular[0], now[0], top[0], upcoming[0], picks[0]];

  return (
    <div className="flex flex-col items-center mb-20 max-w-[100vw] text-center md:text-left md:text-xl">
      <Suspense fallback={<Loading />}>
        <ClientComponent hoarding={hoarding} popular={popular} now={now} upcoming={upcoming} top={top} picks={picks} />
      </Suspense>
    </div>
  );
};

export default HomePage;
