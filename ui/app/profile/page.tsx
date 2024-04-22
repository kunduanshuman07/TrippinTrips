'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

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
                <div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 p-4">
                        <div className="collapse collapse-arrow shadow-md rounded-lg mt-4">
                            <input type="checkbox" />
                            <h1 className="collapse-title text-sm flex flex-row">Account Settings</h1>
                            <div className="collapse-content flex flex-col">
                                <a href="/password" className="text-[#0891b2] text-xs font-bold hover:underline mt-2">Change Password</a>
                                <a className="text-[#dc2626] text-xs font-bold hover:underline mt-1 cursor-pointer">Delete Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePage