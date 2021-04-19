import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { VirtualTable } from 'ant-virtual-table'
import styles from './index.less'

const Virtual = () => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Borrow',
      dataIndex: 'borrow',
    },
    {
      title: 'Repayment',
      dataIndex: 'repayment',
    }
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      borrow: 10,
      repayment: 33,
    },
    {
      key: '2',
      name: 'Jim Green',
      borrow: 100,
      repayment: 0,
    },
    {
      key: '3',
      name: 'Joe Black',
      borrow: 10,
      repayment: 10,
    },
    {
      key: '4',
      name: 'Jim Red',
      borrow: 75,
      repayment: 45,
    },
  ]

  return (
    <aside className={styles.content}>
      <div className={styles.body}>
        <div className={styles.block}>
          <div className={styles.blick_item}>
            <div className={styles.title}>虚拟表格（展示大数据，暂不支持复杂表格结构，
              <a href="https://github.com/ctq123/ant-virtual-table">更多详情</a>）</div>
            <hr />
            <div className={styles.circles}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                rowKey='key'
                scroll={{ y: 400 }}
                summary={
                  pageData => {
                    let totalBorrow = 0;
                    let totalRepayment = 0;
                    pageData.forEach(({ borrow, repayment }) => {
                      totalBorrow += borrow;
                      totalRepayment += repayment;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell>Total</Table.Summary.Cell>
                          <Table.Summary.Cell>
                            {totalBorrow}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            {totalRepayment}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                          <Table.Summary.Cell>Balance</Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={2}>
                            {totalBorrow - totalRepayment}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    )
                  }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Virtual