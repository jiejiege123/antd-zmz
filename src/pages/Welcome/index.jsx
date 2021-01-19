import React, { useEffect, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { Typography, Button, Divider, Spin, Modal, Form, Input, Upload, message } from "antd";
import { connect, history } from "umi";
import styles from "./index.less";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);




const ActicleList = ({content}) => {
  const {acticleList, homePage} = content;
  // console.log(acticleList);
  const goDetail = (n) => {
    window.open(`${homePage}/detail?id=${n.id}`);
  };
  const list = acticleList.map((n) => {
    return (
      <div key={n.id} className="layout-row align-center">
        <div>
          {n.updateTime.slice(5,10)}
        </div>
        <Button type="link" onClick= {() => {goDetail(n);}}>{n.title}</Button>
      </div>
    );
  });
  return (
    <div>
      <h3 className={styles.h3}>最新发布的文章</h3>
      <div className={styles.acticleList}>
        {list}
      </div>
    </div>
  );
};



// 使用函数组件 然后使用connect方法完成 
const Welecome = (props) => {
  // console.log(props);
  const { dispatch, allData, currentUser, loading } = props;
  const {homePage} = currentUser;
  const { types, articles ,acticleList } = allData;
  const [visible, setVisible] = useState(false);
  const [modeTitle, setModeTitle] = useState("个人设置");
  
  
  useEffect(() => {
    // 每次渲染后都执行的函数， 有点类似 vue 的 watch 和 computed
    if (dispatch) {
      dispatch({
        type: "welcomeTestModel/getDataLsit",
      });
    }
  }, []);
  const showModal = (title) => {
    setVisible(true);
    setModeTitle(title);
  };
  const hiddenModal = () => {
    setVisible(false);
  };

  const ModelShow = ({content}) => {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    return (
      <Modal visible={content.visible} onCancel={hiddenModal} title={content.modeTitle} maskClosable={false}>
        <Form
          {...layout}
          name="basic"
        >
          <Form.Item
            label="头像"
            name="hendPhoto"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  const HeadTop = ({content}) => {
    // const {types, articles} = content;
    const goWrite = () => {
      history.push("/welcome");
    };
    return (
      <div>
        <h3 className={styles.h3}>网站概要</h3>
        <div className="layout-row align-center mt_40">
          <span>
            目前有
          </span>
          <div className={styles.spanTitl}>
            {content.articles}
          </div>
          <span>
            篇文章，并有
          </span>
          <div className={styles.spanTitl}>
            {content.types}
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
          <Button type="link" onClick= {() => {showModal("个人设置");}}>个人设置</Button>
          <Button type="link" onClick= {() => {showModal("系统设置");}}>系统设置</Button>
        </div>
      </div>
    );
  };

  return (
    <PageContainer header={{title: ""}}>
      <Spin spinning={loading}> 
        <div className={styles.warp}>
          <HeadTop content={{ types, articles }}></HeadTop>
          <Divider style={{marginTop: "5px"}} />
          <ActicleList content = {{acticleList, homePage}}></ActicleList>
        </div>
      </Spin>
      <ModelShow content={{visible, modeTitle}}></ModelShow>
    </PageContainer>

  );
};

export default connect(({ welcomeTestModel, loading, user }) => ({
  currentUser: user.currentUser,
  allData: welcomeTestModel,
  loading: loading.effects["welcomeTestModel/getDataLsit"],
}))(Welecome);