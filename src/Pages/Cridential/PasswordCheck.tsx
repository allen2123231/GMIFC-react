import {
  ProForm,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Modal, theme } from "antd";
import Icon from "../../components/Icon";
import { FC, useRef } from "react";
import useStyle from "../../Layout/uiStyle";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import { MessageInstance } from "antd/es/message/interface";

interface PasswordCheckProps {
  afterSuccess: () => void;
  showPasswordCheck: boolean;
  handleModalCancel: () => void;
  handleForgotPassword: () => void;
  messageApi: MessageInstance;
}

const PasswordCheck: FC<PasswordCheckProps> = ({
  afterSuccess,
  showPasswordCheck,
  handleModalCancel,
  handleForgotPassword,
  messageApi,
}) => {
  const { token } = theme.useToken();
  const { styles } = useStyle();

  const formRef = useRef<ProFormInstance>();

  const handleModalSummit = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const password = formRef.current?.getFieldValue("password") as string;

      if (user) {
        const credential = EmailAuthProvider.credential(
          user.email as string,
          password
        );
        await reauthenticateWithCredential(user, credential);
        messageApi.success("Password check successfully");
      }
      handleModalCancel();
      afterSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Check your password!"
      open={showPasswordCheck}
      destroyOnClose={true}
      okText="Submit"
      okButtonProps={{
        style: { background: token.colorPrimary },
      }}
      onOk={handleModalSummit}
      onCancel={handleModalCancel}
      maskClosable={true}
      footer={[
        <Button
          key="Forgot password"
          type="link"
          onClick={handleForgotPassword}
        >
          Forgot password ?
        </Button>,
        <Button
          key="Submit"
          type="primary"
          onClick={handleModalSummit}
          style={{ background: token.colorPrimary }}
        >
          Submit
        </Button>,
      ]}
    >
      <ProForm submitter={false} formRef={formRef}>
        <ProFormText.Password
          name="password"
          placeholder="Enter password"
          rules={[{ required: true, message: "Please enter your password" }]}
          fieldProps={{
            size: "large",
            prefix: <Icon name="lock" style={styles.colorText} />,
          }}
        />
      </ProForm>
    </Modal>
  );
};

export default PasswordCheck;
