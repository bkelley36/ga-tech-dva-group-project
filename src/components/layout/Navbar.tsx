import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()

  function getDesktopLinkStyling(route: string): string {
    const defaultStyle =
      'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
    const activeStyle =
      'inline-flex items-center border-b-2 border-rose-500 px-1 pt-1 text-sm font-medium text-gray-900'
    return router.pathname.toLowerCase() == route.toLowerCase()
      ? activeStyle
      : defaultStyle
  }

  function getMobileLinkStyling(route: string): string {
    const defaultStyle =
      'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6'
    const activeStyle =
      'block border-l-4 border-rose-500 bg-rose-50 py-2 pl-3 pr-4 text-base font-medium text-rose-700 sm:pl-5 sm:pr-6'
    return router.pathname.toLowerCase() == route.toLowerCase()
      ? activeStyle
      : defaultStyle
  }
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 justify-between'>
              <div className='flex'>
                <div className='-ml-2 mr-2 flex items-center md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-shrink-0 items-center pl-8 md:pl-0'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
                    />
                  </svg>
                  <span className='pl-4 pr-4'>MET Explorer</span>
                </div>
                <div className='hidden md:ml-6 md:flex md:space-x-8'>
                  <Link href='/' className={getDesktopLinkStyling('/')}>
                    Home
                  </Link>
                  <Link
                    href='/proposal'
                    className={getDesktopLinkStyling('/proposal')}
                  >
                    Proposal
                  </Link>
                  <Link href='/team' className={getDesktopLinkStyling('/team')}>
                    Team
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 pt-2 pb-3'>
              <Link href='/'>
                <Disclosure.Button as='a' className={getMobileLinkStyling('/')}>
                  Home
                </Disclosure.Button>
              </Link>
              <Link href='/proposal'>
                <Disclosure.Button
                  as='a'
                  className={getMobileLinkStyling('/proposal')}
                >
                  Proposal
                </Disclosure.Button>
              </Link>
              <Link href='/team'>
                <Disclosure.Button
                  as='a'
                  className={getMobileLinkStyling('/team')}
                >
                  Team
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
