import React, { useEffect } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { Typography, Button } from "antd";
import { connect } from "umi";
import styles from "./index.less";

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);


const HeadTop = ({content}) => {
  const {types, articles} = content;
  const goWrite = () => {
    // TODO: 跳转路由
    console.log("123");

  };
  return (
    <div>
      <h3 className={styles.h3}>网站概要</h3>
      <div className="layout-row align-center mt_40">
        <span>
          目前有
        </span>
        <div className={styles.spanTitl}>
          {articles}
        </div>
        <span>
          篇文章，并有
        </span>
        <div className={styles.spanTitl}>
          {types}
        </div>
        <span>
          个分类
        </span>
      </div>
      <div className="pt_40">
        点击下面的链接快速开始：
      </div>
      <div className={styles.btnWarp}>
        <Button type="link" style={{paddingLeft:0}} onClick= {() => {goWrite();}}>撰写新文章</Button>
        <Button type="link">个人设置</Button>
        <Button type="link">系统设置</Button>
      </div>
    </div>
  );
};

// 使用函数组件 然后使用connect方法完成 
const Welecome = (props) => {
  // console.log(props);
  const { dispatch, allData } = props;
  const { types, articles ,acticleList } = allData;
  useEffect(() => {
    // 每次渲染后都执行的函数， 有点类似 vue 的 watch 和 computed
    if (dispatch) {
      dispatch({
        type: "welcomeTestModel/getDataLsit",
      });
    }
  }, []);
  return (
    <PageContainer header={{title: ""}} >
      <div className={styles.warp}>
        <HeadTop content={{ types, articles }}></HeadTop>
      </div>
    </PageContainer>

  );
};

export default connect(({ welcomeTestModel, loading }) => ({
  allData: welcomeTestModel,
  loading: loading.effects["welcomeTestModel/getDataLsit"],
}))(Welecome);