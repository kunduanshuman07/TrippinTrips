'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import MyTripsTabs from "../components/MyTripsTabs";
import PendingTabs from "../components/PendingTabs";
import { fetchUser } from "../apis/usercontrollers/fetchUser";
import UpcomingTabs from "../components/UpcomingTabs";

const MyTripsPage = () => {
    const { data, status } = useSession();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    const [destTabs, setDesttabs] = useState<any>('Pending');
    const [user, setUser] = useState<any>();
    useEffect(()=>{
        const fetchUserData = async () => {
            const userResp = await fetchUser({email: data?.user?.email});
            if(userResp.status === 200) {
                setUser(userResp?.data?.data);
                setLoading(false);
            }
        }
        if(status==='unauthenticated'){
            setAuth(false);
            setLoading(false);
        }
        else{
            fetchUserData();
            setAuth(true);
        }
    },[status, data])
    return (
        <div className="flex flex-col">
            {loading && <div style={{margin: "auto auto"}}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && !auth && 
                <div style={{margin: "auto auto"}}>
                    <a className="text-sm text-accent" href="/login">Please <span className="text-lg font-bold hover:underline">Sign In</span> to continue!</a>
                </div>
            }
            {!loading && auth &&
                <div className="flex flex-col">
                    <MyTripsTabs destTabs={destTabs} setDesttabs={setDesttabs}/>
                    <div className="flex flex-col sm:p-10 p-2">
                      {destTabs === 'Pending' && <PendingTabs user={user}/>}
                      {destTabs === 'Upcoming' && <UpcomingTabs user={user}/>}
                    </div>
                </div>
            }
        </div>
    )
}

export default MyTripsPage