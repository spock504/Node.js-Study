import React from 'react'
import router from 'umi/router';
import { Form, Icon, Input, Button, Row, message } from 'antd';
import { setUserLogin } from '../server/user'
import styles from './index.css';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        setUserLogin(values).then((res) => {
          if (!res.errno) {
            message.success('登陆成功！');
            router.push('/blog/list'); // 登陆成功 跳转到博客列表页
          }
        })
      }
    });
  };

  componentDidMount() {
    
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center">
        <Form onSubmit={this.handleSubmit} className={styles.login_form}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            Log in
        </Button>
        </Form>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm