
import React from 'react'
import { connect } from 'dva';
import router from 'umi/router';
import { Input, Form, Button, message } from 'antd';
import styles from './index.css';

const { TextArea } = Input;

class NormalBlogForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'blogNewModal/setNewBlog',
                    payload: values,
                    callback: () => {
                        message.success('创建成功！');
                        router.goBack();
                    }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} className={styles.blog_form}>
                <Form.Item label="标题">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your title!' }],
                    })(
                        <Input
                            placeholder="标题"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="内容">
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your content!' }],
                    })(
                        <TextArea
                            placeholder="content"
                        />,
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className={styles.blog_form_button}>创建</Button>
            </Form>
        )
    }
}
const WrappedNormalBlogForm = Form.create({ name: 'new_blog' })(NormalBlogForm);

export default connect(({ blogNewModal }) => ({
    blogNewModal,
}))(WrappedNormalBlogForm);