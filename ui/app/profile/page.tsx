'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";

const ProfilePage = () => {
    const { status } = useSession();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    useEffect(() => {
        if (status === 'unauthenticated') {
            setAuth(false);
            setLoading(false);
        }
        else {
            setAuth(true);
            setLoading(false);
        }
    }, [status])
    return (
        <div className="flex flex-col">
            {loading && <div style={{ margin: "auto auto" }}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && !auth &&
                <div style={{ margin: "auto auto" }}>
                    <a className="text-sm text-accent" href="/login">Please <span className="text-lg font-bold hover:underline">Sign In</span> to continue!</a>
                </div>
            }
            {!loading && auth &&
                <div className="flex flex-col">
                    This Page is in development...
                </div>
            }
        </div>
    )
}

export default ProfilePage