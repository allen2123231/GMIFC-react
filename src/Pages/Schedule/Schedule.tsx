import { FC, useState } from "react";

import { Layout, message } from "antd";

import HeaderContent from "./Schedule_HeaderContent";
import useStyle from "../layoutStyle";
import Cardlisting from "../../components/CardListing";
import CreateProjectForm from "./Schedule_ProjectForm";

const { Header, Content } = Layout;

const Schedule: FC = () => {
  const { styles } = useStyle();
  const [messageApi, contextHolder] = message.useMessage();

  const [modalVisible, setModalVisible] = useState(false);
  const handelOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <Layout style={{ maxHeight: "100vh", overflowY: "scroll" }}>
      {contextHolder}
      <Header
        className={styles.header}
        style={{ position: "sticky", top: 0, zIndex: 1 }}
      >
        <HeaderContent />
      </Header>
      <Content
        className={styles.content}
        style={{ maxHeight: "100%", zIndex: 0 }}
      >
        <Cardlisting createOnClick={handelOpenModal} />
        <CreateProjectForm
          modalVisible={modalVisible}
          setmodalVisible={setModalVisible}
          messageApi={messageApi}
        />
      </Content>
    </Layout>
  );
};

export default Schedule;
