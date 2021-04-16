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

  toSystem = () => {
    location.href = '#/app/system'
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
            <h2 className='colorRed'>{`${intl.formatMessage({ id: 'handleLog' })}`}</h2>
            <Button type="primary" onClick={this.toSystem}>去系统配置页面</Button>
          </div>
        </div>
      </aside>
    )
  }
}

export default injectIntl(Logs)