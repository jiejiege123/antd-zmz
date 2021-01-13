import { queryCurrent, query as queryUsers } from "@/services/user";

const UserModel = {
  namespace: "user",
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: "save",
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      // 需要有个保持登录的东西
      // const { id = "1" } = yield select((state) => state.login.loginReq);
      const id = localStorage.getItem("loginReq") || 1;
      const { Data } = yield call(queryCurrent, { id });
      Data.userid = Data.id;
      Data.avatar="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";

      yield put({
        type: "saveCurrentUser",
        payload: Data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
