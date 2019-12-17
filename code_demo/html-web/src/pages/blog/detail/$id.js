
import React, { Fragment } from 'react'
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Input, Form, Button, Icon, message } from 'antd';
import styles from './index.css';

const { TextArea } = Input;

class BlogDetailPage extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'blogDetailModal/getBlogDetail',
      payload: this.props.match.params,
    })
  }

  render() {
    const { blogDetail = {} } = this.props.blogDetailModal
    const { edit = false } = this.props.location.query
    return (
      <Fragment>
        {
          edit ?
            <WrappedNormalBlogForm {...this.props} blogDetail={blogDetail} />
            :
            <div>
              <Card hoverable title={blogDetail.title} extra={<span style={{ fontSize: 10 }}>{`作者: ${blogDetail.author}`}</span>} style={{ width: 300 }}>
                <p>{blogDetail.content}</p>
              </Card>
              <Button type="primary" onClick={() => {
                router.goBack();
              }}>
                <Icon type="left" />
                <span>返回</span>
              </Button>
            </div>
        }
      </Fragment>

    )
  }
}

class NormalBlogForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = this.props.blogDetail.id
        this.props.dispatch({
          type: 'blogDetailModal/updateBlogDetail',
          payload: values,
          callback: () => {
            message.success('更新成功！');
            router.goBack();
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form
    const { blogDetail } = this.props
    return (
      <Form onSubmit={this.handleSubmit} className={styles.blog_form}>
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            initialValue: blogDetail.title,
            rules: [{ required: true, message: 'Please input your title!' }],
          })(
            <Input
              placeholder="标题"
            />,
          )}
        </Form.Item>
        <Form.Item label="内容">
          {getFieldDecorator('content', {
            initialValue: blogDetail.content,
            rules: [{ required: true, message: 'Please input your content!' }],
          })(
            <TextArea
              placeholder="content"
            />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className={styles.blog_form_button}>更新</Button>
      </Form>
    )
  }
}
const WrappedNormalBlogForm = Form.create({ name: 'normal_blog' })(NormalBlogForm);


export default connect(({ blogDetailModal }) => ({
  blogDetailModal,
}))(BlogDetailPage);