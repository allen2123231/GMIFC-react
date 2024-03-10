import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { MessageInstance } from "antd/es/message/interface";
import { FC } from "react";

interface IProjectFormProps {
  modalVisible: boolean;
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi?: MessageInstance;
}
const CreateProjectForm: FC<IProjectFormProps> = ({
  modalVisible,
  setmodalVisible,
  messageApi,
}) => {
  return (
    <ModalForm
      title="Create project"
      open={modalVisible}
      onOpenChange={setmodalVisible}
      onFinish={async () => {
        messageApi?.success("Project created successfully");
        setmodalVisible(false);
        return true;
      }}
    >
      <ProFormText name="name" label="Name" />
    </ModalForm>
  );
};
export default CreateProjectForm;
