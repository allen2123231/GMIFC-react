import {
  ProForm,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Modal, theme } from "antd";
import Icon from "../../components/Icon";
import useStyle from "../../Layout/uiStyle";
import { FC, useRef } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { MessageInstance } from "antd/es/message/interface";

interface ForgotPasswordProps {
  openModal: boolean;
  handleCancel: () => void;
  messageApi: MessageInstance;
}

const ForgotPasswordModal: FC<ForgotPasswordProps> = ({
  openModal,
  handleCancel,
  messageApi,
}) => {
  const { styles } = useStyle();
  const { token } = theme.useToken();

  const formRef = useRef<ProFormInstance>();

  const submitEmail = async () => {
    const email = formRef.current?.getFieldValue("Email2") as string;
    console.log(email);
    try {
      const auth = getAuth();
      const email = formRef.current?.getFieldValue("Email2") as string;
      console.log(email);
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
      <ProForm submitter={false} formRef={formRef}>
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
      </ProForm>
    </Modal>
  );
};

export default ForgotPasswordModal;
