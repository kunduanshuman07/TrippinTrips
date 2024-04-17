'use client'
import { useState } from "react";
import { GiTripleGate } from "react-icons/gi";
import ErrorMessage from "../components/ErrorMessage";
import { registerUser } from "../apis/authcontrollers/registerUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [cpassword, setCPassword] = useState<any>('');
    const [phone, setPhone] = useState<any>('');
    const [loading, setLoading] = useState<any>(false);
    const [errorMessage, setErrorMessage] = useState<any>();
    const handleRegister = async () => {
        setLoading(true);
        setErrorMessage(null);
        if (!email || !password || !phone || !cpassword) {
            setErrorMessage('Empty fields!');
            setLoading(false);
        }
        else if (password !== cpassword) {
            setErrorMessage('Password Mismatch!');
            setLoading(false);
        }
        else {
            const { status, data } = await registerUser({ email, password, phone });
            if (status == 200) {
                const loginResp = await signIn('credentials', {
                    email, password, redirect: false
                });
                router.push('/');
            }
            else {
                setErrorMessage('Already Registered! Please Login')
            }
        }
    }
    return (
        <div className='flex flex-row w-full'>
            <div className='flex flex-col sm:w-1/3 w-full p-4 sm:mx-5 mx-auto' >
                {errorMessage && <ErrorMessage text={errorMessage} />}
                <h1 className="text-2xl">Welcome !</h1>
                <h1 className="text-xs mt-2">Register your account.</h1>
                <h1 className="text-xs ml-1 mt-5">Email</h1>
                <input className="input input-sm input-accent mt-2 text-xs" placeholder="someone@gmail.com" type="text" onChange={(e) => setEmail(e.target.value)} />
                <h1 className="text-xs ml-1 mt-2">Password</h1>
                <input className="input input-sm input-accent mt-2 text-xs" placeholder="●●●●●●●●" type="password" onChange={(e) => setPassword(e.target.value)} />
                <h1 className="text-xs ml-1 mt-2">Confirm Password</h1>
                <input className="input input-sm input-accent mt-2 text-xs" placeholder="Re-enter your password" type="text" onChange={(e) => setCPassword(e.target.value)} />
                <h1 className="text-xs ml-1 mt-2">Phone Number</h1>
                <input className="input input-sm input-accent mt-2 text-xs" placeholder="1234567890" type="text" onChange={(e) => setPhone(e.target.value)} />
                <button className="btn btn-accent text-white mt-6 btn-sm" disabled={loading} onClick={handleRegister}>Sign In {loading && <span className="loading loading-dots loading-sm loading-white"></span>}</button>
                <a href="login" className="text-xs m-auto mt-2">{`Already have an account?`}<span className="ml-1 underline">Sign Up Now</span></a>
            </div>
            <div className='w-2/3 flex flex-col hidden sm:block'>
                <div className="flex flex-col mx-auto mt-20 items-center">
                    <GiTripleGate className="text-6xl text-teal-400" />
                    <h1 className="mx-auto mt-5 text-xl font-bold text-accent">Crafting adventures to fit your budget.</h1>
                    <ul className="steps mt-10">
                        <li className="step step-accent text-sm text-accent font-bold" data-content="">Affordable</li>
                        <li className="step step-accent text-sm text-accent font-bold" data-content="">Tailored</li>
                        <li className="step step-accent text-sm text-accent font-bold" data-content="">Budgeted</li>
                        <li className="step step-accent text-sm text-accent font-bold" data-content="">Economical</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage