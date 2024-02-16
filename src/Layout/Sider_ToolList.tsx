import { FC } from "react";
import TooltipButton from "../components/TooltipButton";
import Icon from "../components/Icon";
import useStyle from "./uiStyle";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { Space } from "antd";

const ModelList: FC = () => {
  const { styles } = useStyle();
  const sideBarIsCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <TooltipButton title="Upload" isactived={false}>
        <Icon name="upload" style={styles.buttonIcon} />
        <span>{sideBarIsCollapsed ? "" : "Upload"}</span>
      </TooltipButton>
      <TooltipButton title="category" isactived={false}>
        <Icon name="category" style={styles.buttonIcon} />
        <span>{sideBarIsCollapsed ? "" : "Category"}</span>
      </TooltipButton>
    </Space>
  );
};

const FabricationList: FC = () => {
  const { styles } = useStyle();
  const sideBarIsCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <TooltipButton title="2D" isactived={false}>
        <Icon name="2d" style={styles.buttonIcon} />
        <span>{sideBarIsCollapsed ? "" : "2D"}</span>
      </TooltipButton>
    </Space>
  );
};

const ScheduleList: FC = () => {
  const { styles } = useStyle();
  const sideBarIsCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <TooltipButton title="Projects" isactived={false}>
        <Icon name="apartment" style={styles.buttonIcon} />
        <span>{sideBarIsCollapsed ? "" : "Projects"}</span>
      </TooltipButton>
    </Space>
  );
};

const ToolList: FC = () => {
  const { styles } = useStyle();
  const sideBarIsCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );

  const locationState = useSelector<TRootState, string>(
    (state) => state.locationState.location
  );

  return (
    <Space className="#Tool" direction="vertical" size={1}>
      <TooltipButton title="Tool" disable={true} isactived={false}>
        <Icon name="construction" style={styles.buttonIcon} />
        <span>{sideBarIsCollapsed ? "" : "TOOL"}</span>
      </TooltipButton>
      {locationState === "Model" && <ModelList />}
      {locationState === "Fabrication" && <FabricationList />}
      {locationState === "Schedule" && <ScheduleList />}
    </Space>
  );
};
export default ToolList;
