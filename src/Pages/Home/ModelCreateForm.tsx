import {
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import { DatePicker, Modal, Space } from "antd";
import { FC, useRef } from "react";
import dayjs from "dayjs";

interface ModelCreateFormProps {
  modelformVisible: boolean;
  setModelformVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelCreateForm: FC<ModelCreateFormProps> = ({
  modelformVisible,
  setModelformVisible,
}) => {
  const formRef = useRef();

  const handelOnFinish = async (values: undefined) => {
    console.log(values);
    setModelformVisible(false);
    return true;
  };

  return (
    <StepsForm
      onFinish={handelOnFinish}
      formRef={formRef}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            title="Create Model"
            centered
            width={800}
            onCancel={() => {
              setModelformVisible(false);
              return true;
            }}
            open={modelformVisible}
            footer={submitter}
            destroyOnClose={true}
          >
            {dom}
          </Modal>
        );
      }}
    >
      {/* //步驟一 */}
      <StepsForm.StepForm
        name="Model_Information"
        title="Model Information"
        onFinish={async () => {
          return true;
        }}
      >
        <ProFormText
          name="name"
          width="lg"
          label="Name"
          placeholder="Enter Model Name"
          rules={[{ required: true }]}
        />
        <Space direction="vertical" style={{ marginBottom: 24 }}>
          <span>Build Day</span>
          <DatePicker showNow={false} defaultValue={dayjs()} />
        </Space>
        <ProFormTextArea
          name="description"
          label="Description"
          width="lg"
          placeholder="Enter Model Description"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="Upload_Model"
        title="Upload Model"
        onFinish={async () => {
          return true;
        }}
      ></StepsForm.StepForm>
      <StepsForm.StepForm
        name="Publish_Model"
        title="Publish Model"
        onFinish={async () => {
          return true;
        }}
      ></StepsForm.StepForm>
    </StepsForm>
  );
};
export default ModelCreateForm;
