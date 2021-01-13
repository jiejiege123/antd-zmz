import { stringify } from "querystring";
import { history } from "umi";
import { fakeAccountLogin } from "@/services/login";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { message } from "antd";
import md5 from "js-md5";

const Model = {
  namespace: "login",
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const param = {};
      param.password = md5(payload.password);
      param.username = payload.userName;
      const response = yield call(fakeAccountLogin, param);
      response.type = "account";
      // Login successfully
      if (response.Status === 200) {
        response.status = 200;
        response.currentAuthority = "admin";

        yield put({
          type: "changeLoginStatus",
          payload: response,
        }); 
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        
        message.success("🎉 🎉 🎉  登录成功！");
        localStorage.setItem("loginReq", response.Data.id);


        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf("#") + 1);
            }
          } else {
            window.location.href = "/";
            return;
          }
        }
        // 登录之后 根据路由 进入BasicLayout  welcome
        history.replace(redirect || "/");
      } else {
        // message.error(response.Msg);
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== "/user/login" && !redirect) {
        history.replace({
          pathname: "/user/login",
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload.currentAuthority);
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    }
  }
};
export default Model;
