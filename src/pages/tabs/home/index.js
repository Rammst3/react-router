import React from 'react'
import { injectIntl } from 'react-intl'
import utils from '@utils'
import styles from './index.less'

const Home = (props) => {

  return (
    <aside className={styles.content}>
      <div className={'middle ph100'}>
        <h2 className='colorRed'>{utils.translateText({ id : 'welcome to use'})}</h2>
      </div>
    </aside>
  )
}

export default Home