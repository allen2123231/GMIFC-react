import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { Button, Divider, Layout, Tabs, theme } from "antd";
import { FC, useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { setLocation } from "../store/location";
import { setNoneState } from "../store/moduleStateSlice";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import logo from "../assets/GM_Logo_png (白).png";
import Icon from "../components/Icon";
import useStyle from "../ui/uiStyle";
import { ThemeProvider } from "antd-style";
import GoogleSvg from "./Login_out/googleIcon";

const { Content } = Layout;

type LoginType = "Login" | "Signup";

const Login_out: FC = () => {
  const [loginType, setLoginType] = useState<LoginType>("Login");
  const { styles } = useStyle();

  const { token } = theme.useToken();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const curentScreen = useBreakpoint();
  console.log(curentScreen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocation(pathnames[0]));
    dispatch(setNoneState());
  });

  const formRef = useRef<ProFormInstance>();
  const getFormateValues = () => {
    console.log(formRef.current?.getFieldsValue());
  };

  const onSubmit = async () => {
    try {
      const auth = getAuth();
      const UserCredential = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = UserCredential.user;
    } catch (error) {}
  };

  return (
    //因為登陸頁面背景特殊，所以這裡不使用全局的ThemeProvider，而是在這個頁面單獨使用ThemeProvider
    //因為使用Antd的procomponents，所以部分樣式需要到index.css中修改
    <ThemeProvider
      themeMode="dark"
      theme={{
        token: {
          colorBgBase: "#040404",
          colorText: "#FFFFFF",
        },
      }}
    >
      <Layout>
        <Content>
          <LoginFormPage
            id="login-form"
            formRef={formRef}
            backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
            backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
            containerStyle={{
              background: "rgba(0, 0, 0,0.65)",
              backdropFilter: "blur(5px)",
              borderRadius: 6,
              maxWidth: "600px",
            }}
            logo={
              <img
                alt="logo"
                src={logo}
                style={{ height: "100%", justifyItems: "center" }}
              />
            }
            submitter={{
              searchConfig: {
                submitText: loginType === "Login" ? "Login" : "Signup",
              },
              submitButtonProps: {
                style: {
                  background: token.colorPrimary,
                  width: "100%",
                },
              },
              onSubmit: getFormateValues,
            }}
            onFinish={onSubmit}
            style={{
              overflow: "hidden",
            }}
            //在Button下面的UI
            actions={
              <>
                <Divider style={{ margin: "8px,0" }} plain>
                  <span
                    style={{
                      color: "#505050",
                      fontWeight: "normal",
                      fontSize: 16,
                    }}
                  >
                    {loginType === "Login"
                      ? "Login with others"
                      : "Signup with others"}
                  </span>
                </Divider>
                <Button
                  type="primary"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "40px",
                    fontSize: "16px",
                    border: 0,
                    background: "#393939",
                    boxShadow: "0 0 0 0",
                  }}
                >
                  <GoogleSvg />
                  {loginType === "Login"
                    ? "Login with Google"
                    : "Signup with Google"}
                </Button>
              </>
            }
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
              items={[
                { key: "Login", label: "Login" },
                { key: "Signup", label: "Signup" },
              ]}
            ></Tabs>
            {loginType === "Login" && (
              <>
                <ProFormText
                  name="Username"
                  placeholder="Enter username"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                  //fieldProps為對應的input樣式
                  fieldProps={{
                    size: "large",
                    prefix: (
                      <Icon name="person" style={styles.loginIconColor} />
                    ),
                    autoComplete: "on",
                  }}
                />
                <ProFormText.Password
                  name="Password"
                  placeholder="Enter password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
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
            )}
            {loginType === "Signup" && (
              <>
                <ProFormText
                  name="Email"
                  placeholder="Enter email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                  fieldProps={{
                    size: "large",
                    prefix: <Icon name="email" style={styles.loginIconColor} />,
                    autoComplete: "on",
                  }}
                />
                <ProFormText.Password
                  name="Password"
                  placeholder="Enter password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                  fieldProps={{
                    size: "large",
                    prefix: <Icon name="lock" style={styles.loginIconColor} />,
                  }}
                />
                <ProFormText.Password
                  name="ConfirmPassword"
                  placeholder="Confirm password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                    () => ({
                      validator: async (_, value) => {
                        if (
                          value !== formRef.current?.getFieldValue("Password")
                        ) {
                          return Promise.reject(
                            "The two passwords do not match!"
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                  fieldProps={{
                    size: "large",
                    prefix: <Icon name="lock" style={styles.loginIconColor} />,
                  }}
                />
              </>
            )}
          </LoginFormPage>
        </Content>
      </Layout>
    </ThemeProvider>
  );
};

export default Login_out;
