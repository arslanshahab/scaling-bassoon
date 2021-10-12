import React, { useEffect, useState } from 'react'
import { Form, Input, Spin } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import styles from './ContactForm.module.scss'
import Button from './../common/button'
import { contactFormFields, IContactField } from '../../constants/contactForm'
import { http } from '../../utils/http'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useRouter } from 'next/router'

interface IRequestBody {
  'name': string
  'email': string
  'phone': string
  'message': string
  'product_info': string | string[] | undefined // not using camelCase because API request body expects product_info
  'g-recaptcha-response': string // not using camelCase because API request body expects g-recaptcha-response
}

function ContactForm() {
  const { t, lang } = useTranslation('common')
  const [productInfo, setProductInfo] = useState<
    string | string[] | undefined
  >()
  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [dynamicAction] = useState('homepage')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setProductInfo(router.query?.id)
  }, [router.query?.id])

  useEffect(() => {
    if (!executeRecaptcha || !dynamicAction) {
      return
    }

    const handleReCaptchaVerify = async () => {
      await executeRecaptcha(dynamicAction)
    }

    handleReCaptchaVerify()
  }, [executeRecaptcha, dynamicAction])

  const renderRulesConfig = (field: any) => {
    return [
      {
        ...field,
        message: t(`${field.message!}`),
      },
    ]
  }
  const renderFormConfig = () => {
    return {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
      initialValues: {
        remember: false,
      },
      onFinish: onFinish,
      autoComplete: 'off',
    }
  }
  const renderFormField = (field: IContactField, index: number) => {
    return (
      <Form.Item
        key={index}
        label={t(`${field.name}`)}
        name={field.name}
        hidden={field.hidden}
        rules={renderRulesConfig(field)}>
        {field.type === 'any' ? <Input.TextArea rows={4} /> : <Input />}
      </Form.Item>
    )
  }

  const onFinish = async (values: IRequestBody) => {
    if (!executeRecaptcha) {
      return
    }
    setLoading(true)
    const token = await executeRecaptcha('dynamicAction')

    values.product_info = productInfo
    values['g-recaptcha-response'] = token
    http
      .post(`/api/v1/contact-us-form`, values, {
        headers: {
          'Content-Language': lang,
        },
      })
      .then(() => {
        alert(t('contactThankyou'))
        setLoading(false)
      })
      .catch((err: any) => {
        alert(t('sendingFailed'))
        setLoading(false)
        console.error('API response error', err)
      })
  }

  return (
    <div className={styles['contact-form']}>
      <h3>{t('writeMessage')}</h3>
      <Form name='basic' {...renderFormConfig()}>
        {contactFormFields.map((field, index) => renderFormField(field, index))}
        <p className={styles.tnc}>
          {t('tncMessage')} <a>{t('termsConditions')}</a>
        </p>
        <Form.Item>
          {loading ? (
            <Button variant='regular' size='md' fullWidth={false}>
              <Spin /> {`${t('contact.submitLoading')}...`}
            </Button>
          ) : (
            <Button fullWidth={false} size='md' variant='regular' type='submit'>
              {t('contactUs')}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactForm
