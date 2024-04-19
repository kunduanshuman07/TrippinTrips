'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import Image1 from "../images/activities/1.jpg";
import Image2 from "../images/activities/2.jpg";
import Image3 from "../images/activities/3.jpg";
import Image4 from "../images/activities/4.jpg";
import Image5 from "../images/activities/5.jpg";
import Image6 from "../images/activities/6.jpg";
import Image7 from "../images/activities/7.jpg";
import Image8 from "../images/activities/8.jpg";
import Image9 from "../images/activities/9.jpg";
import Image10 from "../images/activities/10.jpg";
import Image11 from "../images/activities/11.jpg";
import Image12 from "../images/activities/12.jpg";
import Image13 from "../images/activities/13.jpg";
import Image14 from "../images/activities/14.jpg";
import Image15 from "../images/activities/15.jpg";
import Image16 from "../images/activities/16.jpg";
import Image17 from "../images/activities/17.jpg";
import Image18 from "../images/activities/18.jpg";
import Image19 from "../images/activities/19.jpg";
import Image20 from "../images/activities/20.jpg";
import Image21 from "../images/activities/21.jpg";
import Image22 from "../images/activities/22.jpg";
import Image23 from "../images/activities/23.jpg";
import Image24 from "../images/activities/24.jpg";
import Image25 from "../images/activities/25.jpg";
import Image26 from "../images/activities/26.jpg";
import Image27 from "../images/activities/27.jpg";
import Image28 from "../images/activities/28.jpg";
import Image29 from "../images/activities/29.jpg";
import Image30 from "../images/activities/30.jpg";
import Image31 from "../images/activities/31.jpg";
import Image32 from "../images/activities/32.jpg";
import Image33 from "../images/activities/33.jpg";
import Image34 from "../images/activities/34.jpg";
import Image35 from "../images/activities/35.jpg";
import Image36 from "../images/activities/36.jpg";
import Image37 from "../images/activities/37.jpg";
import Image38 from "../images/activities/38.jpg";
import Image39 from "../images/activities/39.jpg";
import Image40 from "../images/activities/40.jpg";
import Image41 from "../images/activities/41.jpg";
import Image42 from "../images/activities/42.jpg";
import Image43 from "../images/activities/43.jpg";
import Image44 from "../images/activities/44.jpg";
import Image45 from "../images/activities/45.jpg";
import Image46 from "../images/activities/46.jpg";
import { fetchActivities } from "../apis/maincontrollers/fetchActivities";
import Image from "next/image";

interface Props {
    activity: any;
    setSelectedActivities: (selectedActivities: any) => void;
    selectedActivities: any;
    setDestTabs: (destTabs: any) => void;
}

const ActivitiesTab: React.FC<Props> = ({ activity, setSelectedActivities, selectedActivities, setDestTabs }) => {
    const { status } = useSession();
    const [activityCounts, setActivityCounts] = useState<{ [key: number]: number }>(selectedActivities);
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    const [activities, setActivities] = useState<any>([]);
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
        Image11,
        Image12,
        Image13,
        Image14,
        Image15,
        Image16,
        Image17,
        Image18,
        Image19,
        Image20,
        Image21,
        Image22,
        Image23,
        Image24,
        Image25,
        Image26,
        Image27,
        Image28,
        Image29,
        Image30,
        Image31,
        Image32,
        Image33,
        Image34,
        Image35,
        Image36,
        Image37,
        Image38,
        Image39,
        Image40,
        Image41,
        Image42,
        Image43,
        Image44,
        Image45,
        Image46,
    ];
    useEffect(() => {
        const fetchAllDestActivities = async () => {
            const { status, data } = await fetchActivities({ activity });
            if (status == 200) {
                setActivities(data?.data);
                setLoading(false);
            }
        }
        if (status === 'unauthenticated') {
            setAuth(false);
            setLoading(false);
        }
        else {
            fetchAllDestActivities();
            setAuth(true);
        }
    }, [status, activity])
    const handleSaveActivities = () => {
        setSelectedActivities(activityCounts);
        setDestTabs('Checkout')
        
    }
    const handleIncrement = (index: number) => {
        setActivityCounts((prevCounts) => ({
            ...prevCounts,
            [index]: (prevCounts?.[index] || 0) + 1,
        }));
    };

    const handleDecrement = (index: number) => {
        setActivityCounts((prevCounts) => ({
            ...prevCounts,
            [index]: Math.max((prevCounts?.[index] || 0) - 1, 0),
        }));
    };
    return (
        <div className="flex flex-col">
            {loading && <div style={{ margin: "10px auto" }}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && auth &&
                <>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 mt-2 cursor-pointer">
                        {activities?.map((x: any, index: any) => (
                            <div className="flex flex-row shadow-md p-2" key={index}>
                                <div className="" style={{ maxHeight: "150px", margin: "auto 2px" }}>
                                    <Image src={importedImages[activity[index] - 1]} alt="" width={200} className="rounded-lg" />
                                </div>
                                <div className="flex flex-col p-2 items-center w-full">
                                    <h1 className="text-sm text-center text-cyan-700 font-bold mt-2">{x.name}</h1>
                                    <h1 className="text-sm mt-2 text-slate-400 font-bold flex">Upper Limit: <BiRupee className="my-auto" /> {x.upper_limit}</h1>
                                    <h1 className="text-xs">{`(per person rates)`}</h1>
                                    <div className="flex flex-row mt-2">
                                        <input className="input px-2 input-xs w-2/12 text-center text-slate-800 font-bold input-info ml-auto" placeholder="0" value={activityCounts?.[index] || 0}/>
                                        <div className="flex flex-row mr-auto ml-2">
                                           <button className="btn btn-xs btn-accent text-white px-3" onClick={()=>handleIncrement(index)}>+</button>
                                           <button className="btn btn-xs btn-accent text-white px-3 ml-2" onClick={()=>handleDecrement(index)}>-</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className='btn btn-accent btn-sm mx-auto text-white mt-4' onClick={handleSaveActivities}>Save Selected Activities</button>
                </>
            }
        </div>
    )
}

export default ActivitiesTab