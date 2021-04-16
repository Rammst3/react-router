import React, { useState } from 'react'
import { Button, Form, Modal } from 'antd'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import LimitTextArea from '@components/input/LimitTextArea'
import utils from '@utils'
import { injectIntl } from 'react-intl'
import styles from './index.less'

const FormItem = Form.Item

// 缺货率处理
const OutOfStock = (props) => {
  const {intl} = props
  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        const { nos } = values
        const data = nos.replace(/\n/g, ',')
        Modal.confirm({
          title: `${intl.formatMessage({ id: 'remind' })}`,
          content: `${intl.formatMessage({ id: 'stock modal content' })}`,
          okText: `${intl.formatMessage({ id: 'modal confirm' })}`,
          cancelText: `${intl.formatMessage({ id: 'modal cancel' })}`,
          onOk: () => { handleRequest(data) }
        })
      }
    })
  }

  const handleRequest = (values) => {
    const data = { purchaseOrderUuids: values }
    axios.post('/manager/operation_tools/oos_rate/exception_process', JSON.stringify(data))
    .then(resp => {
      utils.showMessageSuccess(`${intl.formatMessage({ id: 'opSuccess' })}`)
    })
    .catch(err => {
      utils.showModalError(`${intl.formatMessage({ id: 'opFail' })}`, err)
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <aside className={styles.content}>
      <div className={styles.header}>
        <Breadcrumb />
        <div className={styles.title}>{`${intl.formatMessage({ id: 'Processe Out of stock' })}`}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.input_con}>
          <Form>
            <FormItem>
              {
                getFieldDecorator("nos", {
                  rules: [{ required: true, whitespace: true, message: `${intl.formatMessage({ id: 'purchaseInput' })}` }],
                })(
                <LimitTextArea 
                  autoSize={{ minRows: 18, maxRows: 25 }}
                  sep={'\n'}
                  maxLength={100}
                  placeholder={`${intl.formatMessage({ id: 'purchasePerLine' })}`} />)
              }
            </FormItem>
            <FormItem>
              <Button 
                type="primary" 
                htmlType="submit" 
                onClick={(e) => handleSubmit(e)}>
                  {`${intl.formatMessage({ id: 'confirmStock' })}`}
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={styles.text_con}>
          <p className={styles.info}>1.{`${intl.formatMessage({ id: 'per at a time' })}`}</p>
          <p className={styles.info}>2.{`${intl.formatMessage({ id: 'funcFit' })}`}</p>
          <p className={styles.info}>3.{`${intl.formatMessage({ id: 'carefullyUse' })}`}</p>
        </div>
      </div>
    </aside>
  )
}

export default Form.create()(injectIntl(OutOfStock))