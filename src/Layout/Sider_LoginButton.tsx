import { FC } from "react";
import useStyles from "./uiStyle";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../store/store";
import TooltipButton from "../components/TooltipButton";
import Icon from "../components/Icon";
import { useNavigate } from "react-router-dom";
import { setLocation } from "../store/location";
import useAuthStatus from "../hook/useAuthStatus";
import { setModelState } from "../store/moduleStateSlice";
import { getAuth } from "firebase/auth";

const LoginButton: FC = () => {
  const sideBarState = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  const { styles } = useStyles();
  const navigate = useNavigate();

  const locationstate = useSelector<TRootState, string>(
    (state) => state.locationState.location
  );
  const dispath = useDispatch();

  const { loggedIn } = useAuthStatus();
  const auth = getAuth();

  return (
    <>
      {loggedIn ? (
        <TooltipButton
          title="Logout"
          onClick={() => {
            navigate("../Model");
            dispath(setModelState());
            auth.signOut();
          }}
          isactived={locationstate === "Logout"}
        >
          <Icon name="logout" style={styles.buttonIcon} />
          <span>{sideBarState ? "" : "Logout"}</span>
        </TooltipButton>
      ) : (
        <TooltipButton
          title="Login"
          onClick={() => {
            navigate("../Login");
            dispath(setLocation("Login"));
          }}
          isactived={locationstate === "Login"}
        >
          <Icon name="login" style={styles.buttonIcon} />
          <span>{sideBarState ? "" : "Login"}</span>
        </TooltipButton>
      )}
    </>
  );
};
export default LoginButton;
