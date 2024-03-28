import { FC, useRef } from "react";
import { ProjectsManager } from "../../class/ProjectsManager";
import { AutoComplete, Button, Card, Col, Input, Layout, Row } from "antd";
import useLayoutStyle from "../layoutStyle";
import HeaderContent from "../../components/HeaderContent";
import Breadcrumbs from "../../components/Header_Breadcrumb";
import { useParams } from "react-router-dom";
// import { StepBackwardFilled, StepForwardOutlined } from "@ant-design/icons";
import {
  ImperativePanelGroupHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import ResizeHandle from "../../components/ResizeHandle";
import { useBreakpoint } from "@ant-design/pro-components";

interface IProjectDetailProps {
  projectsManager: ProjectsManager;
}
const { Header, Content } = Layout;

const ProjectDetail: FC<IProjectDetailProps> = ({ projectsManager }) => {
  const sideRef = useRef<ImperativePanelGroupHandle>(null);
  const projectDetailRef = useRef<ImperativePanelGroupHandle>(null);
  const changePanelLayout = (
    ref: React.RefObject<ImperativePanelGroupHandle>,
    v1: number
  ) => {
    // 佈局變更
    const panelGroup = ref.current;
    if (panelGroup?.getLayout()[0] !== 0) {
      panelGroup!.setLayout([0, 100]);
      console.log(panelGroup!.getLayout());
    } else {
      panelGroup!.setLayout([v1, 100 - v1]);
    }
  };
  const hideProjectDetail = () => {
    changePanelLayout(projectDetailRef, 30)!;
  };
  const hideSide = () => {
    changePanelLayout(sideRef, 25)!;
  };
  // 屏幕尺寸更改佈局
  const curentScreen = useBreakpoint();
  const verticalScreen = ["xs", "sm"];
  const isVertical = verticalScreen.includes(curentScreen!);
  console.log(curentScreen);
  console.log(projectsManager.projectlist);

  const { styles } = useLayoutStyle();
  const projectId = useParams<{ FirestoreProjectId: string }>();

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
        <PanelGroup
          direction={isVertical ? "vertical" : "horizontal"}
          ref={sideRef}
        >
          <Panel
            defaultSize={25}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PanelGroup direction="vertical" ref={projectDetailRef}>
              <Panel defaultSize={25}>
                <Card
                  style={{ height: "100%" }}
                  styles={{ header: { paddingInline: 16 } }}
                  title={project!.name}
                  extra={
                    <Button
                      type="text"
                      shape="default"
                      size="small"
                      style={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <span className="material-symbols-rounded">
                        edit_note
                      </span>
                    </Button>
                  }
                ></Card>
              </Panel>
              <ResizeHandle isVertical={true} dbClick={hideProjectDetail} />
              <Panel>
                <Card
                  style={{ height: "100%" }}
                  styles={{
                    header: {
                      paddingInline: 16,
                    },
                    body: {
                      display: "flex",
                      padding: 16,
                      height: "100%",
                    },
                  }}
                  title={
                    <Row>
                      <Col
                        span={12}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span>To-do List</span>
                      </Col>
                      <Col
                        span={12}
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Input.Search
                          placeholder="Search"
                          style={{ width: "100%" }}
                        />
                      </Col>
                    </Row>
                  }
                >
                  <Button
                    type="dashed"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <span style={{ marginRight: 8 }}>Add a mission</span>
                    <span className="material-symbols-rounded">add</span>
                  </Button>
                </Card>
              </Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle isVertical={isVertical} dbClick={hideSide} />
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
