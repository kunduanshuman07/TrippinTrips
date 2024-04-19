'use client'
import { FaFilter } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
const DestinationHeader = () => {
    return (
        <div className="flex sm:flex-row flex-col sm:px-10 px-2 mt-2">
            <input className="input input-sm input-accent" placeholder="Search Places" />
            <div className="flex flex-row sm:mt-0 mt-2">
                <button className="btn sm:btn-sm btn-xs btn-accent text-white sm:mx-4 mx-1">Add Filters <FaFilter /></button>
                <div className="tooltip" data-tip="Clear Filters">
                    <button className="btn sm:btn-sm btn-xs btn-error text-white mx-2"><GrClear /></button>
                </div>
            </div>
        </div>
    )
}

export default DestinationHeader