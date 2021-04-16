import React, { PureComponent } from 'react'
import { Form, Row, Col, Button, Select } from 'antd'
import { injectIntl } from 'react-intl'
import LimitInput from '@components/input/LimitInput'
import utils from '@utils'
import styles from './index.less'

const FormItem = Form.Item
const { Option } = Select

class SearchFormClass extends PureComponent {

  formRef = React.createRef()

  componentDidMount() {
      this.handleSearch()
  }

  submitSearch = (value) => {
    this.handleSearch({ pageNum: 1, ...value })
  }

  handleSearch = (data = {}) => {
    const { current: pageNum, pageSize, onResultCB } = this.props
    const formData = this.formData || {}

    let params = {
      pageNum,
      pageSize,
      ...formData,
      ...data
    }

    onResultCB && onResultCB({ loading: true })

    axios.get('/api/user/list', { params })
      .then(resp => {
        console.log("resp", resp)
        const { rows, totalCount } = resp || {}
        if (rows) {
          onResultCB && onResultCB({
            data: rows,
            pagination: {
              current: params.pageNum,
              pageSize: params.pageSize,
              total: totalCount
            }
          })
        }
      })
      .catch(err => {
        utils.showMessageError('查询用户列表失败', err)
      })
      .finally(() => {
        onResultCB && onResultCB({ loading: false })
      })
  }


  render() {
    const { loading, intl } = this.props
    const col = 3

    return (
      <Form className={styles.form} ref={this.formRef} onFinish={this.submitSearch}>
        <Row gutter={24}>
          <Col span={24 / col}>
            <FormItem label={`${intl.formatMessage({ id: 'code' })}`} name='code' rules={[{
              required: true,
              message: `${intl.formatMessage({ id: 'Code cannot be empty' })}`
            }]}>
              <LimitInput placeholder={`${intl.formatMessage({ id: 'Enter Code' })}`} />
            </FormItem>
          </Col>
          <Col span={24 / col}>
            <FormItem label={`${intl.formatMessage({ id: 'type' })}`} name='type' >
              <Select placeholder={`${intl.formatMessage({ id: 'Choose Type' })}`} allowClear>
                <Option value="inconer">inconer</Option>
                <Option value="outconer">outconer</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={24 / col}>
            <FormItem label={''}>
              <Button key='userSearch' type="primary" htmlType="submit" loading={loading}>{`${intl.formatMessage({ id: 'search' })}`}</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default injectIntl(SearchFormClass)