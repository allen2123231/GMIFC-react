import { FC } from "react";
import TooltipButton from "../components/TooltipButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../store/store";
import Icon from "../components/Icon";
import useStyle from "./uiStyle";
import { setLocation } from "../store/location";

const HomeButton: FC = () => {
  const sideBarIsCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );

  const locationstate = useSelector<TRootState, string>(
    (state) => state.locationState.location
  );
  const dispath = useDispatch();

  const navigate = useNavigate();
  const { styles } = useStyle();
  return (
    <TooltipButton
      title="Home"
      onClick={() => {
        navigate("../Home");
        dispath(setLocation("Home"));
      }}
      isactived={locationstate === "Home"}
    >
      <Icon name="home" style={styles.buttonIcon} />
      <span>{sideBarIsCollapsed ? "" : "Dashboard"}</span>
    </TooltipButton>
  );
};
export default HomeButton;
