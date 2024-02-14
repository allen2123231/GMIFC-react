import { Layout } from "antd";
import { FC } from "react";
import HeaderContent_Model from "./HeaderContent";
import useStyle from "../layout";

const { Header, Content } = Layout;

const Model: FC = () => {
  const { styles } = useStyle();
  return (
    <Layout>
      <Header className={styles.header}>
        <HeaderContent_Model />
      </Header>
      <Content className={styles.content}>Model</Content>
    </Layout>
  );
};

export default Model;
