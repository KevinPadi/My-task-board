import { Link } from 'react-router-dom'
import HeroIllustration from '../assets/hero_illustration.svg'
import Header from '../components/Header'

const HomePage = () => {
  return (
    <section className='bg-neutral-50'>
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h1 className="text-4xl font-semibold text-neutral-900 sm:text-7xl text-balance">
                Welcome to My Task Board
              </h1>

              <p className="mt-4 text-neutra  l-900 text-lg sm:text-2xl font-medium text-balance">
                Plan, prioritize, and complete your tasks effortlessly.
              </p>

              <div className='mt-8'>
                <Link to={'/login'} className='px-4 py-2 bg-amber-500 hover:bg-amber-400 transition-colors duration-300 ease-in-out rounded-lg text-white font-medium'>
                  Get started
                </Link>
              </div>
            </div>
          </div>

          <div>
            <img
              src={HeroIllustration}
              className="rounded aspect-video"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage