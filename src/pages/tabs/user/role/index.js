import React, { PureComponent } from 'react'
import { Button } from 'antd'
import { injectIntl } from 'react-intl'
import utils from '@utils'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import TableBlock from '@components/table/TableBlock'
import SearchForm from './SearchForm'
import styles from './index.less'

class Role extends PureComponent {
  constructor(props) {
    super(props)
    const { intl } = props
    this.state = {
      columns: [
        {
          title: utils.translateText({ id: 'name' }),
          dataIndex: 'name',
          width: 100,
          render: (text) => text ? text : 0
        },
        {
          title: utils.translateText({ id: 'perms' }),
          dataIndex: 'perms',
          width: 200,
        },
        {
          title: utils.translateText({ id: 'creator' }),
          dataIndex: 'creator',
          width: 100,
        },
        {
          title: utils.translateText({ id: 'createTime' }),
          dataIndex: 'createTime',
          width: 200,
          render(text) {
            return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''
          }
        },
        {
          title: utils.translateText({ id: 'action' }),
          dataIndex: 'action',
          render: () => <a onClick={() => { }}>{utils.translateText({ id: 'delete' })}</a>,
        },
      ],
      list: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchFlag: false
    }
  }

  handleResultCB = ({ loading, list, total, current }) => {
    if (loading !== undefined) {
      this.setState({
        loading
      })
    }
    if (list !== undefined) 
    this.setState({
      list
    })
    if (total !== undefined) 
    this.setState({
      pagination: {
        current: current,
        pageSize: this.state.pagination.pageSize,
        total: total,
      }
    })
  }

  handleSearch = ({ current, pageSize }) => {
    this.setState({
      pagination: {
        current: current,
        pageSize: pageSize,
        total: this.state.pagination.total,
        searchFlag: !this.state.searchFlag
      }
    })
  }

  handleAdd = (e) => {
    console.log('click add')
  }
  render() {
    let {list,columns,loading,pagination} = this.state
    const {intl} = this.props
    const searchProps = {
      loading,
      onResultCB: this.handleResultCB,
      ...pagination,
    }

    const tableBlockProps = {
      tableProps: {
        dataSource: list,
        columns,
        loading,
      },
      paginationProps: pagination,
      searchCB: this.handleSearch,
      showBottomBlock: true,
      leftTopNode: <Button key='add' type="primary" onClick={(e) => this.handleAdd(e)}>{utils.translateText({ id: 'add' })}</Button>
    }
    return (
      <aside className={styles.content} >
        <div className={styles.body}>
          <div className={styles.bread}>
            <Breadcrumb />
          </div>
          <SearchForm {...searchProps} />
          <hr />
          <TableBlock {...tableBlockProps} />
        </div>
      </aside>
    )
  }
}

export default injectIntl(Role)