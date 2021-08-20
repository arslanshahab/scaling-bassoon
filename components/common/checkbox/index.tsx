import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import styles from './Checkbox.module.scss'

interface IProps {
  onChange: (e: any, index: any) => void
  labelText: string
  categoryId: any
  checked: boolean
  index: any
}

function Checkbox(props: IProps) {
  const { t } = useTranslation('common')
  return (
    <div className={styles.checkbox}>
      <input
        type='checkbox'
        id='checkobx'
        hidden={false}
        checked={props.checked}
        className={styles['main-checkbox']}
        onChange={e => props.onChange(e, props.index)}
      />
      <div className={styles['custom-checkbox']}>
        {props.checked && (
          <Image
            src={`/icons/check.svg`}
            alt='checked'
            width={60}
            height={60}
          />
        )}
      </div>
      <label htmlFor='checkbox'>{t(props.labelText)}</label>
    </div>
  )
}

export default Checkbox
