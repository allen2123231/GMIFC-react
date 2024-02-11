import { Layout } from "antd";
import { FC } from "react";
import HeaderContent_Fabrication from "./Fabrication/HeaderContent";
import useStyle from "./layout";

const { Header, Content } = Layout;

const Fabrication: FC = () => {
  const { styles } = useStyle();
  return (
    <Layout>
      <Header className={styles.header}>
        <HeaderContent_Fabrication />
      </Header>
      <Content className={styles.content}>Fabrication</Content>
    </Layout>
  );
};

export default Fabrication;
