import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Layout, theme } from "antd";
import { SiderTheme } from "antd/es/layout/Sider";
import { createStyles, useThemeMode } from "antd-style";

import SiderContent from "./SiderContent";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";

const { Sider } = Layout;

createStyles({
  layout: {},
});

const AppLayout: FC = () => {
  const sideBarState = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  const { appearance } = useThemeMode();
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Sider
        // className={`shadow-xl ${
        //   appearance === "dark" ? "shadow-black" : "shadow-gray-400"
        // }`}
        width={160}
        collapsedWidth={48}
        style={{ boxShadow: token.boxShadow }}
        trigger={null}
        collapsible
        collapsed={sideBarState}
        theme={appearance as SiderTheme}
      >
        <SiderContent />
      </Sider>
      <Outlet />
    </Layout>
  );
};
export default AppLayout;
