import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { FC } from "react";
import Icon from "../../components/Icon";
import useStyle from "../../Layout/uiStyle";

interface SignupContentProps {
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
}

const SignupContent: FC<SignupContentProps> = ({ formRef }) => {
  const { styles } = useStyle();

  return (
    <>
      <ProFormText
        name="Username"
        placeholder="Enter username"
        fieldProps={{
          size: "large",
          prefix: <Icon name="person" style={styles.loginIconColor} />,
          autoComplete: "on",
        }}
        rules={[{ required: true, message: "Please enter your username" }]}
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
        rules={[{ required: true, message: "Please enter your password" }]}
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
              if (value !== formRef.current?.getFieldValue("Password")) {
                return Promise.reject("The two passwords do not match!");
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
  );
};
export default SignupContent;
