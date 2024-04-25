'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { fetchDestinations } from "../apis/maincontrollers/fetchDestinations";
import Image1 from "../images/destinations/1.jpg";
import Image2 from "../images/destinations/2.jpg";
import Image3 from "../images/destinations/3.jpg";
import Image4 from "../images/destinations/4.jpg";
import Image5 from "../images/destinations/5.jpg";
import Image6 from "../images/destinations/6.jpg";
import Image7 from "../images/destinations/7.jpg";
import Image8 from "../images/destinations/8.jpg";
import Image9 from "../images/destinations/9.jpg";
import Image10 from "../images/destinations/10.jpg";
import Image from "next/image";
import DestinationHeader from "../components/DestinationHeader";
const DestinationsPage = () => {
    const importedImages = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image5,
        Image6,
        Image7,
        Image8,
        Image9,
        Image10,
    ]
    const { status } = useSession();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    const [destinations, setDestinations] = useState<any>();
    const [filterPlaces, setFilterPlaces] = useState<any>('');
    const [filterDestinations, setFilterDestinations] = useState<any>();
    useEffect(() => {
        const fetchDestinationsData = async () => {
            const { status, data } = await fetchDestinations();
            if (status == 200) {
                setDestinations(data?.data);
                setFilterDestinations(data?.data);
                setLoading(false);
            }
        }
        if (status === 'unauthenticated') {
            setAuth(false);
            setLoading(false);
        }
        else {
            fetchDestinationsData();
            setAuth(true);
        }
    }, [status])
    useEffect(() => {
        const filteredDestinations = destinations?.filter((destination: any) => destination.name === filterPlaces);
        if (filterPlaces === '') {
            setFilterDestinations(destinations);
        }
        else {
            setFilterDestinations(filteredDestinations);
        }
    }, [filterPlaces, destinations]);
    return (
        <div className="flex flex-col">
            {loading && <div style={{ margin: "auto auto" }}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && !auth &&
                <div style={{ margin: "auto auto" }}>
                    <a className="text-sm text-accent" href="/login">Please <span className="text-lg font-bold hover:underline">Sign In</span> to continue!</a>
                </div>
            }
            {!loading && auth &&
                <>
                    <DestinationHeader filterPlaces={filterPlaces} setFilterPlaces={setFilterPlaces} />
                    {filterDestinations.length === 0 ?
                        <h1 className="text-accent text-sm font-bold text-center">{`No Destination found with '${filterPlaces}'`}</h1>
                        :
                        <div className="sm:p-10 p-2 grid sm:grid-cols-2 grid-cols-1 gap-4">
                            {filterDestinations.map((destination: any, index: any) => (
                                <div className="rounded-lg shadow-md p-2 flex flex-row" key={index}>
                                    <div style={{ borderRight: "1px solid #94a3b8" }} className="pr-2 my-auto">
                                        <Image src={importedImages[destination?.img_index - 1]} alt={destination?.name} width={200} className="rounded-lg" style={{ height: "100px" }} />
                                    </div>
                                    <div className="flex flex-col w-full ml-1">
                                        <h1 className="text-slate-600 font-bold text-center">{destination?.name}</h1>
                                        <p className="mt-2 text-xs mx-auto text-center text-slate-400 font-bold">Why?: {destination?.desc}</p>
                                        <div className="flex flex-row mt-2">
                                            <button className="btn btn-xs btn-outline mx-auto mt-2 btn-accent hover:text-white">~ INR {destination.lower_limit} to {destination.upper_limit}</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 mt-4">
                                            <h1 className="text-xs font-bold text-gray-500 text-center">Activities: {destination?.activities?.length}</h1>
                                            <h1 className="text-xs text-gray-500 font-bold text-center">State/UT: {destination?.state}</h1>
                                        </div>
                                        <a className="mt-4 btn btn-accent btn-xs text-white px-6 mx-auto" href={`/destinations/${destination?.name}`}>Visit</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default DestinationsPage