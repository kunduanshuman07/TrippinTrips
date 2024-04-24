'use client'

interface Props {
    filterPlaces: any;
    setFilterPlaces: (filterPlaces: any) => void;
}

const DestinationHeader: React.FC<Props> = ({ filterPlaces, setFilterPlaces }) => {
    return (
        <div className="flex sm:flex-row flex-col sm:px-10 px-2 mt-2">
            <input className="input input-sm input-accent" placeholder="Search Keywords" value={filterPlaces} onChange={(e) => setFilterPlaces(e.target.value)} />
        </div>
    )
}

export default DestinationHeader