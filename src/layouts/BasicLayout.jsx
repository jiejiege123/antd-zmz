import ProLayout, { DefaultFooter } from "@ant-design/pro-layout";
import React, { useEffect, useMemo, useRef } from "react";
import { Link, useIntl, connect, history } from "umi";
import { GithubOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import Authorized from "@/utils/Authorized";
import RightContent from "@/components/GlobalHeader/RightContent";
import { getMatchMenu } from "@umijs/route-utils";
import logo from "../assets/logo.svg";

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
    links={[
      {
        key: "Ant Design Pro",
        title: "Ant Design Pro",
        href: "https://pro.ant.design",
        blankTarget: true,
      },
      {
        key: "github",
        title: <GithubOutlined />,
        href: "https://github.com/ant-design/ant-design-pro",
        blankTarget: true,
      },
      {
        key: "Ant Design",
        title: "Ant Design",
        href: "https://ant.design",
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: "/",
    },
  } = props;
  const menuDataRef = useRef([]);
  useEffect(() => {
    // 每次渲染后都执行的函数， 有点类似 vue 的 watch 和 computed
    if (dispatch) {
      dispatch({
        type: "user/fetchCurrent",
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: "global/changeLayoutCollapsed",
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || "/", menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  const { formatMessage } = useIntl();
  return (
    <ProLayout
      logo={logo} // 最左上的logo
      formatMessage={formatMessage} // 翻译相关的东西
      {...props} // 主要影响右侧菜单栏
      {...settings}
      onCollapse={handleMenuCollapse} // 菜单折叠收起事件
      onMenuHeaderClick={() => history.push("/")} // menu 菜单的头部点击事件
      menuItemRender={(menuItemProps, defaultDom) => { // 自定义菜单项的 render 方法
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [ // 自定义面包屑的数据
        {
          path: "/",
          breadcrumbName: formatMessage({
            id: "menu.home",
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => { // 权限菜单相关
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={menuDataRender} // 权限菜单相关
      footerRender={() => defaultFooterDom} // footer
      rightContentRender={() => <RightContent />} // header
      postMenuData={(menuData) => { // 服务器来管理我们的路由
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
