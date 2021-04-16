import React, { useState } from 'react'
import { Button, Input, Form, Popconfirm } from 'antd'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import { debounce } from 'lodash'
import utils from '@utils'
import { injectIntl } from 'react-intl'
import styles from './index.less'

const { TextArea } = Input
const FormItem = Form.Item

// 签收率处理
const Sign = (props) => {
  const { intl } = props
  // hook
  const [nos, setNos] = useState('')
  const [status, setStatus] = useState('')
  const [help, setHelp] = useState('')

  /**
   * 校验字符串是否合法
   * @param {*} str 
   * flag: 0: 成功，1: 超过长度，2: 空
   * num: 行数
   * result: 处理后的字符串结果
   */
  const checkValid = (str) => {
    let res = {
      flag: 0,
      num: 0,
      result: str
    }
    str = str ? str.trim() : ''
    if (str) {
      str = str.replace(/\n/g, ',')
      res.result = str
      const strArr = (str || '').split(',')
      if (strArr.length > 100) {
        res.flag = 1
      }
      res.num = strArr.length
    } else {
      res.flag = 2
    }
    return res
  }

  const handleValid = (val) => {
    const res = checkValid(val)
    // console.log("res", res)
    switch (res.flag) {
      case 0:
        setStatus('')
        setHelp('')
        break
      case 1:
        setStatus('error')
        setHelp(`${intl.formatMessage({ id: 'overline' })}` + `,${res.num}/100`)
        break
      case 2:
        setStatus('error')
        setHelp(`${intl.formatMessage({ id: 'notEmpty' })}`)
        break
      default:
        break
    }
    return res
  }

  const handleSubmit = (e) => {
    const res = handleValid(nos)
    console.log("res", res)
    if (res.flag === 0) {
      const data = { trackingNos: res.result }
      axios.post('/manager/operation_tools/t4_stock_rate/exception_process', JSON.stringify(data))
        .then(resp => {
          utils.showMessageSuccess(`${intl.formatMessage({ id: 'opSuccess' })}`)
          setNos('')
        })
        .catch(err => {
          utils.showModalError(`${intl.formatMessage({ id: 'opFail' })}`, err)
        })
    }
  }

  // 使用防抖校验数据合法性
  const handleKeyUp = debounce((val) => handleValid(val), 300)

  return (
    <aside className={styles.content}>
      <div className={styles.header}>
        <Breadcrumb />
        <div className={styles.title}>{`${intl.formatMessage({ id: 'Processe Sign yield' })}`}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.input_con}>
          <Form>
            <FormItem validateStatus={status} help={help}>
              <TextArea
                autoSize={{ minRows: 18, maxRows: 25 }}
                value={nos}
                onChange={e => setNos(e.target.value)}
                onKeyUp={e => handleKeyUp(e.target.value)} />
            </FormItem>
          </Form>
          <Popconfirm
            title={`${intl.formatMessage({ id: 'above logistics' })}`}
            onConfirm={(e) => handleSubmit(e)}
            onCancel={() => { }}
            okText={`${intl.formatMessage({ id: 'modal confirm' })}`}
            cancelText={`${intl.formatMessage({ id: 'modal cancel' })}`}
          >
            <Button className={styles.btn_submit} type="primary">{`${intl.formatMessage({ id: 'overdueConfirm' })}`}</Button>
          </Popconfirm>
        </div>
        <div className={styles.text_con}>
          <p className={styles.info}>1.{`${intl.formatMessage({ id: 'a time' })}`}</p>
          <p className={styles.info}>2.{`${intl.formatMessage({ id: 'funcFit' })}`}</p>
          <p className={styles.info}>3.{`${intl.formatMessage({ id: 'carefullyUse' })}`}</p>
        </div>
      </div>
    </aside>
  )
}

export default injectIntl(Sign)