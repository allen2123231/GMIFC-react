import * as Firestore from "firebase/firestore";
import {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { MessageInstance } from "antd/es/message/interface";
import { FC, useRef } from "react";
import { Iproject } from "../../class/project";
import { getCollections } from "../../firebase.config";
import { ProjectsManager } from "../../class/ProjectsManager";

interface IProjectFormProps {
  modalVisible: boolean;
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi?: MessageInstance;
  projectsManager: ProjectsManager;
}
const CreateProjectForm: FC<IProjectFormProps> = ({
  modalVisible,
  setmodalVisible,
  messageApi,
  projectsManager,
}) => {
  const formRef = useRef<ProFormInstance>();

  const firebaseProjectCollection = getCollections<Iproject>("/projects");

  const onFinish = async () => {
    const getFormValue = await formRef.current?.getFieldsValue();
    const uploadData: Iproject = {
      name: getFormValue?.name,
      status: getFormValue?.status?.value,
      description: getFormValue?.description || null,
    };

    try {
      const project = projectsManager.newProject(uploadData);
      Firestore.addDoc(firebaseProjectCollection, uploadData);
      messageApi?.success("Project created successfully");
      setmodalVisible(false);
      console.log(project);
      formRef.current?.resetFields();
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  return (
    <ModalForm
      title="Create project"
      width={450}
      open={modalVisible}
      onOpenChange={setmodalVisible}
      onFinish={onFinish}
      submitter={{
        searchConfig: { submitText: "Create", resetText: "Cancel" },
      }}
      requiredMark={false}
      formRef={formRef}
    >
      <ProFormText
        name="name"
        label={"Project Name"}
        labelAlign="right"
        width="lg"
        placeholder="Please enter project name"
        rules={[{ required: true, message: "Please enter project name" }]}
      />
      <ProFormSelect
        name="status"
        label="Status"
        width="lg"
        fieldProps={{
          labelInValue: true,
        }}
        request={async () => [
          { label: "Design", value: "Design" },
          { label: "Detail Design", value: "Detail Design" },
          { label: "Fabrication", value: "Fabrication" },
          { label: "Finish", value: "Finish" },
        ]}
        placeholder={"Please select project status"}
      />
      <ProFormTextArea
        name="description"
        label="Description"
        width="lg"
        placeholder="Please enter project description"
      />
    </ModalForm>
  );
};
export default CreateProjectForm;
