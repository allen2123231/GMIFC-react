import {
  ProForm,
  ProFormInstance,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { Avatar, Button, Flex, theme } from "antd";
import { FC, useRef, useState } from "react";
import PasswordCheck from "../Cridential/PasswordCheck";
import ForgotPasswordModal from "../Cridential/ForgotPasswordModal";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase.config";
import { MessageInstance } from "antd/es/message/interface";

interface ProfileContentProps {
  messageApi: MessageInstance;
  setShowPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
  showPasswordCheck: boolean;
}

const ProfileContent: FC<ProfileContentProps> = ({
  messageApi,
  setShowPasswordCheck,
  showPasswordCheck,
}) => {
  const [diseditabled, setDisEditabled] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { token } = theme.useToken();

  const curentScreen = useBreakpoint();
  const allScreen = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const tempArry = Array.from(allScreen);
  const horizontalScreen = tempArry.splice(2);

  const formRef = useRef<ProFormInstance>();
  const auth = getAuth();

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
    setShowPasswordCheck(false);
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
        const docRef = doc(firebaseDB, "users", auth.currentUser?.uid);
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
  return (
    <Flex
      justify="center"
      align="center"
      vertical={horizontalScreen.includes(curentScreen ? curentScreen : "")}
      gap={16}
    >
      <Avatar size={{ xs: 70, sm: 90, md: 90, lg: 120, xl: 150, xxl: 150 }} />
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
  );
};
export default ProfileContent;
