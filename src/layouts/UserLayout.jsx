// import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>舴艋舟管理系统</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="ghjgjhg"
                // defaultMessage="reat antd 版本的后台管理系统"
              />
            </div>
          </div>
          {children}
        </div>
        <div className={styles.footer}>
          <p>
            © 2020 Copyright
            <a
              className={styles.copyname}
              href="https://www.zemengzhou.top/welcome"
              target="_blank"
              rel="noopener noreferrer"
            >
              舴艋舟_个人博客
            </a>
            / Powered by React & AntdPro
          </p>
          <a href="http://www.beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
            蜀ICP备18023980号-2
          </a>
        </div>
        {/* 自己写定义 */}
        {/* <DefaultFooter
          links={[
            { key: 'test', title: 'layout', href: 'www.alipay.com' },
            { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
          ]}
          copyright="这是一条测试文案" /> */}
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
