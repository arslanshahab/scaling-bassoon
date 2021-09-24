import React from 'react'
import { Form, Input } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import styles from './ContactForm.module.scss'
import Button from './../common/button'
import { contactFormFields } from '../../constants/contactForm'
import { http } from '../../utils/http'

interface IRequestBody {
  name: string
  email: string
  phone: string
  message: string
}

function ContactForm() {
  const { t, lang } = useTranslation('common')

  const renderRulesConfig = (message: string) => {
    return [
      {
        required: true,
        message,
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
  const renderFormField = (field: any, index: number) => {
    return (
      <Form.Item
        key={index}
        label={t(`${field.name}`)}
        name={field.name}
        rules={field.required ? renderRulesConfig(field.message!) : []}>
        {field.type === 'textarea' ? <Input.TextArea rows={4} /> : <Input />}
      </Form.Item>
    )
  }

  const onFinish = (values: IRequestBody) => {
    http
      .post(`/api/v1/contact-us-form`, values, {
        headers: {
          'Content-Language': lang,
        },
      })
      .then(() => {
        alert(t('contactThankyou'))
      })
      .catch((err: any) => {
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
          <Button
            fullWidth={false}
            onClick={() => {}}
            size='md'
            variant='regular'
            type='submit'>
            {t('contactUs')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactForm
