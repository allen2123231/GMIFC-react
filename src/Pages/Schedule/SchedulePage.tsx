import { FC, useEffect, useState } from "react";

import * as Firestore from "firebase/firestore";

import { AutoComplete, Input, Layout, message } from "antd";

import HeaderContent from "../../components/HeaderContent";
import useLayoutStyle from "../layoutStyle";
import Cardlisting from "../../components/CardListing";
import CreateProjectForm from "./Schedule_ProjectForm";
import { getCollections } from "../../firebase.config";
import { Iproject, Project } from "../../class/project";
import { ProjectsManager } from "../../class/ProjectsManager";
import Breadcrumbs from "../../components/Header_Breadcrumb";

const { Header, Content } = Layout;
const projectCollection = getCollections<Iproject>("/projects");

interface IscheduleProps {
  projectsManager: ProjectsManager;
}

const Schedule: FC<IscheduleProps> = ({ projectsManager }) => {
  const { styles } = useLayoutStyle();
  const [messageApi, contextHolder] = message.useMessage();

  const [projectslist, setprojectslist] = useState<Project[]>(
    projectsManager.projectlist
  );
  const [modalVisible, setModalVisible] = useState(false);
  const handelOpenModal = () => {
    setModalVisible(true);
  };

  projectsManager.onProjectCreated = () => {
    setprojectslist([...projectsManager.projectlist]);
  };

  // 從firebase取得project資料
  const getFirestoreProjects = async () => {
    const firestoreDocs = await Firestore.getDocs(projectCollection);
    for (const doc of firestoreDocs.docs) {
      const firestoreProjects = doc.data();
      const project = {
        ...firestoreProjects,
      };
      try {
        projectsManager.newProject(project, doc.id);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //在componentDidMount時取得firebase資料
  useEffect(() => {
    getFirestoreProjects();
  }, []);
  console.log(projectslist);

  return (
    <Layout className={styles.layout}>
      {contextHolder}
      <Header className={styles.header}>
        <HeaderContent
          col1={<Breadcrumbs />}
          col2={
            <AutoComplete style={{ width: "80%", alignItems: "center" }}>
              <Input.Search placeholder="Search" enterButton />
            </AutoComplete>
          }
        />
      </Header>
      <Content className={styles.content}>
        <Cardlisting
          createOnClick={handelOpenModal}
          projectslistData={projectslist}
        />
        <CreateProjectForm
          modalVisible={modalVisible}
          setmodalVisible={setModalVisible}
          messageApi={messageApi}
          projectsManager={projectsManager}
        />
      </Content>
    </Layout>
  );
};

export default Schedule;
