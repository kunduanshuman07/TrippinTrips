'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

const HotelTabs = () => {
    const { status } = useSession();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    useEffect(()=>{
        if(status==='unauthenticated'){
            setAuth(false);
            setLoading(false);
        }
        else{
            setAuth(true);
            setLoading(false);
        }
    },[status])
    return (
        <div className="flex flex-col">
            {loading && <div style={{margin: "auto auto"}}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && auth &&
                <div>
                    
                </div>
            }
        </div>
    )
}

export default HotelTabs