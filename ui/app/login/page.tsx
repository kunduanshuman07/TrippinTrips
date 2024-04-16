'use client'
import { GiTripleGate } from "react-icons/gi";

const LoginPage = () => {
  return (
    <div className='flex flex-row w-full'>
      <div className='flex flex-col sm:w-1/3 w-full mt-2 p-4 sm:mx-5 mx-auto' >
        <h1 className="text-2xl">Welcome Back</h1>
        <h1 className="text-xs mt-2">Sign in to your account.</h1>
        <h1 className="text-xs ml-1 mt-10">Email</h1>
        <input className="input input-sm input-accent mt-2 text-xs" placeholder="someone@gmail.com" type="text" />
        <div className="flex ml-1 mt-4">
          <h1 className="text-xs">Password</h1>
          <a className="ml-auto text-xs" href="">Forgot Password?</a>
        </div>
        <input className="input input-sm input-accent mt-2 text-xs" placeholder="●●●●●●●●" type="password" />
        <button className="btn btn-accent text-white mt-6 btn-sm">Sign In</button>
        <a href="" className="text-xs m-auto mt-10">{`Don't have an account?`}<span className="ml-1 underline">Sign Up Now</span></a>
        <p className="text-xs mt-20 mx-auto test-slate-300">{`By continuing, you agree to Trippin.Trips' Terms of Service and Privacy Policy, and to receive periodic emails with updates.`}</p>
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

export default LoginPage