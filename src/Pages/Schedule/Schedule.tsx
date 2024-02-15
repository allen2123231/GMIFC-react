import { FC } from "react";

import { Layout } from "antd";

import HeaderContent from "./Schedule_HeaderContent";
import useStyle from "../layoutStyle";

const { Header, Content } = Layout;

const Schedule: FC = () => {
  const { styles } = useStyle();

  return (
    <Layout>
      <Header className={styles.header}>
        <HeaderContent />
      </Header>
      <Content className={styles.content}>Schedule</Content>
    </Layout>
  );
};

export default Schedule;
