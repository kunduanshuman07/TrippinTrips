'use client'
import { GiTripleGate } from "react-icons/gi";
const UserLayout = () => {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="text-teal-400 inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-teal-400 font-bold">
                        <a className="flex cursor-pointer" href="/"><GiTripleGate className="my-auto mr-2" /> Trippin.Trips</a>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal text-xs text-teal-400">
                            <li className="hover:bg-teal-500 font-bold hover:text-white hover:rounded-lg"><a>Destinations</a></li>
                            <li className="hover:bg-teal-500 font-bold hover:text-white hover:rounded-lg"><a>Trip Planner</a></li>
                            <li className="hover:bg-teal-500 font-bold hover:text-white hover:rounded-lg"><a>My Trips</a></li>
                            <li className="hover:bg-teal-500 font-bold hover:text-white hover:rounded-lg"><a>Blogs</a></li>
                            <li className="hover:bg-teal-500 font-bold hover:text-white hover:rounded-lg"><a>Profile</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="drawer-side z-1">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-52 min-h-full bg-base-200">
                    <li className="hover:bg-teal-500 hover:text-white hover:rounded-lg text-teal-400 mt-3"><a>Destinations</a></li>
                    <li className="hover:bg-teal-500 hover:text-white hover:rounded-lg text-teal-400 mt-3"><a>Trip Planner</a></li>
                    <li className="hover:bg-teal-500 hover:text-white hover:rounded-lg text-teal-400 mt-3"><a>My Trips</a></li>
                    <li className="hover:bg-teal-500 hover:text-white hover:rounded-lg text-teal-400 mt-3"><a>Blogs</a></li>
                    <li className="hover:bg-teal-500 hover:text-white hover:rounded-lg text-teal-400 mt-3"><a>Profile</a></li>
                </ul>
            </div>
        </div>
    )
}

export default UserLayout