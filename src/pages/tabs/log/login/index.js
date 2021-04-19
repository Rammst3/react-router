import React, { PureComponent } from 'react'
import { Button } from 'antd'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import utils from '@utils'
import { injectIntl } from 'react-intl'
import styles from './index.less'

class Logs extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const {intl} = this.props
    return (
      <aside className={styles.content}>
        <div className={styles.body}>
          <div className={styles.bread}>
            <Breadcrumb />
          </div>
          <div className={styles.title}>
            <h2 className='colorRed'>{utils.translateText({ id : 'loginLog'})}</h2>
          </div>
        </div>
      </aside>
    )
  }
}

export default injectIntl(Logs)