import React from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import LanguageSwitcher from '../language-switcher'
import { links } from './links'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()

  const renderLinks = () => {
    return (
      <ul className={styles.links}>
        {links.map(link => {
          return (
            <li key={link.key}>
              <Link href={link.link}>
                <a>{t(link.key)}</a>
              </Link>
            </li>
          )
        })}
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
      <LanguageSwitcher />
    </div>
  )
}
