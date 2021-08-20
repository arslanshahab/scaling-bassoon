import useTranslation from 'next-translate/useTranslation'
import { Row, Col } from 'antd'
import { useState } from 'react'
import Image from 'next/image'
import Checkbox from '../common/checkbox'
import styles from './References.module.scss'
import { referencesFilters, referencesList } from '../../constants/references'
import { sortArrayAlphabetically } from '../../utils/common-functions'

function ReferencesSection() {
  const [categoryFilters, setCategoryFilters] = useState(referencesFilters)
  const [references, setReferences] = useState(
    sortArrayAlphabetically(referencesList, 'title')
  )

  const { t } = useTranslation('common')

  const handleFilterChange = (event: any, index: any) => {
    const updatedFilters = [...categoryFilters]
    updatedFilters[index].isChecked = event.target.checked
    setCategoryFilters(updatedFilters)
    filterReferences(updatedFilters[index].categoryId, event.target.checked)
  }

  const filterReferences = (categoryId: any, checked: boolean) => {
    if (checked) {
      const filteredReferences = referencesList.filter(
        x => x.categoryId === categoryId
      )
      setReferences(
        sortArrayAlphabetically([...references, ...filteredReferences], 'title')
      )
    } else {
      const filteredReferences = references.filter(
        x => x.categoryId !== categoryId
      )
      setReferences(sortArrayAlphabetically(filteredReferences, 'title'))
    }
  }

  const renderFilters = () => {
    return (
      <div className={styles['reference-filters']}>
        <Row gutter={32}>
          {categoryFilters.map((filter, index) => (
            <Col
              span={6}
              xs={{ span: 12 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              key={index}>
              <Checkbox
                onChange={handleFilterChange}
                labelText={filter.title}
                categoryId={filter.categoryId}
                index={index}
                checked={filter.isChecked}
              />
            </Col>
          ))}
        </Row>
      </div>
    )
  }

  const renderReferenceCards = () => {
    return (
      <div className={styles['reference-cards']}>
        <Row gutter={32}>
          {references.map((reference, index) => (
            <Col
              span={24}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              key={index}>
              <div className={styles.card}>
                <Row gutter={{ sm: 16, md: 16, lg: 32 }}>
                  <Col
                    span={12}
                    xs={{ span: 12 }}
                    md={{ span: 8 }}
                    lg={{ span: 8 }}>
                    <Image
                      src={reference.image}
                      alt={reference.title}
                      objectFit='cover'
                    />
                  </Col>
                  <Col
                    span={24}
                    xs={{ span: 24 }}
                    md={{ span: 16 }}
                    lg={{ span: 16 }}>
                    <h4>{t(reference.title)}</h4>
                    <p>{t(reference.description).substr(0, 100)}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  }

  return (
    <div className={styles['references-section']}>
      <div className={styles.container}>
        <h2>{t('reference')}</h2>
        {renderFilters()}
        {renderReferenceCards()}
      </div>
    </div>
  )
}

export default ReferencesSection
