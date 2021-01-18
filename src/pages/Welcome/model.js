import { getArticleOrder, getCategoriesAll } from "@/services/user";

const Model = {
  namespace: "welcomeTestModel",
  state: {
    types: "",
    articles: "",
    acticleList: []
  },
  effects: {
    *getDataLsit(_, { call, put }) {
      const data1 = yield call(getCategoriesAll);
      const data2 = yield call(getArticleOrder, {page: 1,  pageSize: 10});
      yield put({
        type: "setCategoriesAll",
        payload: data1.Data.data.length,
      }); 
      yield put({
        type: "setArticleOrder",
        payload: {
          articles: data2.Data[2][0].total,
          acticleList: data2.Data[1]
        },
      }); 
    }
  },
  reducers: {
    setCategoriesAll(state, { payload }) {
      return { ...state, types: payload };
    },
    setArticleOrder(state, { payload }) {
      return { ...state, articles: payload.articles, acticleList: payload.acticleList };
    }
  }
};
export default Model;
