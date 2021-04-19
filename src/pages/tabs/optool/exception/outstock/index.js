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
  const { intl } = props
  const [form] = Form.useForm()
  const handleSubmit = (e) => {
    const data = form.getFieldValue('nos') == undefined ? '' : form.getFieldValue('nos').replace(/\n/g, ',')
    if (data) {
      Modal.confirm({
        title: utils.translateText({ id: 'remind' }),
        content: utils.translateText({ id: 'stock modal content' }),
        okText: utils.translateText({ id: 'modal confirm' }),
        cancelText: utils.translateText({ id: 'modal cancel' }),
        onOk: () => { handleRequest(data) }
      })
    }
  }

  const handleRequest = (values) => {
    const data = { purchaseOrderUuids: values }
    axios.post('/manager/operation_tools/oos_rate/exception_process', JSON.stringify(data))
      .then(resp => {
        utils.showMessageSuccess(utils.translateText({ id: 'opSuccess' }))
      })
      .catch(err => {
        utils.showModalError(utils.translateText({ id: 'opFail' }), err)
      })
  }

  return (
    <aside className={styles.content}>
      <div className={styles.header}>
        <Breadcrumb />
        <div className={styles.title}>{utils.translateText({ id: 'Processe Out of stock' })}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.input_con}>
          <Form form={form}>
            <FormItem name='nos' rules={[{ required: true, whitespace: true, message: utils.translateText({ id: 'purchaseInput' }) }]}>
              <LimitTextArea
                autoSize={{ minRows: 18, maxRows: 25 }}
                sep={'\n'}
                maxLength={100}
                placeholder={`${intl.formatMessage({ id: 'purchasePerLine' })}`}
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => handleSubmit(e)}>
                {utils.translateText({ id: 'confirmStock' })}
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={styles.text_con}>
          <p className={styles.info}>1.{utils.translateText({ id: 'per at a time' })}</p>
          <p className={styles.info}>2.{utils.translateText({ id: 'funcFit' })}</p>
          <p className={styles.info}>3.{utils.translateText({ id: 'carefullyUse' })}</p>
        </div>
      </div>
    </aside>
  )
}

export default injectIntl(OutOfStock)