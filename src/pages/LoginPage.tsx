import { Link } from "react-router-dom"
import Logo from '../assets/Logo.svg'
import { useState } from "react"
import { Eye, EyeClosed, LoaderCircle } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { authSchema, AuthSchema } from "../schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({ resolver: zodResolver(authSchema) })

  const onSubmit = async (data: AuthSchema) => {
    try {
      await login(data)
    } catch (error) {
      console.error("Error en el login:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-4">
      <Link to={'/'} className="flex items-center gap-2 text-neutral-900 mb-4">
        <img src={Logo} alt="" />
        <span className="font-medium">My Task Board</span>
      </Link>
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl border border-neutral-200">
        <h1 className="text-2xl font-semibold text-center text-neutral-800 mb-4">
          Welcome Back
        </h1> 
        <p className='text-sm text-center text-balance text-neutral-500 mb-8'>
          Enter your email and password below to login to your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-amber-500 focus:border-amber-500 border-neutral-300 transition-colors ease-in-out duration-300"
              placeholder="e@example.com"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-0 focus:outline-amber-500 focus:border-amber-500 border-neutral-300 transition-colors ease-in-out duration-300"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute inset-y-0 end-1 top-2 size-fit p-1 rounded-lg hover:bg-neutral-100 hover:cursor-pointer text-neutral-500"
              >
                {isVisible ? <Eye strokeWidth={1.5} /> : <EyeClosed strokeWidth={1.5} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-amber-500 rounded-lg hover:bg-amber-400 transition hover:cursor-pointer"
          >
            {
              isSubmitting ? (
                <LoaderCircle className="animate-spin mx-auto" />
              ) : (
                'Sign in'
              )
            }
          </button>
        </form>

        {/* Register */}
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            You don't have an account?
            <Link
              to={'/signup'}
              className="text-amber-500 hover:underline ml-1 hover:cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage