import * as React from 'react'

import Footer from '@/components/layout/Footer'
import NavBar from '@/components/layout/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar></NavBar>
      {children}
      <Footer></Footer>
    </>
  )
}
