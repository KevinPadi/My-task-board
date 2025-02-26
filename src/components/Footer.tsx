import { ArrowUpRight, Github } from 'lucide-react'
import Logo from '../assets/Logo.svg'

const Footer = () => {
  return (
    <footer className="bg-transparent mt-10">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-900">
            <img src={Logo} alt="" />
            <span className="font-medium">My Task Board</span>
          </div>

          <p className='text-sm text-neutral-600 flex -translate-x-10'>
            build by 
            <a href='https://github.com/KevinPadi' target="_blank" rel="noopener noreferrer" className='underline hover:text-amber-700 pl-1 peer transition-all ease-in-out duration-200 '>
              Kevin Padilla
            </a>
            <ArrowUpRight strokeWidth={1} className='size-4 peer-hover:-translate-y-0.5 peer-hover:translate-x-0.5 transition-all ease-in-out duration-200' />
          </p>

          <a href="https://github.com/KevinPadi/my-task-board" target="_blank" rel="noopener noreferrer" className='border border-neutral-400 p-1 rounded-md hover:bg-neutral-200 transition-colors ease-in-out duration-300'>
            <Github strokeWidth={1.5} className='size-5' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer