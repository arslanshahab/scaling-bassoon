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
        <div className={styles.contactLink} key={key}>
          <val.icon />
          <a href={val.link}>{val.title}</a>
        </div>
      )
    })
  }
  const renderSocialLinks = () => {
    return (
      <div className={styles.socialIconsWrapper}>
        {Object.entries(socialMediaLinks).map(([key, val]) => {
          return (
            <div className={styles.socialIcon} key={key}>
              <a href={val.link}>
                <Image
                  src={`/icons/${val.title}.svg`}
                  alt='Flag'
                  priority
                  width='30px'
                  height='30px'
                  className={styles.flag}
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
      <div className={styles.footerWrapper}>
        <div className={styles.container}>
          <Row gutter={32}>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.logo}>
                <Image src={logo} alt='Winmed Logo' />
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
              </div>
            </Col>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.menu}>
                <h4>Menu</h4>
                {renderLinks()}
              </div>
            </Col>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.contact}>
                <h4>Kontaktujte nás</h4>
                {renderContactInfo()}
              </div>
            </Col>
            <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className={styles.social}>
                <h4>Sledujte nás</h4>
                {renderSocialLinks()}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© 2021 Winmed. Všechna práva vyhrazena.</p>
      </div>
    </>
  )
}

export default Footer
