import React, { PureComponent } from 'react'
import { Button } from 'antd'
import { injectIntl } from 'react-intl'
import utils from '@utils'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import TableBlock from '@components/table/TableBlock'
import SearchFormClass from './searchForm'
import styles from './index.less'

class User extends PureComponent {
  constructor(props) {
    super(props)
    const { intl } = props
    this.state = {
      columns: [
        {
          title: utils.translateText({ id: 'createTime' }),
          dataIndex: 'createTime',
          width: 200,
          sorter: (a, b) => a.createTime - b.createTime,
          render(text) {
            return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''
          }
        },
        {
          title: utils.translateText({ id: 'name' }),
          dataIndex: 'name',
          width: 100,
          render: (text) => text ? text : 0
        },
        {
          title: utils.translateText({ id: 'type' }),
          dataIndex: 'type',
          width: 100,
        },
        {
          title: utils.translateText({ id: 'code' }),
          dataIndex: 'supplierUuid',
          width: 100,
        },
        {
          title: utils.translateText({ id: 'action' }),
          dataIndex: 'action',
          render: () => <a onClick={() => {}}>{utils.translateText({ id : 'delete'})}</a>,
        },
      ],
      data: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchFlag: false
    }
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

  handleReaultCB = ({ loading, data, pagination }) => {
    if (loading !== undefined) {
      this.setState({ loading })
    }
    if (data !== undefined) {
      this.setState({ data, pagination })
    }
  }

  exportData = (e) => {
    const { data, columns } = this.state
    utils.exportPageData(data, columns, '用户管理')
  }

  download = (e) => {
    const url = "assets/img/loading.gif"
    const filename = "loading.gif"
    utils.downloadFileByUrl(url,filename)
  }


  render() {
    const { data, columns, loading, pagination } = this.state
    const {intl} = this.props
    const formProps = {
      loading,
      onResultCB: this.handleReaultCB,
      ...pagination,
    }

    const tableBlockProps = {
      tableProps: {
        dataSource: data,
        columns,
        loading,
      },
      paginationProps: pagination,
      searchCB: this.handleSearch,
      leftTopNode: [<Button key='export' type="primary" onClick={(e) => this.exportData(e)}>{utils.translateText({ id : 'exportCurrentPage'})}</Button> , <Button key='download' type="primary" onClick={(e) => this.download(e)}>{utils.translateText({ id : 'downloadFile'})}</Button>]
    }

    return (
      <aside className={styles.content}>
        <div className={styles.body}>
          <div className={styles.bread}>
            <Breadcrumb />
          </div>
          <SearchFormClass { ...formProps } />
          <hr />
          <TableBlock { ...tableBlockProps } />
        </div>
      </aside>
    )
  }
}

export default injectIntl(User)