import { Row, Col } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/images/logo-white.png'
import { contactInfo } from '../../constants/contactInfo'
import { menuLinks } from '../../constants/menuLinks'
import { socialMediaLinks } from '../../constants/socialLinks'
import styles from './Footer.module.scss'

function Footer() {
  const { t } = useTranslation('common')

  const renderLinks = () => {
    return (
      <ul>
        {menuLinks.map(menuItem => (
          <li key={menuItem.key}>
            <Link href={menuItem.link}>
              <a>{t(`${menuItem.key}.titleCase`)}</a>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
  const renderContactInfo = () => {
    return Object.entries(contactInfo).map(([key, val]) => {
      return (
        <div className={styles['contact-link']} key={key}>
          <Image
            src={`/icons/${val.icon}.svg`}
            alt={val.title}
            width={24}
            height={24}
            className={styles.icon}
          />
          <a href={val.link}>{val.title}</a>
        </div>
      )
    })
  }
  const renderSocialLinks = () => {
    return (
      <div className={styles['social-icons-wrapper']}>
        {Object.entries(socialMediaLinks).map(([key, val]) => {
          return (
            <div className={styles.socialIcon} key={key}>
              <a href={val.link}>
                <Image
                  src={`/icons/${val.title}.svg`}
                  alt={val.title}
                  width={30}
                  height={30}
                  className={styles.socialIcon}
                />
              </a>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <>
      <div className={styles['footer-wrapper']}>
        <div className={styles.container}>
          <Row gutter={32}>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.logo}>
                <Image
                  src={logo}
                  alt='Winmed Logo'
                  width={169}
                  height={82}
                  priority
                />
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
            </Col>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.menu}>
                <h4>{t('menu')}</h4>
                {renderLinks()}
              </div>
            </Col>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.contact}>
                <h4>{t('contactUs')}</h4>
                {renderContactInfo()}
              </div>
            </Col>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.social}>
                <h4>{t('watchUs')}</h4>
                {renderSocialLinks()}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} Winmed. {t('allRightsReserved')}.
        </p>
      </div>
    </>
  )
}

export default Footer
