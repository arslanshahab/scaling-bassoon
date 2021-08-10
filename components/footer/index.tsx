import { Row, Col } from 'antd'
import Image from 'next/image'
import logo from '../../assets/images/logo-white.png'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <Row>
        <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <div className={styles.logo}>
            <Image src={logo} alt='Winmed Logo' />
          </div>
        </Col>
        <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <div className={styles.menu}>{/* menu goes here */}</div>
        </Col>
        <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <div className={styles.contact}>{/* contact info goes here */}</div>
        </Col>
        <Col span={6} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <div className={styles.social}>{/* social links goes here */}</div>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
