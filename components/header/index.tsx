import React from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import { menuLinks } from '../../data'

export default function Header() {
  const renderLinks = () => {
    return (
      <ul className={styles.links}>
        {menuLinks.map(menuItem => (
          <li key={menuItem.title}>
            <a href={menuItem.link}>{menuItem.title}</a>
          </li>
        ))}
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
