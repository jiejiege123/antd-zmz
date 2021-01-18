import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { Card, Alert, Typography } from "antd";
import { connect, useIntl, FormattedMessage } from "umi";
import styles from "./Welcome.less";

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const HeadTop = () => (
  <div>
    <h3 className={styles.h3}>网站概要</h3>
    <div class="layout-row align-center">
      <span>
        目前有
      </span>
      <div className={styles.spanTitl}>

      </div>
      <span>123</span>
    </div>
  </div>

);

// 刚开始 应该先加载数据

// export default () => {
//   const intl = useIntl();
//   return (
//     <PageContainer header={{title: ""}} >
//       <div className={styles.warp}>
//         <HeadTop></HeadTop>
//       </div>
      
//       {/* <Card>
//         <Alert
//           message={intl.formatMessage({
//             id: "pages.welcome.alertMessage",
//             defaultMessage: "更快更强的重型组件，已经发布。",
//           })}
//           type="success"
//           showIcon
//           banner
//           style={{
//             margin: -12,
//             marginBottom: 24,
//           }}
//         />
//         <Typography.Text strong>
//           <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="高级表格" />{" "}
//           <a
//             href="https://procomponents.ant.design/components/table"
//             rel="noopener noreferrer"
//             target="__blank"
//           >
//             <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
//           </a>
//         </Typography.Text>
//         <CodePreview>yarn add @ant-design/pro-table</CodePreview>
//         <Typography.Text
//           strong
//           style={{
//             marginBottom: 12,
//           }}
//         >
//           <FormattedMessage id="pages.welcome.advancedLayout" defaultMessage="高级布局" />{" "}
//           <a
//             href="https://procomponents.ant.design/components/layout"
//             rel="noopener noreferrer"
//             target="__blank"
//           >
//             <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
//           </a>
//         </Typography.Text>
//         <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
//       </Card> */}
//     </PageContainer>
//   );
// };

const Welecome = (props) => {

};

export default connect(({ profileAndadvanced, loading }) => ({
  profileAndadvanced,
  loading: loading.effects["profileAndadvanced/fetchAdvanced"],
}))(Welecome);