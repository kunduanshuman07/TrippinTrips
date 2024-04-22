'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlineSupportAgent } from "react-icons/md";
const HomePage = () => {
    const { status } = useSession();
    const [auth, setAuth] = useState<any>(false);
    useEffect(() => {
        if (status === 'unauthenticated') {
            setAuth(false);
        }
        else {
            setAuth(true);
        }
    }, [status])
    return (
        <div className="flex sm:flex-row flex-col p-5">
            <div className="flex flex-col sm:w-1/2 w-full">
                <h1 className="text-teal-500 font-bold sm:text-3xl text-xl text-center">One Stop solution for planning your trips with your budget.</h1>
                <ul className="steps steps-vertical m-auto mt-4">
                    <li className="step step-accent">Register</li>
                    <li className="step step-accent">Choose destination/Trip planner</li>
                    <li className="step">Select activities within your budget</li>
                    <li className="step">Book Hotel</li>
                    <li className="step">Pay & Enjoy</li>
                </ul>
            </div>
            <div className="flex flex-col sm:w-1/2 w-full sm:mt-0 mt-4 p-10">
                <h1 className="text-xl text-center text-slate-600 font-bold">How does it work?</h1>
                <h1 className="flex text-slate-400 font-bold text-xs mr-auto mt-5"><GoDotFill className="my-auto mr-2"/>Select your destination and checkout.</h1>
                <h1 className="flex text-slate-400 font-bold text-xs mr-auto mt-2"><GoDotFill className="my-auto mr-2"/>Recieve a call from our destination expert within 2 hours.</h1>
                <h1 className="flex text-slate-400 font-bold text-xs mr-auto mt-2"><GoDotFill className="my-auto mr-2"/>Finalize your destination with your selected activiting within your budget.</h1>
                <h1 className="flex text-slate-400 font-bold text-xs mr-auto mt-2"><GoDotFill className="my-auto mr-2"/>Proceed with Payment.</h1>
                <h1 className="flex text-slate-400 font-bold text-xs mr-auto mt-2"><GoDotFill className="my-auto mr-2"/>Recieve a ticket for hotels and activities.</h1>
                <h1 className="flex text-slate-400 font-bold text-xs mr-auto mt-2"><GoDotFill className="my-auto mr-2"/>Visit your dream destinations, show your tickets on hotels and activities with full cooperation and Enjoy!</h1>
                <div className="flex flex-row my-10">
                    <button className="btn btn-xs">24hr <MdOutlineSupportAgent className="my-auto"/> </button>
                    <button className="btn btn-xs ml-2">Hassle Free </button>
                    <button className="btn btn-xs ml-2">100% Cooperation </button>
                </div>
                <a className="btn sm:btn-md btn-sm btn-accent text-white mx-auto mt-5 px-10" href={!auth?'/login': '/destinations'}>Get Started</a>
            </div>
        </div>
    )
}

export default HomePage