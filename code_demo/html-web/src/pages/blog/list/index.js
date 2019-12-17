
import React from 'react'
import { connect } from 'dva';
import { Table, Button } from 'antd';
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
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '内容',
        dataIndex: 'content',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <Button type="primary">
                <Link to={`/blog/detail/${record.id}`}>查看</Link>
              </Button>
              <Button style={{ marginLeft: 10 }}>
                <Link to={`/blog/detail/${record.id}?edit=${true}`}>编辑</Link>
              </Button>
            </div>
          )
        }
      },
    ]
    const footer = () => {
      return (
        <Button type="primary">
          <Link to="/blog/new">新增</Link>
        </Button>
      )
    }
    return (
      <Table dataSource={blogList} columns={columns} pagination={false} rowKey="id" footer={footer} />
    )
  }
}

export default connect(({ blogModal }) => ({
  blogModal,
}))(BlogListPage);