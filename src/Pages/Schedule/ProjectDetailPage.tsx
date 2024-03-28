import { FC, useState } from "react";
import { ProjectsManager } from "../../class/ProjectsManager";
import { AutoComplete, Button, Card, Col, Input, Layout, Row } from "antd";
import useLayoutStyle from "../layoutStyle";
import HeaderContent from "../../components/HeaderContent";
import Breadcrumbs from "../../components/Header_Breadcrumb";
import { useParams } from "react-router-dom";
import { StepBackwardFilled, StepForwardOutlined } from "@ant-design/icons";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResizeHandle from "../../components/ResizeHandle";
import { useBreakpoint } from "@ant-design/pro-components";

interface IProjectDetailProps {
  projectsManager: ProjectsManager;
}
const { Header, Content } = Layout;

const ProjectDetail: FC<IProjectDetailProps> = ({ projectsManager }) => {
  const [projectDetailIsHide, setprojectDetailIsHide] = useState(false);
  console.log(projectDetailIsHide);

  const curentScreen = useBreakpoint();
  const verticalScreen = ["xs", "sm"];
  const isVertical = verticalScreen.includes(curentScreen!);
  console.log(curentScreen);

  const { styles } = useLayoutStyle();
  const projectId = useParams<{ FirestoreProjectId: string }>();
  console.log(projectId.FirestoreProjectId);

  if (!projectId.FirestoreProjectId) {
    return <p>Project ID is needed to see this page</p>;
  }
  const project = projectsManager.getProjects(projectId.FirestoreProjectId);
  if (!project) {
    return (
      <p>The project with ID {projectId.FirestoreProjectId} wasn't found.</p>
    );
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <HeaderContent
          col1={<Breadcrumbs project={project} />}
          col2={
            <AutoComplete style={{ width: "80%", alignItems: "center" }}>
              <Input.Search placeholder="Search" enterButton />
            </AutoComplete>
          }
        />
      </Header>
      <Content
        className={styles.content}
        style={{ padding: 16, paddingTop: 0 }}
      >
        <PanelGroup direction={isVertical ? "vertical" : "horizontal"}>
          <Panel
            defaultSize={25}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {projectDetailIsHide || (
              <Card
                style={{ height: "30%", marginBottom: "20px" }}
                title={project.name}
                extra={
                  <Button
                    type="default"
                    shape="default"
                    size="small"
                    onClick={() => {
                      setprojectDetailIsHide(true);
                      console.log(projectDetailIsHide);
                    }}
                  >
                    edit
                  </Button>
                }
              ></Card>
            )}
            <Card
              style={{ flex: "1" }}
              extra={
                projectDetailIsHide && (
                  <Button
                    onClick={() => {
                      setprojectDetailIsHide(false);
                    }}
                  >
                    hide
                  </Button>
                )
              }
            ></Card>
          </Panel>
          <ResizeHandle isVertical={isVertical} />
          <Panel>
            <Card style={{ height: "100%" }}></Card>
          </Panel>
        </PanelGroup>
        {/* <Row style={{ width: "100%", height: "100%", margin: 0 }}>
          {leftIsHide && (
            <Col lg={6}>
              <Card style={{ height: "30%" }} title={project.name}></Card>
            </Col>
          )}
          <Col>
            <Button
              type="text"
              icon={
                leftIsHide ? <StepBackwardFilled /> : <StepForwardOutlined />
              }
              style={{
                height: "100%",
                width: "20px",
                border: "none",
              }}
              onClick={() => setLeftIsHide(!leftIsHide)}
            ></Button>
          </Col>
          <Col lg={{ flex: "auto" }}>
            <Card style={{ height: "100%" }}></Card>
          </Col>
        </Row> */}
      </Content>
    </Layout>
  );
};
export default ProjectDetail;
