import Head from 'next/head'
import { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Pagination, Table } from 'antd'
import Image from 'next/image'
import Layout from '../../components/layout'
import { http } from '../../utils/http'
import { Attachment } from '../../models/Attachment'
import styles from './../../styles/Downloads.module.scss'
import { mapAttachmentPropertiesToCamelCase } from '../../utils/mappings'
import SearchAttachments from '../../components/search-attachments'

const perpage = 15
const baseURL = `/api/v1/products/get-all-attachments?paginate=1&perpage=${perpage}`

interface ICurrentURL {
  url: string
  isSearch: boolean
}

export default function Downloads() {
  const { t, lang } = useTranslation('common')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [paginationInfo, setPaginationInfo] = useState<any>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentURL, setCurrentURL] = useState<ICurrentURL>({
    url: baseURL,
    isSearch: false,
  })

  const columns = [
    {
      title: t('fileName'),
      dataIndex: 'attachmentName',
      key: 'attachmentName',
      width: '60%',
    },
    {
      title: t('fileSize'),
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: '25%',
    },
    {
      title: t('download'),
      dataIndex: 'attachmentUrl',
      key: 'attachmentUrl',
      width: '15%',
      render: (text: string) => {
        return renderDownloadIcon(text)
      },
    },
  ]

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await loadMoreAttachments(
          currentURL.url,
          false,
          currentPage
        )
        const { items } = response.data?.data || []
        const paginationInfo = response.data?.data?.pagination
        if (items?.length > 0) {
          const attachments = mapAttachmentPropertiesToCamelCase(items)
          setAttachments(attachments)
          setPaginationInfo(paginationInfo)
        } else {
          setAttachments([])
          setPaginationInfo(null)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducts()
  }, [lang, currentURL, currentPage])

  // default function to fetch attachments, made it separate to handle pagination and avoid conflicts on language switching
  const loadMoreAttachments = async (
    url: string,
    isPaginatedRequest: boolean,
    pageNumber?: number
  ) => {
    const response = await http.get(
      `${url}&page=${pageNumber || currentPage}`,
      {
        headers: {
          'Content-Language': lang,
        },
      }
    )
    if (isPaginatedRequest) {
      const { items } = response.data?.data || []
      const paginationInfo = response.data?.data?.pagination
      if (items?.length > 0) {
        const attachments = mapAttachmentPropertiesToCamelCase(items)
        setAttachments(attachments)
        setPaginationInfo(paginationInfo)
      } else {
        setAttachments([])
        setPaginationInfo(null)
      }
    }

    return response
  }

  const searchAttachments = (searchText: string, withSearch: boolean) => {
    if (withSearch) {
      setCurrentURL({
        url: `${baseURL}&search=${searchText}`,
        isSearch: true,
      })
    } else {
      setCurrentURL({
        url: baseURL,
        isSearch: true,
      })
    }
  }

  const renderDownloadIcon = (url: string) => {
    return (
      <div className={styles['icon-download']}>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
          download
          rel='noreferrer'
          target='_blank'>
          <Image
            src={`/icons/download-white.svg`}
            alt='download attachment'
            width={12}
            height={12}
            className={styles.image}
          />
        </a>
      </div>
    )
  }

  const renderPagination = () => {
    return (
      <Pagination
        defaultCurrent={1}
        pageSize={perpage}
        total={paginationInfo?.total}
        defaultPageSize={perpage}
        onChange={(pageNumber: number) => setCurrentPage(pageNumber)}
      />
    )
  }

  return (
    <div>
      <Head>
        <title>{`Winmed - ${t('download')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles.container}>
          <div className={styles.header}>
            <SearchAttachments searchAttachments={searchAttachments} />
          </div>
          <div className={styles['table-wrapper']}>
            <h4>{t('fileListing')}</h4>
            <Table
              columns={columns}
              dataSource={attachments!}
              pagination={false}
              className={styles['table-downloads']}
            />
            <div className={styles['pagination-wrapper']}>
              {paginationInfo && renderPagination()}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
