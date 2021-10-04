import useTranslation from 'next-translate/useTranslation'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './SearchAttachments.module.scss'
import { useState } from 'react'

interface IProps {
  searchAttachments: (searchText: string, withSearch: boolean) => void
}

function SearchAttachments({ searchAttachments }: IProps) {
  const { t } = useTranslation('common')
  const [searchText, setSearchText] = useState<string>('')

  const handleKeyDown = (event: any) => {
    if (searchText && event.key.toLowerCase() === 'enter') {
      searchAttachments(searchText, searchText !== '')
    }
  }

  const handleSearchInputChange = (event: any) => {
    if (event.target.value === '') {
      searchAttachments(searchText, false)
    }
    setSearchText(event.target.value)
  }

  const renderSearchInput = () => {
    return (
      <div className={styles['input-wrapper']}>
        <label htmlFor='searchInput'>{t('searchAttachments')}</label>
        <Input
          size='large'
          placeholder={t('search')}
          name='searchInput'
          id='searchInput'
          value={searchText}
          onKeyPress={handleKeyDown}
          onChange={handleSearchInputChange}
          prefix={
            <SearchOutlined
              width={40}
              height={40}
              style={{ fontSize: '24px' }}
              onClick={() => searchAttachments(searchText, searchText !== '')}
            />
          }
        />
      </div>
    )
  }

  return (
    <div className={styles['search-attachments']}>
      <h1 className={styles['page-title']}>{t('filesForDownloads')}</h1>
      {renderSearchInput()}
    </div>
  )
}

export default SearchAttachments
