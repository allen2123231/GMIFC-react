import {
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { FC, useState } from "react";
import Icon from "../../components/Icon";
import { Button, GlobalToken, Modal } from "antd";
import useStyle from "../../ui/uiStyle";
import { MessageInstance } from "antd/es/message/interface";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

interface LoginContentProps {
  token: GlobalToken;
  messageApi: MessageInstance;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
}

const LoginContent: FC<LoginContentProps> = ({
  token,
  messageApi,
  formRef,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const curentScreen = useBreakpoint();
  const { styles } = useStyle();

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const submitEmail = async () => {
    try {
      const auth = getAuth();
      const email = formRef.current?.getFieldValue("Email2") as string;
      await sendPasswordResetEmail(auth, email);
      messageApi.success("Email sent successfully");

      // setOpenModal(false);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Please enter a valid email address",
        duration: 10,
      });
      console.log(error);
    }
  };

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
          onClick={handleOpenModal}
        >
          Forgot password?
        </a>
        <Modal
          title="Please enter your email address to reset your password."
          centered
          open={openModal}
          onCancel={handleCancel}
          footer={[
            <Button key="Return" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={submitEmail}
              style={{ background: token.colorPrimary }}
            >
              Submit
            </Button>,
          ]}
        >
          <ProFormText
            name="Email2"
            placeholder="Enter Email"
            rules={[{ required: true, message: "Please enter your email" }]}
            fieldProps={{
              size: "large",
              prefix: <Icon name="email" style={styles.loginIconColor} />,
              autoComplete: "on",
            }}
          />
        </Modal>
      </div>
    </>
  );
};
export default LoginContent;
