import Logo from '../assets/Logo.svg'
const Header = () => {
  return (
    <header className="bg-transparent">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a className="flex items-center gap-2 text-neutral-900" href="#">
            <img src={Logo} alt="" />
            <span className="font-medium">My Task Board</span>
          </a>

          <div className="flex flex-1 justify-end">

            <div className="flex items-center justify-center">
              <div className="sm:flex sm:gap-4 items-center">

                {/* <button className='bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-700 p-2 rounded-md hover:cursor-pointer'>
                  <Sun strokeWidth={1.5} size={16} className='block dark:hidden' />
                  <Moon strokeWidth={1.5} size={16} className='dark:block hidden text-white' />
                </button> */}

                <a
                  className="hidden sm:flex items-center justify-center py-1 px-3 size-fit rounded-md bg-transparent text-sm font-medium text-black transition-all ease-in-out hover:bg-neutral-200"
                  href="#"
                >
                  Log in
                </a>

                <a
                  className="hidden sm:flex items-center justify-center py-1 px-3 size-fit rounded-md bg-black text-sm font-medium text-white transition"
                  href="#"
                >
                  Register
                </a>
              </div>

            </div>
          </div>
        </div>
      </header>
  )
}

export default Header