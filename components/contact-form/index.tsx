import React from 'react'
import { Form, Input } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import styles from './ContactForm.module.scss'
import Button from './../common/button'
import { contactFormFields } from '../../constants/contactForm'

function ContactForm() {
  const { t } = useTranslation('common')

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
      onFinishFailed: onFinishFailed,
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

  const onFinish = () => null
  const onFinishFailed = () => null
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
            variant='regular'>
            {t('contactUs')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactForm
