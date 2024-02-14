import { Space } from "antd";

import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../store/store";

import TooltipButton from "../components/TooltipButton";
import Icon from "../components/Icon";
import useStyle from "./uiStyle";
import { setLocation } from "../store/location";

const ModuleSwitcher: FC = () => {
  const { styles } = useStyle();
  const sideBarIsCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );

  const locationState = useSelector<TRootState, string>(
    (state) => state.locationState.location
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onclick = (location: string) => {
    dispatch(setLocation(location)), navigate(`../${location}`);
  };

  return (
    <Space className="#ModuleSwitcher" direction="vertical" size={1}>
      <TooltipButton title="MODULE" disable={true} isactived={false}>
        <Icon name="menu" style={styles.buttonIcon} />
        <span>{sideBarIsCollapsed ? "" : "MODULE"}</span>
      </TooltipButton>
      <Space direction="vertical" style={{ width: "100%" }}>
        <TooltipButton
          title="Model"
          onClick={() => {
            onclick("Model");
          }}
          isactived={locationState === "Model"}
        >
          <Icon name="deployed_code_update" style={styles.buttonIcon} />
          <span>{sideBarIsCollapsed ? "" : "Model"}</span>
        </TooltipButton>
        <TooltipButton
          title="Fabrication"
          onClick={() => {
            onclick("Fabrication");
          }}
          isactived={locationState === "Fabrication"}
        >
          <Icon name="precision_manufacturing" style={styles.buttonIcon} />
          <span>{sideBarIsCollapsed ? "" : "Fabrication"}</span>
        </TooltipButton>
        <TooltipButton
          title="Schedul"
          onClick={() => {
            onclick("Schedule");
          }}
          isactived={locationState === "Schedule"}
        >
          <Icon name="event_note" style={styles.buttonIcon} />
          <span>{sideBarIsCollapsed ? "" : "Schedul"}</span>
        </TooltipButton>
      </Space>
    </Space>
  );
};

export default ModuleSwitcher;
