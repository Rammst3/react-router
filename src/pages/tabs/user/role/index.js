import React, { PureComponent } from 'react'
import { Button } from 'antd'
import { injectIntl } from 'react-intl'
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
          title: `${intl.formatMessage({ id: 'name' })}`,
          dataIndex: 'name',
          width: 100,
          render: (text) => text ? text : 0
        },
        {
          title: `${intl.formatMessage({ id: 'perms' })}`,
          dataIndex: 'perms',
          width: 200,
        },
        {
          title: `${intl.formatMessage({ id: 'creator' })}`,
          dataIndex: 'creator',
          width: 100,
        },
        {
          title: `${intl.formatMessage({ id: 'createTime' })}`,
          dataIndex: 'createTime',
          width: 200,
          render(text) {
            return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''
          }
        },
        {
          title: `${intl.formatMessage({ id: 'action' })}`,
          dataIndex: 'action',
          render: () => <a onClick={() => { }}>{`${intl.formatMessage({ id: 'delete' })}`}</a>,
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
      leftTopNode: <Button key='add' type="primary" onClick={(e) => this.handleAdd(e)}>{`${intl.formatMessage({ id: 'add' })}`}</Button>
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