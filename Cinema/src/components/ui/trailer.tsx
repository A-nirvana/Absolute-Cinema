
interface TrailerProps {
    videoId: string;
}

const Trailer: React.FC<TrailerProps> = ({ videoId }) => {
    return (
            <iframe width="711" height="400" className="focus:outline-none rounded-r h-[225px] md:h-[400px]"
            src={videoId}>
            </iframe>
    )
}

export default Trailer;