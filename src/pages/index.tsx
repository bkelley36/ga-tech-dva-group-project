import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback } from 'react'

import HomePageHeader from '@/components/layout/HomePageHeader'
import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

import exampleImage from '../../public/images/example.png'

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='embla' ref={emblaRef}>
      <div className='embla__container'>
        <div className='embla__slide'>
          <Image src={exampleImage} width={1600} height={900} alt='example' />
        </div>
        <div className='embla__slide'>
          <Image src={exampleImage} width={1600} height={900} alt='example' />
        </div>
        <div className='embla__slide'>
          <Image src={exampleImage} width={1600} height={900} alt='example' />
        </div>
      </div>
      <span className='isolate inline-flex rounded-md shadow-sm'>
        <button
          type='button'
          onClick={scrollPrev}
          className='relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10'
        >
          <span className='sr-only'>Previous</span>
          <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
          <span>Prev</span>
        </button>
        <button
          type='button'
          onClick={scrollNext}
          className='relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10'
        >
          <span className='sr-only'>Next</span>
          <span>Next</span>
          <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </span>
    </div>
  )
}

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <HomePageHeader></HomePageHeader>
      <main id='tool'>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1 className='mt-4'>MET Summary Analytics:</h1>
            <EmblaCarousel></EmblaCarousel>
          </div>
        </section>
      </main>
    </Layout>
  )
}
