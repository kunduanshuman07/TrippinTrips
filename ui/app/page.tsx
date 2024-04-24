'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import HomePage from "./home/page";
import DestinationsPage from "./destinations/page";

const App = () => {
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
            {!loading && !auth && 
                <HomePage/>
            }
            {!loading && auth &&
                <div>
                    <DestinationsPage/>
                </div>
            }
        </div>
    )
}

export default App