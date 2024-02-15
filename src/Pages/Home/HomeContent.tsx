import {
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { Avatar, Button, Col, Flex, message, theme } from "antd";
import { FC, useRef, useState } from "react";
import useStyle from "../layoutStyle";

import ForgotPasswordModal from "../Cridential/ForgotPasswordModal";
import PasswordCheck from "../Cridential/PasswordCheck";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { datebase } from "../../firebase.config";

const HomeContent: FC = () => {
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [diseditabled, setDisEditabled] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { token } = theme.useToken();
  const { styles } = useStyle();

  const formRef = useRef<ProFormInstance>();
  const curentScreen = useBreakpoint();
  const allScreen = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const tempArry = Array.from(allScreen);
  const horizontalScreen = tempArry.splice(2);
  const verticalScreen = tempArry;

  const auth = getAuth();

  //按下編輯按鈕跳出密碼確認視窗
  const handleEdit = async () => {
    setShowPasswordCheck(true);
  };
  //設定編輯狀態
  const makeEditabled = () => {
    setDisEditabled(false);
  };
  //身分驗證成功後執行的函數
  const afterSuccess = () => {
    makeEditabled();
    handleShowSubmit();
  };
  //顯示Proform按鈕
  const handleShowSubmit = () => {
    setShowSubmit(true);
  };
  //關閉密碼確認視窗
  const handleModalCancel = () => {
    setShowPasswordCheck(false);
  };
  //顯示忘記密碼視窗
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };
  //關閉忘記密碼視窗
  const handleForgotPasswordCancel = () => {
    setShowForgotPassword(false);
  };

  const applyChange = async () => {
    try {
      const curName = formRef.current?.getFieldValue("name");
      if (auth.currentUser) {
        if (auth.currentUser.displayName !== curName) {
          await updateProfile(auth.currentUser, { displayName: curName });
        }
        const docRef = doc(datebase, "users", auth.currentUser?.uid);
        await updateDoc(docRef, { username: curName });
        messageApi.success("Profile updated");
        setDisEditabled(true);
        setShowSubmit(false);
      }
    } catch (error) {
      console.log(error);
      messageApi.error("Could not update your profile");
    }
  };

  console.log(verticalScreen);
  console.log(curentScreen);
  return (
    <Flex
      gap={16}
      style={{
        height: "100%",
      }}
      vertical={verticalScreen.includes(curentScreen ? curentScreen : "")}
    >
      {contextHolder}
      <Col flex="auto">
        <ProCard
          title="Welcome to GMIFC"
          headStyle={{
            paddingInline: token.paddingMD,
            paddingTop: token.paddingSM,
          }}
          className={styles.card}
        />
      </Col>
      <Col>
        <ProCard
          title="Profile"
          extra={
            verticalScreen.includes(curentScreen ?? "") ? (
              <Button size="small"> Show detail</Button>
            ) : (
              <Button size="small" onClick={handleEdit}>
                Edit
              </Button>
            )
          }
          headStyle={{
            paddingInline: token.paddingMD,
            paddingTop: token.paddingSM,
          }}
          bodyStyle={{
            padding: token.paddingSM,
          }}
          className={styles.card}
        >
          <Flex
            justify="center"
            align="center"
            vertical={horizontalScreen.includes(
              curentScreen ? curentScreen : ""
            )}
            gap={16}
          >
            <Avatar
              size={{ xs: 70, sm: 90, md: 90, lg: 120, xl: 150, xxl: 150 }}
            />
            {curentScreen != "xs" && (
              <ProForm
                size="small"
                formRef={formRef}
                submitter={{
                  render: () => {
                    return [
                      showSubmit && (
                        <Button
                          type="primary"
                          onClick={applyChange}
                          style={{ background: token.colorPrimary }}
                        >
                          Apply Change
                        </Button>
                      ),
                    ];
                  },
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <ProFormText
                  formItemProps={{ style: { marginBottom: "8px" } }}
                  name="name"
                  label="Name:"
                  initialValue={auth.currentUser?.displayName}
                  disabled={diseditabled}
                />
                <ProFormText
                  // formItemProps={{ style: { marginBottom: "0px" } }}
                  name="email"
                  label="Email"
                  initialValue={auth.currentUser?.email}
                  disabled={diseditabled}
                />
                <PasswordCheck
                  afterSuccess={afterSuccess}
                  showPasswordCheck={showPasswordCheck}
                  handleModalCancel={handleModalCancel}
                  handleForgotPassword={handleForgotPassword}
                  messageApi={messageApi}
                />
                <ForgotPasswordModal
                  messageApi={messageApi}
                  openModal={showForgotPassword}
                  handleCancel={handleForgotPasswordCancel}
                />
              </ProForm>
            )}
          </Flex>
        </ProCard>
      </Col>
    </Flex>
  );
};

export default HomeContent;
