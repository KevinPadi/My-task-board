import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'

const Header = () => {

  const { user } = useAuth()

  return (
    <header className="bg-transparent">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link to={'/'} className="flex items-center gap-2 text-neutral-900">
            <img src={Logo} alt="" />
            <span className="font-medium">My Task Board</span>
          </Link>

          <div className="flex flex-1 justify-end">

            <div className="flex items-center justify-center">
              <div className="sm:flex sm:gap-4 items-center">
                {
                  user ? (
                    <Avatar />
                  ) : (
                    <>
                      <Link 
                        to={'/login'}
                        className="hidden sm:flex items-center justify-center py-1 px-3 size-fit rounded-md bg-transparent text-sm font-medium text-black transition-all ease-in-out hover:bg-neutral-200"
                      >
                        Log in
                      </Link>

                      <Link
                        to={'/signup'}
                        className="hidden sm:flex items-center justify-center py-1 px-3 size-fit rounded-md bg-black text-sm font-medium text-white transition"
                      >
                        Register
                      </Link>
                    </>
                  )
                }
              </div>

            </div>
          </div>
        </div>
      </header>
  )
}

export default Header