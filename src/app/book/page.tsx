// pages/index.tsx
import dynamic from 'next/dynamic';

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/map'), {
    ssr: false
});

const Home = () => {
    return (
        <Map/>
    );
};

export default Home;
