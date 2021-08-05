import React from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'

export default function Header() {
  const renderLinks = () => {
    return (
      <ul className={styles.links}>
        <li>
          <a href=''>Řešení</a>
        </li>
        <li>
          <a href=''>Produkty</a>
        </li>
        <li>
          <a href=''>Značky</a>
        </li>
        <li>
          <a href=''>Ke stažení</a>
        </li>
        <li>
          <a href=''>Události</a>
        </li>
        <li>
          <a href=''>Vzdělání</a>
        </li>
        <li>
          <a href=''>O nás</a>
        </li>
        <li>
          <a href=''>Kontakt</a>
        </li>
      </ul>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt='Winmed logo'
          priority
          width='169px'
          height='82px'
          unoptimized
        />
      </div>
      {renderLinks()}
    </div>
  )
}
