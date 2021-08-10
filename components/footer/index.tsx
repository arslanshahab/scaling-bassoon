import { Row, Col } from 'antd'
import Image from 'next/image'
import logo from '../../assets/images/logo-white.png'
import { contactInfo, menuLinks } from '../../data'
import styles from './Footer.module.scss'

function Footer() {
  const renderLinks = () => {
    return (
      <ul>
        {menuLinks.map(menuItem => (
          <li key={menuItem.title}>
            <a href={menuItem.link}>{menuItem.title}</a>
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
  return (
    <div className={styles.footerWrapper}>
      <Row>
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
          <div className={styles.social}>{/* social links goes here */}</div>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
