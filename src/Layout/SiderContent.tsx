import { Flex } from "antd";
import { FC } from "react";
import CompanyLogo from "./Sider_CompanyLogo";
import ModuleSwitcher from "./Sider_ModuleSwitcher";
import SiderCollapsedButton from "./Sider_CollapsedButton";
import ModeSwitcher from "./Sider_ThemeModeSwitcher";
import LoginButton from "./Sider_LoginButton";
import ToolList from "./Sider_ToolList";
import HomeButton from "./Sider_HomeButton";

const SiderContent: FC = () => {
  return (
    <>
      <Flex gap="middle" vertical={true} style={{ height: "100%" }}>
        <CompanyLogo />
        <HomeButton />
        <ModuleSwitcher />
        <ToolList />
        <Flex
          gap="small"
          justify="flex-end"
          vertical={true}
          style={{ flex: "1" }}
        >
          <LoginButton />
          <SiderCollapsedButton />
          <ModeSwitcher />
        </Flex>
      </Flex>
    </>
  );
};

export default SiderContent;
