
import React from 'react'
import { List } from 'antd';
import { getBlogList } from '../../../server/blog'


export default class BlogListPage extends React.Component {
    

    componentDidMount() {
        const params = {
            isAdmin: 1
        }
        getBlogList(params).then(res => {
            console.log("获取列表成功",res)
        })
    }

    
    render() {
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            },
          ];
        return (
            <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        )
    }
}