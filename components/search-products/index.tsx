import useTranslation from 'next-translate/useTranslation'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './SearchProducts.module.scss'
import { useState } from 'react'

interface IProps {
  searchProducts: (searchText: string, withSearch: boolean) => void
}

function SearchProducts({ searchProducts }: IProps) {
  const { t } = useTranslation('common')
  const [searchText, setSearchText] = useState<string>('')

  const handleKeyDown = (event: any) => {
    if (searchText && event.key.toLowerCase() === 'enter') {
      searchProducts(searchText, searchText !== '')
    }
  }

  const handleSearchInputChange = (event: any) => {
    if (event.target.value === '') {
      searchProducts(searchText, false)
    }
    setSearchText(event.target.value)
  }

  const renderSearchInput = () => {
    return (
      <div className={styles['input-wrapper']}>
        <label htmlFor='searchInput'>{t('searchProducts')}</label>
        <Input
          size='large'
          placeholder='Search'
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
              onClick={() => searchProducts(searchText, searchText !== '')}
            />
          }
        />
      </div>
    )
  }

  return (
    <div className={styles['search-products']}>
      <h1>{t('categories')}</h1>
      {renderSearchInput()}
    </div>
  )
}

export default SearchProducts
