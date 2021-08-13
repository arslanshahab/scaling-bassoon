import React, { useState } from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import LanguageSwitcher from '../language-switcher'
import { menuLinks } from '../../constants/menuLinks'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { Drawer, Button } from 'antd'

export default function Header() {
  const { t } = useTranslation('common')
  const [showDrawer, setShowDrawer] = useState(false)

  const renderLinksDesktop = () => {
    return (
      <ul className={styles.links}>
        {menuLinks.map(link => {
          return (
            <li key={link.key}>
              <Link href={link.link}>
                <a>{t(`${link.key}.titleCase`)}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderLinksDrawer = () => {
    return (
      <ul className={styles['links-mobile']}>
        {menuLinks.map(link => {
          return (
            <li key={link.key} className={styles['link-mobile']}>
              <Link href={link.link}>
                <a>{t(`${link.key}.titleCase`)}</a>
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
      <div className={styles['links-container']}>{renderLinksDesktop()}</div>
      <LanguageSwitcher />
      <Button
        className={styles['drawer-button']}
        onClick={() => setShowDrawer(!showDrawer)}>
        <span className={styles['drawer-button-content']}></span>
      </Button>
      <Drawer
        title='Menu'
        placement='right'
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}>
        {renderLinksDrawer()}
      </Drawer>
    </div>
  )
}
