import * as React from 'react'

import Layout from '@/components/layout/Layout'
import ArrowLink from '@/components/links/ArrowLink'
import ButtonLink from '@/components/links/ButtonLink'
import UnderlineLink from '@/components/links/UnderlineLink'
import UnstyledLink from '@/components/links/UnstyledLink'
import Seo from '@/components/Seo'

import Vercel from '~/svg/Vercel.svg'

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1 className='mt-4'>GA DVA MET Project</h1>
          </div>
        </section>
      </main>
    </Layout>
  )
}
