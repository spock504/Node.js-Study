import { getBlogDetailApi, updateBlogDetailApi } from '../../../servers/blog'
import { message } from 'antd';

export default {
  namespace: 'blogDetailModal', // 命名空间名字, 唯一
  state: {      //state就是用来放初始值的
    blogDetail: {},
  },
  reducers: {   // 能改变界面的action应该放这里,
    saveDetail(state, { payload: { data: blogDetail } }) { // 可以理解为一个方法名
      return { ...state, blogDetail, };
    },
  },
  effects: {    // 处理数据逻辑的地方
    *getBlogDetail({ payload }, { call, put }) {
      const result = yield call(getBlogDetailApi, payload); // 请求数据
      if (result.errno === 0) {
        yield put({ type: 'saveDetail', payload: result });
      }
    },
    *updateBlogDetail({ payload, callback }, { call, put }) {
      const result = yield call(updateBlogDetailApi, payload); // 请求数据
      if (result.errno === 0) {
        if (callback) callback()
      } else {
        message.error(result.message);
      }
    },
  },
  subscriptions: {
    // 订阅监听，比如我们监听路由，进入页面就如何，可以在这写
  },
};