import { Link } from "react-router-dom"
import Logo from '../assets/Logo.svg'
import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"


const SignUpPage = () => {

  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
      <Link to={'/'} className="flex items-center gap-2 text-neutral-900 mb-4">
        <img src={Logo} alt="" />
        <span className="font-medium">My Task Board</span>
      </Link>
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl border border-neutral-200">
        <h1 className="text-2xl font-semibold text-center text-neutral-800 mb-4">
          Welcome
        </h1> 
        <p className='text-sm text-center text-balance text-neutral-500 mb-8'>
          Enter your name, email and password below to create your account
        </p>

        <form className="space-y-4">
          {/* User name */}
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-neutral-700">
              Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-amber-500 focus:border-amber-500 border-neutral-300 transition-colors ease-in-out duration-300"
              placeholder="Jhon Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-amber-500 focus:border-amber-500 border-neutral-300 transition-colors ease-in-out duration-300"
              placeholder="e@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                id="password"
                name="password"
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-amber-500 focus:border-amber-500 border-neutral-300 transition-colors ease-in-out duration-300"
              />
              <button type="button" onClick={() => setIsVisible(!isVisible)} className="absolute inset-y-0 end-1 top-2 size-fit p-1 rounded-lg hover:bg-neutral-100 hover:cursor-pointer text-neutral-500">
                {
                  isVisible 
                  ? (
                    <Eye strokeWidth={1.5} />
                  )
                  : (
                    <EyeClosed strokeWidth={1.5} />
                  )
                }
              </button>
            </div>
          </div>

          {/* <div>
            <label className="block text-sm mb-2">Password</label>
            <div className="relative">
              <input id="hs-toggle-password" type="password" className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter password" value="12345qwerty"/>
              <button type="button" data-hs-toggle-password='{
                  "target": "#hs-toggle-password"
                }' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                  <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
          </div>
            </div> */}

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-amber-500 rounded-lg hover:bg-amber-400 transition hover:cursor-pointer"
          >
            Sign up
          </button>
        </form>

        {/* Register */}
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            You already have an account?
            <Link
              to={'/login'}
              className="text-amber-500 hover:underline ml-1 hover:cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage