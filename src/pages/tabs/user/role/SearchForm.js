import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'antd'
import utils from '@utils'
import { injectIntl } from 'react-intl'
import LimitInput from '@components/input/LimitInput'

const FormItem = Form.Item

const SearchForm = (props) => {
  const { intl } = props
  const [formData, setFormData] = useState({})
  const [form] = Form.useForm();

  useEffect(() => {
    handleSearch()
  }, [props.searchFlag])

  const submitSearch = (value) => {
    console.log(value)
    handleSearch({ pageNum: 1, ...value })
  }

  const handleSearch = (data = {}) => {
    const { current: pageNum, pageSize, onResultCB } = props

    let params = {
      pageNum,
      pageSize,
      ...formData,
      ...data
    }

    onResultCB && onResultCB({ loading: true })

    axios.get('/api/role/list', { params })
      .then(resp => {
        // console.log("resp", resp)
        const { rows, totalCount } = resp || {}
        if (rows) {
          onResultCB && onResultCB({
            list: rows,
            total: totalCount,
            current: params.pageNum,
          })
        }
      })
      .catch(err => {
        utils.showMessageError('查询权限列表失败', err)
      })
      .finally(() => {
        onResultCB && onResultCB({ loading: false })
      })
  }

  const { loading } = props

  return (
    <Form className='form' form={form} onFinish={submitSearch}>
      <Row gutter={24}>
        <Col span={8}>
          <FormItem label={`名称`} name='name' rules={[{
            required: true,
            message: `名称不能为空`, whitespace: true
          }]}>
            <LimitInput placeholder={'请输入名称'} />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={''}>
            <Button key='roleSearch' type="primary" htmlType="submit" loading={loading}>{`${intl.formatMessage({ id: 'search' })}`}</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default injectIntl(SearchForm)