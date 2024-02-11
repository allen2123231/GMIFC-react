import { FC } from "react";

import { Layout } from "antd";

import HeaderContent from "./Schedule/Schedule_HeaderContent";
import useStyle from "./layout";

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
