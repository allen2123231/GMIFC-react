import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { Button, Divider, Layout, Tabs, message, theme } from "antd";
import { FC, useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { setLocation } from "../store/location";
import { setNoneState } from "../store/moduleStateSlice";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

import logo from "../assets/GM_Logo_png (白).png";
import Icon from "../components/Icon";
import useStyle from "../ui/uiStyle";
import { ThemeProvider } from "antd-style";
import GoogleSvg from "./Login_out/googleIcon";

import { datebase } from "../firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const firestore = datebase;
const { Content } = Layout;

type LoginType = "Login" | "Signup";

const Login_out: FC = () => {
  const [loginType, setLoginType] = useState<LoginType>("Login");
  const [messageApi, contextHolder] = message.useMessage();
  const { styles } = useStyle();

  const { token } = theme.useToken();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const navigate = useNavigate();

  const curentScreen = useBreakpoint();
  console.log(curentScreen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocation(pathnames[0]));
    dispatch(setNoneState());
  });

  const formRef = useRef<ProFormInstance>();
  // const getFormateValues = () => {
  //   console.log(formRef.current?.getFieldsValue());
  // };
  // 獲取用戶輸入的註冊資訊
  const getEmail = (): string => {
    return formRef?.current?.getFieldValue("Email") as string;
  };
  const getpassword = (): string => {
    return formRef?.current?.getFieldValue("Password") as string;
  };
  const getUsername = (): string => {
    return formRef?.current?.getFieldValue("Username") as string;
  };

  //註冊提交
  const signupOnSubmit = async () => {
    try {
      const auth = getAuth();
      const email = getEmail();
      const password = getpassword();
      const username = getUsername();
      const UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser) {
        updateProfile(auth.currentUser, { displayName: username });
      }
      const user = UserCredential.user;
      const userdata = {
        username: username,
        email: email,
        uid: user?.uid,
        timestamp: serverTimestamp(),
      };
      await setDoc(doc(datebase, "users", user?.uid), userdata);
      messageApi.open({
        type: "success",
        content: "Sign up was success",
      });
      navigate("/Model");
      console.log(user);
      console.log(username);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Signup failed",
      });
      console.log(error);
    }
  };

  const loginOnSubmit = () => {};

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
      {contextHolder}
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
              onSubmit: loginType === "Signup" ? signupOnSubmit : loginOnSubmit,
            }}
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
            {/* 登陸頁面 */}
            {loginType === "Login" && (
              <>
                <ProFormText
                  name="Email"
                  placeholder="Enter Email"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
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
            {/* 註冊頁面 */}
            {loginType === "Signup" && (
              <>
                <ProFormText
                  name="Username"
                  placeholder="Enter username"
                  fieldProps={{
                    size: "large",
                    prefix: (
                      <Icon name="person" style={styles.loginIconColor} />
                    ),
                    autoComplete: "on",
                  }}
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                />
                <ProFormText
                  name="Email"
                  placeholder="Enter email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    {
                      pattern:
                        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: "Please enter a valid email address",
                    },
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
