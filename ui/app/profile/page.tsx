'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { fetchUser } from "../apis/usercontrollers/fetchUser";
import { updateProfile } from "../apis/maincontrollers/updateProfile";

const ProfilePage = () => {
    const { data, status } = useSession();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    const [email, setEmail] = useState<any>('');
    const [phone, setPhone] = useState<any>('');
    const [name, setName] = useState<any>('');
    const [city, setCity] = useState<any>('');
    const [state, setState] = useState<any>('');
    const [pincode, setPincode] = useState<any>('');
    const [age, setAge] = useState<any>('');
    const [buttonLoading, setButtonLoading] = useState<any>(false);
    const [toastMessage, setToastMessage] = useState<any>(false);
    useEffect(() => {
        setToastMessage(false);
        const fetchUserData = async () => {
            const userResp = await fetchUser({ email: data?.user?.email });
            if (userResp.status === 200) {
                setEmail(userResp?.data?.data?.email);
                setPhone(userResp?.data?.data?.phone);
                setName(userResp?.data?.data?.name);
                setCity(userResp?.data?.data?.city);
                setState(userResp?.data?.data?.state);
                setPincode(userResp?.data?.data?.pincode);
                setAge(userResp?.data?.data?.age);
                setLoading(false);
            }
        }
        if (status === 'unauthenticated') {
            setAuth(false);
            setLoading(false);
        }
        else {
            fetchUserData();
            setAuth(true);
        }
    }, [status, data]);
    const updateProfileData = async () => {
        setButtonLoading(true);
        const profileResp = await updateProfile({ name, email, age, city, state, pincode });
        if (profileResp.status == 200) {
            setButtonLoading(false);
            setToastMessage(true);
        }
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
                <div className="flex flex-col px-4 py-2">
                    {toastMessage && <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span className="text-white text-xs font-bold">Profile Succesfully updated !</span>
                        </div>
                    </div>}
                    <h1 className="text-accent font-bold text-center">Edit your profile</h1>
                    <div className="flex flex-col sm:w-1/2 w-full mx-auto">
                        <div className="flex flex-row mt-4">
                            <div className="flex flex-col mx-auto">
                                <label className="text-sm">Email</label>
                                <input className="input input-sm input-accent mt-1" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                            </div>
                            <div className="flex flex-col mx-auto">
                                <label className="text-sm">Phone</label>
                                <input className="input input-sm input-accent mt-1" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled />
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <label className="text-sm">Name</label>
                            <input className="input input-sm input-accent mt-1" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label className="text-sm">Age</label>
                            <input className="input input-sm input-accent mt-1" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col mt-2 mx-auto">
                                <label className="text-sm">City</label>
                                <input className="input input-sm input-accent mt-1" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="flex flex-col mt-2 mx-auto">
                                <label className="text-sm">State</label>
                                <input className="input input-sm input-accent mt-1" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col mt-2 mx-auto">
                            <label className="text-sm">Pincode</label>
                            <input className="input input-sm input-accent mt-1" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        </div>
                    </div>
                    <button className="btn btn-sm btn-accent text-white font-bold mx-auto mt-4" onClick={updateProfileData}>Update Profile {buttonLoading && <span className="loading loading-bars loading-xs"></span>}</button>
                </div>
            }
        </div>
    )
}

export default ProfilePage