'use client'
import { FaFilter } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
const DestinationHeader = () => {
    return (
        <div className="flex flex-row sm:px-10 px-2 mt-2">
            <input className="input input-sm input-accent" placeholder="Search Places" />
            <button className="btn btn-sm btn-accent text-white mx-4">Add Filters <FaFilter /></button>
            <div className="tooltip" data-tip="Clear Filters">
                <button className="btn btn-sm btn-error text-white mx-2"><GrClear /></button>
            </div>
        </div>
    )
}

export default DestinationHeader