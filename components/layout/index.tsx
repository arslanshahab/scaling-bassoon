import React from 'react'
import dynamic from 'next/dynamic'
import Header from '../header'
const Footer = dynamic(() => import('../footer'))

export default function Layout(props: any) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
