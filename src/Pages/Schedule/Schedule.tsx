import { FC, useEffect, useState } from "react";

import * as Firestore from "firebase/firestore";

import { Layout, message } from "antd";

import HeaderContent from "./Schedule_HeaderContent";
import useStyle from "../layoutStyle";
import Cardlisting from "../../components/CardListing";
import CreateProjectForm from "./Schedule_ProjectForm";
import { getCollections } from "../../firebase.config";
import { Iproject, Project } from "../../class/project";
import { ProjectsManager } from "../../class/ProjectsManager";

const { Header, Content } = Layout;
const projetManager = new ProjectsManager();
const projectCollection = getCollections<Iproject>("/projects");

const Schedule: FC = () => {
  const { styles } = useStyle();
  const [messageApi, contextHolder] = message.useMessage();

  const [projectslist, setprojectslist] = useState<Project[]>(
    projetManager.projectlist
  );
  const [modalVisible, setModalVisible] = useState(false);
  const handelOpenModal = () => {
    setModalVisible(true);
  };

  projetManager.onProjectCreated = () => {
    setprojectslist([...projetManager.projectlist]);
  };

  const getFirestoreProjects = async () => {
    const firestoreDocs = await Firestore.getDocs(projectCollection);
    for (const doc of firestoreDocs.docs) {
      const firestoreProjects = doc.data();
      const project = {
        ...firestoreProjects,
      };
      try {
        projetManager.newProject(project, doc.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getFirestoreProjects();
  }, []);
  console.log(projectslist);

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
        <Cardlisting
          createOnClick={handelOpenModal}
          projectslistData={projectslist}
        />
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
