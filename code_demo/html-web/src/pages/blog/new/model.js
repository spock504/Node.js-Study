import { setNewBlogApi } from '../../../servers/blog'

export default {
  namespace: 'blogNewModal', // 命名空间名字, 唯一
  state: {      //state就是用来放初始值的
  },
  reducers: {   // 能改变界面的action应该放这里,
  },
  effects: {    // 处理数据逻辑的地方
    *setNewBlog({ payload, callback }, { call, put }) {
      const result = yield call(setNewBlogApi, payload); // 请求数据
      if (result.errno === 0) {
          if (callback) callback()
      }
    },
  },
  subscriptions: {
    // 订阅监听，比如我们监听路由，进入页面就如何，可以在这写
  },
};