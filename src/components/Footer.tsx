import { ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import Logo from '../assets/Logo.svg'
import { useAuth } from '../context/AuthContext'

const Footer = () => {
  const { loginAsGuest } = useAuth()

  return (
    <footer className="bg-transparent">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="flex flex-col items-center gap-4 rounded-2xl bg-amber-600 p-6 shadow-lg sm:flex-row sm:justify-between"
        >
          <strong className="text-xl text-white sm:text-xl"> No account? No problem! Test the app as a guest. </strong>

          <button
            className="inline-flex items-center gap-2 rounded-lg border border-white bg-white px-8 py-3 text-amber-600 hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
            onClick={loginAsGuest}
          >
            <span className="text-sm font-medium"> Login as Guest </span>

            <ArrowRight strokeWidth={1.5} className='size-5' />
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-6 sm:flex-row items-center justify-between">

          <div className="flex items-center gap-2 text-neutral-900">
            <img src={Logo} alt="" />
            <span className="font-medium">My Task Board</span>
          </div>

          <p className='text-sm text-neutral-600 flex sm:-translate-x-8'>
            build by 
            <a href='https://github.com/KevinPadi' target="_blank" rel="noopener noreferrer" className='underline hover:text-amber-700 pl-1 peer transition-all ease-in-out duration-200 '>
              Kevin Padilla
            </a>
            <ArrowUpRight strokeWidth={1} className='size-4 peer-hover:-translate-y-0.5 peer-hover:translate-x-0.5 transition-all ease-in-out duration-200' />
          </p>

          <div className="sm:flex sm:gap-4 sm:flex-col sm:items-end sm:justify-between">
            <a href='https://github.com/KevinPadi/my-task-board' target="_blank" rel="noopener noreferrer" className='bg-black text-white flex items-center gap-2 p-2 rounded-lg font-medium hover:bg-black/90 hover:cursor-pointer size-fit'>
              GitHub
              <Github strokeWidth='1.5' />
            </a>

          </div>
        </div>
      </div>
    </footer>
    
  )
}

export default Footer