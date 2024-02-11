import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Switch } from "antd";
import { ThemeMode } from "antd-style";

import { setDarkMode, setLightMode } from "../store/modeSlice";
import { TRootState } from "../store/store";

import useStyle from "./uiStyle";

const ModeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const { styles } = useStyle();

  const sideBarState = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );

  const themeModeState = useSelector<TRootState, ThemeMode>(
    (state) => state.thememode.theme
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
        marginTop: "6px",
      }}
    >
      <span className={styles.colorText}>{sideBarState ? "" : "Light"}</span>
      <Switch
        style={{
          marginInline: "0.8rem",
          backgroundColor: themeModeState === "light" ? "#ffcd3c" : "#192b44",
        }}
        onClick={(checked) => {
          checked ? dispatch(setDarkMode()) : dispatch(setLightMode());
        }}
      />
      <span className={styles.colorText}>{sideBarState ? "" : "Dark"}</span>
    </div>
  );
};
export default ModeSwitcher;
