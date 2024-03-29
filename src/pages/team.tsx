import Image from 'next/image'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

import AlexImage from '../../public/images/Alex.jpg'
import brandonImage from '../../public/images/brandon.jpg'
import ColeImage from '../../public/images/ColeAndBern.jpg'
import DanImage from '../../public/images/dan.jpg'
import DanielImage from '../../public/images/daniel.jpg'
import ParamaImage from '../../public/images/Parama.jpg'

const people = [
    {
    name: 'Alex',
    location: 'Madison, WI',
    image: AlexImage,
    bio: 'Analytics Consultant for a major hospital. Graduated from Luther College with a degree in Mathematics and Secondary Education. Currently pursing a Master’s in Analytics at Georgia Tech. Enjoys travel, gaming, and spending time outdoors.',
  },
  
  {
    name: 'Brandon',
    location: 'Cleveland, OH',
    image: brandonImage,
    bio: 'Remote Software Engineer in the Insurance Industry with web and mobile development experience. Graduated from Cleveland State University’s college of Engineering with a Bachelor’s of Science in Computer Science. Currently pursing a Master’s in Analytics at Georgia Tech. ',
  },

  {
    name: 'Cole',
    location: 'Pittsburgh, PA',
    image: ColeImage,
    bio: 'Data Analyst at a healthcare start up during the week and adventuring vagabond on the weekends. Former Peace Corps volunteer in Mozambique and graduate of Michigan State University who is currently setting up shop in Pittsburgh while also working through OMSA at Georgia Tech.',
  },
  {
    name: 'Dan',
    location: 'New York, NY',
    image: DanImage,
    bio: 'Solutions Architect in the Cloud Services industry.  Graduated from St. Joseph\'s College with a B.S. Computer Science/Math.  Currently an OMSA student at Georgia Tech.',
  },
  {
    name: 'Daniel',
    location: 'Madison, WI',
    image: DanielImage,
    bio: 'Quality Control Analyst in a Microbiology laboratory. Graduated with a Bachelor of Science degree in Environmental Science from The University of Wisconsin – Madison. When not grinding through OMSA; enjoys biking, fishing, and hiking.',
  },
  {
    name: 'Parama',
    location: 'Kansas City, Kansas',
    image: ParamaImage,
    bio: 'Senior Business Intelligence Analyst in the retail sector. Certified Scrum Master, Mechanical Engineering graduate and MBA. Currently pursuing a Master’s in Analytics from Georgia Tech. Enjoys rock climbing, hiking, and reading in spare time.',
  },
]

export default function Team() {
  return (
    <Layout>
      <Seo templateTitle='Team' />
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
            location='list'
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
                  priority
                />
                <div className='flex-auto'>
                  <h3 className='text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                    {person.name}
                  </h3>
                  <p className='text-base leading-7 text-gray-600'>
                    {person.location}
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
