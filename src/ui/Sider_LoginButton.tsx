import { FC } from "react";
import useStyles from "./uiStyle";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import TooltipButton from "../components/TooltipButton";
import Icon from "../components/Icon";
import { useNavigate } from "react-router-dom";

const LoginButton: FC = () => {
  const sideBarState = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  const { styles } = useStyles();
  const navigate = useNavigate();

  return (
    <TooltipButton
      title="Login"
      isactived={false}
      onClick={() => {
        navigate("../Login");
      }}
    >
      <Icon name="login" style={styles.buttonIcon} />
      <span>{sideBarState ? "" : "Login"}</span>
    </TooltipButton>
  );
};
export default LoginButton;
