'use client'
import { FaFilter } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
const DestinationHeader = () => {
    return (
        <div className="flex sm:flex-row flex-col sm:px-10 px-2 mt-2">
            <input className="input input-sm input-accent" placeholder="Search Places" />
        </div>
    )
}

export default DestinationHeader