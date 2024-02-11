import { FC } from "react";
import useStyles from "./uiStyle";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../store/sideBarStateSlice";
import { TRootState } from "../store/store";
import TooltipButton from "../components/TooltipButton";
import Icon from "../components/Icon";

const SiderCollapsedButton: FC = () => {
  const { styles } = useStyles();
  const dispath = useDispatch();
  const sideBarState = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  return (
    <TooltipButton
      title="Expand"
      onClick={() => {
        dispath(setCollapsed());
      }}
    >
      {sideBarState ? (
        <Icon name="right_panel_close" style={styles.buttonIcon} />
      ) : (
        <Icon name="left_panel_close" style={styles.buttonIcon} />
      )}
      <span>{sideBarState ? "" : "Collapsed"}</span>
    </TooltipButton>
  );
};
export default SiderCollapsedButton;
