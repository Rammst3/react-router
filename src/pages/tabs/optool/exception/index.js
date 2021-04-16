import React from 'react'
import { translateText } from '@utils/translate'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import { injectIntl } from 'react-intl'
import styles from './index.less'

// 异常处理
const ExceptionHandle = (props) => {
  
  const {intl} = props

  const handleRedirect = (type) => {
    const { history } = props
    if (history) {
      switch(type) {
        case 'outstock':
          history.push('/app/optool/exceptionHandle/outstock')
          break
        case 'sign':
          history.push('/app/optool/exceptionHandle/sign')
          break
        default:
          break
      }
    }
  }

  return (
    <aside className={styles.content}>
      <div className={styles.header}>
        <Breadcrumb />
        <div className={styles.title}>{`${intl.formatMessage({ id: 'Exception Handling' })}`}</div>
      </div>
      <div className={styles.body}>
        <div className={`${styles.card} pointer`} onClick={() => handleRedirect('outstock')}>{`${intl.formatMessage({ id: 'Processe Out of stock' })}`}</div>
        <div className={`${styles.card} pointer`} onClick={() => handleRedirect('sign')}>{`${intl.formatMessage({ id: 'Processe Sign yield' })}`}</div>
      </div>
    </aside>
  )
}

export default injectIntl(ExceptionHandle)