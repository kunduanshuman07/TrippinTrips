'use client'

import { fetchDestination } from "@/app/apis/maincontrollers/fetchDestination";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import Image1 from "../../images/destinations/1.jpg";
import Image2 from "../../images/destinations/2.jpg";
import Image3 from "../../images/destinations/3.jpg";
import Image4 from "../../images/destinations/4.jpg";
import Image5 from "../../images/destinations/5.jpg";
import Image6 from "../../images/destinations/6.jpg";
import Image7 from "../../images/destinations/7.jpg";
import Image8 from "../../images/destinations/8.jpg";
import Image9 from "../../images/destinations/9.jpg";
import Image10 from "../../images/destinations/10.jpg";
import DestinationTabs from "@/app/components/DestinationTabs";
const Destination = () => {
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
    const [destination, setDestination] = useState<any>([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchDestinationData = async () => {
            const { status, data } = await fetchDestination({ name: id });
            console.log(data);
            setDestination(data.data?.[0]);
            setLoading(false);
        }
        if (status === 'unauthenticated') {
            setAuth(false);
            setLoading(false);
        }
        else {
            fetchDestinationData();
            setAuth(true);
        }
    }, [status, id])
    return (
        <div className="flex flex-col">
            {loading && <div style={{ margin: "auto auto" }}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && !auth &&
                <div style={{ margin: "auto auto" }}>
                    <a className="text-sm text-accent" href="/login">Please <span className="text-lg font-bold hover:underline">Sign In</span> to continue!</a>
                </div>
            }
            {!loading && auth &&
                <div className="flex flex-col p-10">
                    <div className="flex sm:flex-row flex-col w-full items-center">
                        <div className="sm:w-1/4 w-full sm:mr-2 mr-0">
                            <Image src={importedImages[destination.img_index-1]} alt={destination?.name} className="rounded-lg mx-auto" width={300} style={{ height: "150px" }} />
                        </div>
                        <div className="flex flex-col w-full sm:w-3/4 w-full items-center py-7 bg-amber-200 rounded-lg sm:mt-0 mt-4">
                            <h1 className="text-slate-800 text-xl font-bold text-center">{destination?.name}</h1>
                            <p className="mt-4 text-sm mx-auto text-center text-slate-600 font-bold">{destination?.desc}</p>
                            <div className="flex flex-row mt-4">
                                <h1 className="text-sm font-bold text-gray-900 mx-1 ">{destination?.activities?.length} Activities |</h1>
                                <h1 className="text-sm text-gray-900 font-bold ">State: {destination?.state}</h1>
                            </div>
                        </div>
                    </div>
                    <DestinationTabs/>
                </div>
            }
        </div>
    )
}

export default Destination;