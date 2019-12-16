
import React from 'react'
import { connect } from 'dva';
import { List, Card } from 'antd';
import Link from 'umi/link';

class BlogListPage extends React.Component {

  componentDidMount() {
    const params = {
      isAdmin: 1
    }
    this.props.dispatch({
      type: 'blogModal/getBlogList',
      payload: params,
    })
  }

  render() {
    const { blogList = [] } = this.props.blogModal
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={blogList}
        renderItem={item => (
          <List.Item>
            <Card title={<Link to={`/blog/detail/${item.id}`}>{item.title}</Link>}>{item.content}</Card>
          </List.Item>
        )}
      />
    )
  }
}

export default connect(({ blogModal }) => ({
  blogModal,
}))(BlogListPage);