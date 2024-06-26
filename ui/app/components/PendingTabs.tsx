'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { fetchTrips } from "../apis/maincontrollers/fetchTrips";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { MdEmojiPeople } from "react-icons/md";
import { fetchTripActivities } from "../apis/maincontrollers/fetchTripActivities";
import CancelTripModal from "./CancelTripModal";
import CheckOutModal from "./CheckoutModal";
interface Props {
    user: any;
    setTab: (destTab: any) => void;
}

const PendingTabs: React.FC<Props> = ({ user, setTab }) => {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<any>(true);
    const [cancelModal, setCancelModal] = useState<any>();
    const [auth, setAuth] = useState<any>(false);
    const [trips, setTrips] = useState<any>();
    const [activities, setActivities] = useState<any>();
    const [tripId, setTripId] = useState<any>();
    const [tripName, setTripName] = useState<any>();
    const [checkOutModal, setCheckoutModal] = useState<any>(false);
    const [amount, setAmount] = useState<any>();
    useEffect(() => {
        const fetchPendingTrips = async () => {
            const tripsResp = await fetchTrips({ user_id: user?.id, type: "Pending" });
            let extractedIds: any = [];
            tripsResp?.data?.data?.map((trip: any) => {
                trip?.activities?.map((obj: any) => {
                    extractedIds.push(obj?.activity_id);
                });
            })
            const activityResp = await fetchTripActivities({ activity: extractedIds });
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
    const handlePayment = (tripId: any, rate: any) => {
        setAmount(rate);
        setTripId(tripId);
        setCheckoutModal(true);
    }
    const handleCancelTrip = (tripId: any, tripName: any) => {
        setTripId(tripId);
        setTripName(tripName);
        setCancelModal(true);
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
                            <div className="flex flex-col mb-4">
                                {trip?.activities.map((activity: any, index: any) => (
                                    <div className="flex flex-row" key={index}>
                                        {(() => {
                                            const matchedActivity = activities.find((a: any) => a.id === activity.activity_id);
                                            if (matchedActivity) {
                                                return (
                                                    <>
                                                        <h1 className="text-xs text-slate-600 font-bold mt-2 flex"><GoDotFill className="my-auto mr-2" />{matchedActivity.name}</h1>
                                                        <h1 className="text-xs text-slate-600 font-bold mt-2 ml-2 flex"><MdEmojiPeople className="my-auto" />{activity.count}</h1>
                                                    </>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>
                                ))}
                            </div>
                            {/* <h1 className="text-sm text-teal-500 mt-2">Hotel</h1>
                            <div className="flex flex-col mb-4">
                                {trip?.activities.map((activity: any, index: any) => (
                                    <div className="flex flex-row" key={index}>
                                        <h1 className="text-xs text-slate-600 font-bold mt-2 flex"><GoDotFill className="my-auto mr-2" />{activities[index]?.name}</h1>
                                        <h1 className="text-xs text-slate-600 font-bold mt-2 ml-2 flex"><MdEmojiPeople className="my-auto" />{activity.count}</h1>
                                    </div>
                                ))}
                            </div> */}
                            <h1 className="text-slate-400 text-xs font-bold" style={{ marginTop: "auto" }}>{trip.stage==='Confirmation'?'You will get a call shortly discussing the further proceedings.': 'Please proceed with payment to download ticket and further instructions.'}</h1>
                            <ul className="steps steps-horizontal steps-xs mr-auto mt-4">
                                <li className={`step text-xs ${trip.stage === 'Payment' ? 'step-primary' : 'step-neutral'}`}>Payment</li>
                                <li className={`step text-xs ${trip.stage === 'Ticket' ? 'step-neutral' : 'step-neutral'}`}>Ticket</li>
                            </ul>
                            <div className="flex flex-row mt-4">
                                <button className="btn sm:btn-sm btn-xs btn-error text-white" onClick={()=>handleCancelTrip(trip.id, trip.dest_name)}>Cancel</button>
                                <div className="tooltip tooltip-bottom ml-2" data-tip={trip.stage !== 'Payment' ? 'Available after Confirmation' : 'Start Payment'}>
                                    <button className="btn sm:btn-sm btn-xs btn-accent text-white" disabled={trip.stage !== 'Payment'} onClick={()=>handlePayment(trip.id, trip.rate_approx)}>Pay {trip.stage === 'Payment' && trip.rate_approx}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {cancelModal && <CancelTripModal modalOpen={cancelModal} setModalOpen={setCancelModal} trip_id={tripId} dest_name={tripName}/>}
                    {checkOutModal && <CheckOutModal modalOpen={checkOutModal} setModalOpen={setCheckoutModal} budget={amount} user={user} tripId={tripId} setTab={setTab}/>}
                </div>
            }
        </div>
    )
}

export default PendingTabs;