import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from './Login.less';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Spin } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class Login extends React.Component {

  onSubmitLogin = (e) => {
    const { form, dispatch, params: { id }} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        const {account, password} = values


        dispatch({type: "auth/login", payload: {account: account, password}})
      }
    });
  }

  render() {
    const { getFieldDecorator, dispatch} = this.props.form;
    const { isLoginSubmit=false } = this.props

    return (
      <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', height: '100%'}}>
      <Spin spinning={isLoginSubmit} delay={500}>
        <Form onSubmit={this.onSubmitLogin} className="login-form">
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: 'Please input your account!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <Link to="/forgot" className="login-form-forgot">Forgot password</Link>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </FormItem>
        </Form>
      </Spin>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    auth: {isLoginSubmit}
  } = state
  return {
    isLoginSubmit
  };
}

const WrapperLogin = Form.create()(Login)

export default connect(mapStateToProps)(WrapperLogin);
