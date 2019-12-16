import { getBlogListApi } from '../../../servers/blog'

export default {
  namespace: 'blogModal', // 命名空间名字,唯一
  state: {      //state就是用来放初始值的
    blogList: [],
  },
  reducers: {   // 能改变界面的action应该放这里,
    saveList(state, { payload: { data: blogList } }) { // 可以理解为一个方法名
      return { ...state, blogList, };
    },
  },
  effects: {    // 处理数据逻辑的地方
    *getBlogList({ payload }, { call, put }) {
      const result = yield call(getBlogListApi, payload); // 请求数据
      if (result.errno === 0) {
        yield put({ type: 'saveList', payload: result });
      }
    },
  },
  subscriptions: {
    // 订阅监听，比如我们监听路由，进入页面就如何，可以在这写
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     // console.log("监听路由",pathname,query)
    //     // if (pathname === '/users') {
    //     //   dispatch({ type: 'fetch', payload: query });
    //     // }
    //   });
    // },
  },
};