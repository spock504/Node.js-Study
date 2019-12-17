import { setUserLoginApi } from '../servers/user'

export default {
  namespace: 'userLogin', // 命名空间名字,唯一
  state: {      //state就是用来放初始值的
    blogList: [],
  },
  reducers: {   // 能改变界面的action应该放这里,
    saveList(state, { payload: { data: blogList } }) { // 可以理解为一个方法名
      return { ...state, blogList, };
    },
  },
  effects: {    // 处理数据逻辑的地方
    *setUserLogin({ payload, callback }, { call, put }) {
      const result = yield call(setUserLoginApi, payload); // 请求数据
      if (result.errno === 0) {
        if (callback) callback()
      }
    },
  },
};