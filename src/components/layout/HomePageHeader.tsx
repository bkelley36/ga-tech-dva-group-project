import {
  DocumentIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import metHeroImage from '../../../public/images/met-hero.jpg'

const pages = [
  {
    name: 'Tool',
    href: '#tool',
    actionText: 'Use the tool',
    description:
      'Get a summary of the METs offerings and find the optimal path to see everything on your agenda when visiting!',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Proposal',
    href: '/proposal',
    actionText: 'Read the Proposal',
    description:
      'Take a look at the proposal behind this project made for the Data Visualizations and Analytics class',
    icon: DocumentIcon,
  },
  {
    name: 'Team',
    href: '/team',
    actionText: 'Meet the Team',
    description:
      'Meet and learn more about the Georgia Tech. students who created the project!',
    icon: UserGroupIcon,
  },
]

export default function HomePageHeader() {
  return (
    <div className='bg-white'>
      {/* Header */}
      <div className='relative bg-gray-800 pb-32'>
        <div className='absolute inset-0'>
          <Image
            src={metHeroImage}
            className='h-full w-full object-cover'
            alt='MET hero image'
            width={1920}
            height={1285}
            placeholder='blur'
            priority
          />
          <div
            className='absolute inset-0 bg-gray-600 mix-blend-multiply'
            aria-hidden='true'
          />
        </div>
        <div className='relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8'>
          <h1 className='text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl'>
            MET Explorer
          </h1>
          <p className='mt-6 max-w-3xl text-xl text-gray-300'>
            Welcome to the MET Explorer - A website to visualize The
            Metropolitan Museum of Art's offerings and help plan your trip!
          </p>
        </div>
      </div>

      {/* Overlapping cards */}
      <section className='relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-32 lg:px-8'>
        <div className='grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8'>
          {pages.map((page) => (
            <div
              key={page.name}
              className='flex flex-col rounded-2xl bg-white shadow-xl'
            >
              <div className='relative flex-1 px-6 pt-16 pb-8 md:px-8'>
                <div className='absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-rose-600 p-5 shadow-lg'>
                  <page.icon
                    className='h-6 w-6 text-white'
                    aria-hidden='true'
                  />
                </div>
                <h3 className='text-xl font-medium text-gray-900'>
                  {page.name}
                </h3>
                <p className='mt-4 text-base text-gray-500'>
                  {page.description}
                </p>
              </div>
              <div className='rounded-bl-2xl rounded-br-2xl bg-gray-50 p-6 md:px-8'>
                <Link
                  href={page.href}
                  className='text-base font-medium text-rose-700 hover:text-rose-600'
                  scroll={false}
                >
                  {page.actionText}
                  <span aria-hidden='true'> &rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
