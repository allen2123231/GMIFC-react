import {
  ProCard,
  ProForm,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { Avatar, Button, Col, Flex, message, theme } from "antd";
import { FC, useState } from "react";
import useStyle from "../layoutStyle";

import ForgotPasswordModal from "../Cridential/ForgotPasswordModal";
import PasswordCheck from "../Cridential/PasswordCheck";

const HomeContent: FC = () => {
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [diseditabled, setDisEditabled] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();

  const { token } = theme.useToken();
  const { styles } = useStyle();

  const curentScreen = useBreakpoint();
  const allScreen = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const tempArry = Array.from(allScreen);
  const horizontalScreen = tempArry.splice(4);
  const verticalScreen = tempArry;

  const handleEdit = async () => {
    setShowPasswordCheck(true);
  };
  const makeEditabled = () => {
    setDisEditabled(false);
  };
  const handleModalCancel = () => {
    setShowPasswordCheck(false);
  };
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };
  const handleForgotPasswordCancel = () => {
    setShowForgotPassword(false);
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
            <Button size="small" onClick={handleEdit}>
              Edit
            </Button>
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
                submitter={false}
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
                  initialValue="Muhammad Usman"
                  disabled={diseditabled}
                />
                <ProFormText
                  // formItemProps={{ style: { marginBottom: "0px" } }}
                  name="email"
                  label="Email"
                  disabled={diseditabled}
                />
                <PasswordCheck
                  afterSuccess={makeEditabled}
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
