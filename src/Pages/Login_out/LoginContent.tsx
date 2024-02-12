import {
  ProFormCheckbox,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { FC } from "react";
import Icon from "../../components/Icon";
import { GlobalToken } from "antd";
import useStyle from "../../ui/uiStyle";

interface LoginContentProps {
  token: GlobalToken;
}

const LoginContent: FC<LoginContentProps> = ({ token }) => {
  const curentScreen = useBreakpoint();
  const { styles } = useStyle();

  return (
    <>
      <ProFormText
        name="Email"
        placeholder="Enter Email"
        rules={[{ required: true, message: "Please enter your username" }]}
        //fieldProps為對應的input樣式
        fieldProps={{
          size: "large",
          prefix: <Icon name="email" style={styles.loginIconColor} />,
          autoComplete: "on",
        }}
      />
      <ProFormText.Password
        name="Password"
        placeholder="Enter password"
        rules={[{ required: true, message: "Please enter your password" }]}
        fieldProps={{
          size: "large",
          prefix: <Icon name="lock" style={styles.loginIconColor} />,
        }}
      />
      <div
        style={
          curentScreen != "sm" && curentScreen != "xs"
            ? {
                paddingBottom: token.paddingXS,
                alignItems: "center",
                height: "auto",
              }
            : {
                paddingBottom: token.paddingSM,
                display: "flex",
                gap: token.paddingXXS,
                flexDirection: "column",
                alignItems: "center",
              }
        }
      >
        <ProFormCheckbox noStyle name="autoLogin">
          Remember me
        </ProFormCheckbox>
        <a
          style={{
            color: "#2c7def",
            fontSize: 16,
            float: "right",
          }}
        >
          Forgot password?
        </a>
      </div>
    </>
  );
};
export default LoginContent;
