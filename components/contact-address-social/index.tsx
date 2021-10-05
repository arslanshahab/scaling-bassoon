import React from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { contactInfo } from '../../constants/contactInfo'
import { socialMediaLinks } from '../../constants/socialLinks'
import styles from './ContactAddressSocialLinks.module.scss'

function ContactAddressSocialLinks() {
  const { t } = useTranslation('common')

  const renderContactInfo = () => {
    return Object.entries(contactInfo).map(([key, val]) => {
      return (
        <div className={styles['contact-info-link']} key={key}>
          <Image
            src={`/icons/${val.icon}.svg`}
            alt={val.title}
            width={24}
            height={24}
            className={styles.icon}
          />
          <a href={val.link} dangerouslySetInnerHTML={{ __html: val.title }} />
        </div>
      )
    })
  }
  const renderSocialLinks = () => {
    return (
      <div className={styles['social-wrapper']}>
        <h5 className={styles['page-title']}>{t('followSocial')}</h5>
        <div className={styles['social-icons']}>
          {Object.entries(socialMediaLinks).map(([key, val]) => {
            return (
              <div className={styles['social-icon']} key={key}>
                <a href={val.link}>
                  <Image
                    src={`/icons/${val.title}.svg`}
                    alt={val.title}
                    width={30}
                    height={30}
                    className={styles['social-icon']}
                  />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className={styles['contact-links-wrapper']}>
      <h2 className={styles['page-title']}>{t('contact.titleCase')}</h2>
      {renderContactInfo()}
      {renderSocialLinks()}
    </div>
  )
}

export default ContactAddressSocialLinks
