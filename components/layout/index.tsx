import React from 'react'
import Footer from '../footer'
import Header from '../header'

export default function Layout(props: any) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
