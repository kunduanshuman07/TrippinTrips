'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { fetchTrips } from "../apis/maincontrollers/fetchTrips";
import { fetchActivities } from "../apis/maincontrollers/fetchActivities";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
interface Props {
    user: any;
}

const PendingTabs: React.FC<Props> = ({ user }) => {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    const [trips, setTrips] = useState<any>();
    const [activities, setActivities] = useState<any>();
    useEffect(() => {
        const fetchPendingTrips = async () => {
            const tripsResp = await fetchTrips({ user_id: user?.id, type: "Pending" });
            let extractedIds: any = [];
            tripsResp?.data?.data?.map((trip: any) => {
                trip?.activities?.map((obj: any) => {
                    extractedIds.push(obj?.activity_id);
                });
            })
            const activityResp = await fetchActivities({ activity: extractedIds });
            if (activityResp.status == 200) {
                setTrips(tripsResp?.data?.data);
                setActivities(activityResp?.data?.data);
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        }
        if (status === 'unauthenticated') {
            setAuth(false);
            setLoading(false);
        }
        else {
            fetchPendingTrips();
            setAuth(true);
        }
    }, [status, user])
    const handlePayment = () => {
        router.push('/checkout');
    }
    return (
        <div className="flex flex-col">
            {loading && <div style={{ margin: "auto auto" }}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && !auth &&
                <div style={{ margin: "auto auto" }}>
                    <a className="text-sm text-accent" href="/login">Please <span className="text-lg font-bold hover:underline">Sign In</span> to continue!</a>
                </div>
            }
            {!loading && auth &&

                trips?.length === 0 ? <h1 className="text-center text-xs text-accent font-bold mt-4">No Pending trips</h1> :
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">

                    {trips?.map((trip: any, index: any) => (
                        <div className="flex flex-col shadow-md rounded-lg p-2" key={index}>
                            <h1 className="font-bold text-accent text-center">{trip?.dest_name}</h1>
                            <h1 className="text-xs text-slate-400 font-bold">Start date: {trip?.start_date}</h1>
                            <h1 className="text-xs text-slate-400 font-bold">End date: {trip?.end_date}</h1>
                            <h1 className="text-sm text-teal-500 mt-2">Activities</h1>
                            <div className="flex flex-col">
                                {trip?.activities.map((activity: any, index: any) => (
                                    <div className="flex flex-row" key={index}>
                                        <h1 className="text-xs text-slate-600 font-bold mt-2 flex"><GoDotFill className="my-auto mr-2" />{activities[index]?.name}</h1>
                                        <h1 className="text-xs text-slate-600 font-bold mt-2 ml-2 ">{activity.count}</h1>
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-sm text-teal-500 mt-2">Hotel</h1>
                            <div className="flex flex-col mb-4">
                                {trip?.activities.map((activity: any, index: any) => (
                                    <div className="flex flex-row" key={index}>
                                        <h1 className="text-xs text-slate-600 font-bold mt-2 flex"><GoDotFill className="my-auto mr-2" />{activities[index]?.name}</h1>
                                        <h1 className="text-xs text-slate-600 font-bold mt-2 ml-2 ">{activity.count}</h1>
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-slate-400 text-xs font-bold" style={{ marginTop: "auto" }}>You will get a call shortly discussing the further proceedings.</h1>
                            <ul className="steps steps-horizontal steps-xs mr-auto mt-4">
                                <li className={`step text-xs ${trip.stage==='Confirmation'?'step-primary': 'step-neutral'}`}>Confirmation</li>
                                <li className={`step text-xs ${trip.stage==='Payment'?'step-primary': 'step-neutral'}`}>Payment</li>
                                <li className={`step text-xs ${trip.stage==='Ticket'?'step-neutral': 'step-neutral'}`}>Ticket</li>
                            </ul>
                            <div className="flex flex-row mt-4">
                                <button className="btn sm:btn-sm btn-xs btn-error text-white">Cancel Trip</button>
                                <div className="tooltip tooltip-bottom ml-2" data-tip={trip.stage!=='Payment'?'Available after Confirmation': 'Start Payment'}>
                                    <button className="btn sm:btn-sm btn-xs btn-accent text-white" disabled={trip.stage!=='Payment'} onClick={handlePayment}>Pay {trip.stage==='Payment'&& trip.rate_approx}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default PendingTabs;