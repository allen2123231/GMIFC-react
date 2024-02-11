import { Space } from "antd";

import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../store/store";
import {
  setFabricationState,
  setModelState,
  setScheduleState,
} from "../store/moduleStateSlice";

import TooltipButton from "../components/TooltipButton";
import Icon from "../components/Icon";
import useStyle from "./uiStyle";

const ModuleSwitcher: FC = () => {
  const { styles } = useStyle();
  const sideBarIsCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  const moduleState = useSelector<TRootState, string>(
    (state) => state.moduleState.isSlected
  );
  const locationState = useSelector<TRootState, string>(
    (state) => state.locationState.location
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    moduleState !== "none"
      ? navigate(`../${moduleState}`)
      : navigate(`../${locationState}`);
  }, [moduleState, locationState, navigate]);

  return (
    <Space className="#ModuleSwitcher" direction="vertical" size={1}>
      <TooltipButton title="MODULE" disable={true} isactived={false}>
        <Icon name="menu" style={styles.buttonIcon} />
        <span>{sideBarIsCollapsed ? "" : "MODULE"}</span>
      </TooltipButton>
      <Space direction="vertical" style={{ width: "100%" }}>
        <TooltipButton
          title="Model"
          onClick={function () {
            dispatch(setModelState());
          }}
          isactived={moduleState === "Model"}
        >
          <Icon name="deployed_code_update" style={styles.buttonIcon} />
          <span>{sideBarIsCollapsed ? "" : "Model"}</span>
        </TooltipButton>
        <TooltipButton
          title="Fabrication"
          isactived={moduleState === "Fabrication"}
          onClick={() => {
            dispatch(setFabricationState());
          }}
        >
          <Icon name="precision_manufacturing" style={styles.buttonIcon} />
          <span>{sideBarIsCollapsed ? "" : "Fabrication"}</span>
        </TooltipButton>
        <TooltipButton
          title="Schedul"
          isactived={moduleState === "Schedule"}
          onClick={() => {
            dispatch(setScheduleState());
          }}
        >
          <Icon name="event_note" style={styles.buttonIcon} />
          <span>{sideBarIsCollapsed ? "" : "Schedul"}</span>
        </TooltipButton>
      </Space>
    </Space>
  );
};

export default ModuleSwitcher;
