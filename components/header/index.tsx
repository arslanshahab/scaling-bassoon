import React, { useState } from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import LanguageSwitcher from '../language-switcher'
import { menuLinks } from '../../constants/menuLinks'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { Drawer, Button } from 'antd'
import { useRouter } from 'next/router'

export default function Header() {
  const { t } = useTranslation('common')
  const [showDrawer, setShowDrawer] = useState(false)
  const router = useRouter()

  const renderLinksDesktop = () => {
    return (
      <ul className={styles.links}>
        {menuLinks.map(link => {
          return (
            <li key={link.key}>
              <Link href={link.link}>
                <a
                  className={router.pathname == link.link ? 'active-link' : ''}>
                  {t(`${link.key}.titleCase`)}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  const onClickMobileLink = (link: string) => {
    setShowDrawer(false)
    router.push(link, link)
  }

  const renderLinksDrawer = () => {
    const menuLinksWithHome = [{ key: 'home', link: '/' }, ...menuLinks]

    return (
      <ul className={styles['links-mobile']}>
        {menuLinksWithHome.map(link => {
          return (
            <li
              key={link.key}
              className={styles['link-mobile']}
              onClick={() => onClickMobileLink(link.link)}>
              <p className={router.pathname == link.link ? 'active-link' : ''}>
                {t(`${link.key}.titleCase`)}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={styles.container}>
      <Link href={'/'}>
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
      </Link>
      <div className={styles['links-container']}>{renderLinksDesktop()}</div>
      <LanguageSwitcher />
      <Button
        className={styles['drawer-button']}
        onClick={() => setShowDrawer(!showDrawer)}>
        <span className={styles['drawer-button-content']}></span>
      </Button>
      <Drawer
        title={t('menu')}
        placement='right'
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}>
        {renderLinksDrawer()}
      </Drawer>
    </div>
  )
}
