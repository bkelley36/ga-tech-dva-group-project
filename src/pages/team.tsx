import Image from 'next/image'

import Layout from '@/components/layout/Layout'

import brandonImage from '../../public/images/brandon.jpg'

const people = [
  {
    name: 'Brandon',
    role: 'Cleveland, OH',
    image: brandonImage,
    bio: 'Remote Software Engineer in the Insurance Industry with web and mobile development experience. Graduated from Cleveland State University’s college of Engineering with a Bachelor’s of Science in Computer Science. Currently pursing a Master’s in Analytics at Georgia Tech. ',
  },
  // More people...
]

export default function Team() {
  return (
    <Layout>
      <div className='min-h-screen bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Meet our team
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              We’re a group of Georgia Tech. students working together for our
              semester project
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none'
          >
            {people.map((person) => (
              <li key={person.name} className='flex flex-col gap-6 xl:flex-row'>
                <Image
                  className='aspect-[4/5] w-52 flex-none rounded-2xl object-cover'
                  src={person.image}
                  width={208}
                  height={260}
                  alt={`${person.name} image`}
                />
                <div className='flex-auto'>
                  <h3 className='text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                    {person.name}
                  </h3>
                  <p className='text-base leading-7 text-gray-600'>
                    {person.role}
                  </p>
                  <p className='mt-6 text-base leading-7 text-gray-600'>
                    {person.bio}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
