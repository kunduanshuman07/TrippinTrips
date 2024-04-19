'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { fetchActivities } from "../apis/maincontrollers/fetchActivities";
import { BiRupee } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { MdEmojiPeople } from "react-icons/md";
import { checkoutTrip } from "../apis/maincontrollers/checkoutTrip";
import { fetchUser } from "../apis/usercontrollers/fetchUser";
import { useRouter } from "next/navigation";
interface Props {
    activity: any;
    selectedActivities: any;
    setSelectedActivities: (selectedActivities: any) => void;
    dest_id: any;
}

const CheckoutTabs: React.FC<Props> = ({ activity, selectedActivities, setSelectedActivities, dest_id }) => {
    const { data, status } = useSession();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    const [activities, setActivities] = useState<any>([]);
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [buttonLoading, setButtonLoading] = useState<any>(false);
    const router = useRouter();
    let finalActivities:any = [];
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
    const handleIncrement = (index: number) => {
        setSelectedActivities((prevCounts: any) => ({
            ...prevCounts,
            [index]: (prevCounts?.[index] || 0) + 1,
        }));
    };

    const handleDecrement = (index: number) => {
        setSelectedActivities((prevCounts: any) => {
            const updatedCounts = {
                ...prevCounts,
                [index]: Math.max((prevCounts?.[index] || 0) - 1, 0),
            };
            if (updatedCounts[index] === 0) {
                const { [index]: omit, ...rest } = updatedCounts;
                return rest;
            }
            return updatedCounts;
        });
    };
    const handleProceed = async() => {
        setButtonLoading(true);
        {Object.entries(selectedActivities).map(([index, count]: [any, any]) => {
            finalActivities.push({
                activity_id: activities[index]?.id,
                count: count
            });
        })}
        const userResp = await fetchUser({email: data?.user?.email});
        const tripResp = await checkoutTrip({user_id: userResp.data.data.id, dest_id, start_date: startDate, end_date: endDate, activities: finalActivities});
        if(tripResp.status==200){
            router.push('/mytrips');
        }
    }
    console.log(selectedActivities);
    return (
        <div className="flex flex-col">
            {loading && <div style={{ margin: "10px auto" }}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && auth &&
                selectedActivities &&
                <div className="flex sm:flex-row flex-col w-full">
                    <div className="flex flex-col sm:w-2/3 w-full">
                        {Object.entries(selectedActivities).map(([index, count]: [any, any]) => (
                            <div className="flex flex-row shadow-md w-full p-2 rounded-lg mt-3" key={index}>
                                <h1 className="text-sm text-accent font-bold mx-4 my-auto">{activities[index]?.name}</h1>
                                <h1 className="text-xs text-slate-400 font-bold my-auto ml-auto ml-auto flex"><BiRupee className="my-auto" />{activities[index]?.upper_limit}</h1>
                                <h1 className="text-xs text-slate-500 font-bold mx-4 my-auto ml-2 flex"><MdEmojiPeople className="my-auto"/> {count}</h1>
                                <button className="ml-2 btn btn-accent btn-xs text-white" onClick={() => handleIncrement(index)}>+</button>
                                <button className="ml-2 btn btn-accent btn-xs text-white" onClick={() => handleDecrement(index)}>-</button>
                            </div>
                        ))}
                        {
                            Object.keys(selectedActivities).length > 0 && <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                            <div className="flex sm:mt-0">
                                <label className="text-xs text-slate-400 font-bold my-auto mx-2">Start Date</label>
                                <input type="date" className="input input-sm shadow-md input-accent text-xs cursor-pointer" onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="flex sm:mt-0 mt-2">
                                <label className="text-xs text-slate-400 font-bold my-auto mx-2">End Date</label>
                                <input type="date" className="input input-sm shadow-md input-accent text-xs cursor-pointer" onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        }
                    </div>
                    <div className="sm:w-1/3 w-full flex flex-col p-2 shadow-md rounded-lg sm:ml-2 ml-0 mt-3">
                        <h1 className="bg-accent text-white px-4 mx-auto mt-1 text-xs font-bold py-1 rounded-lg">Next Steps</h1>
                        <div className="flex flex-col mt-4">
                            <h1 className="text-xs text-slate-600 mr-auto flex mt-2"><GoDotFill className="mr-2 my-auto" />Check all the selected activities and hotels.</h1>
                            <h1 className="mr-auto flex text-xs text-slate-600 flex mt-2"><GoDotFill className="mr-2 my-auto" />Press the Proceed button below.</h1>
                            <h1 className="mr-auto flex text-xs text-slate-600 flex mt-2"><GoDotFill className="mr-2 my-auto" />You will recieve a confirmation call within 2 hours.</h1>
                            <h1 className="mr-auto flex text-xs text-slate-600 flex mt-2"><GoDotFill className="mr-2 my-auto" />Please visit My Trips section above to track the progress of your trip planning.</h1>
                            <button className="btn btn-sm mx-auto btn-accent px-10 text-white mt-4 btn-outline" onClick={handleProceed}disabled={Object.keys(selectedActivities).length === 0}>Proceed {buttonLoading && <span className="loading loading-spinner loading-sm"></span>}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CheckoutTabs