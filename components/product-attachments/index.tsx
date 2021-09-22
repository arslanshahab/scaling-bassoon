import React from 'react'
import styles from './ProductAttachments.module.scss'
import { Attachment } from '../../models/Product'
import Image from 'next/image'

interface IProps {
  attachments: Attachment[]
}

function ProductAttachments(props: IProps) {
  const renderAttachment = (attachment: Attachment, index: number) => {
    return (
      <div className={styles['attachment-item']} key={index}>
        <div className={styles.icon}>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}${attachment.attachmentUrl}`}
            download={attachment.attachmentName}
            rel='noreferrer'
            target='_blank'>
            <Image
              src={`/icons/download.svg`}
              alt='download attachment'
              width={25}
              height={25}
              className={styles.image}
            />
          </a>
        </div>
        <span>{attachment.attachmentName}</span>
      </div>
    )
  }

  return (
    <div className={styles['attachments-wrapper']}>
      {props.attachments?.map((attachment: Attachment, index: number) =>
        renderAttachment(attachment, index)
      )}
    </div>
  )
}

export default ProductAttachments
