import { ProCard } from "@ant-design/pro-components";
import { Button, Flex } from "antd";
import { FC } from "react";
import Icon from "../../components/Icon";
import useStyle from "../../Layout/uiStyle";

const AssestManagement: FC = () => {
  const { styles } = useStyle();
  return (
    <Flex vertical style={{ height: "100%" }}>
      <Flex vertical style={{ flex: 1 }}>
        <ProCard
          title={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Icon name="deployed_code_update" style={styles.colorText} />
              <span>Model</span>
            </div>
          }
          extra={<Button size="small">Create</Button>}
          headStyle={{ fontSize: 16 }}
          style={{ flex: 1 }}
        ></ProCard>
      </Flex>
      <Flex style={{ flex: 1 }}> </Flex>
      <Flex style={{ flex: 1 }}> </Flex>
    </Flex>
  );
};

export default AssestManagement;
