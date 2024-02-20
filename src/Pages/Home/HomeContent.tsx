import { ProCard, useBreakpoint } from "@ant-design/pro-components";
import { Button, Col, Flex, message, theme } from "antd";
import { FC, useState } from "react";
import useStyle from "../layoutStyle";

import AssestManagement from "./AssestManagement";
import ProfileContent from "./ProfileContent";
import { moduleData } from "../../assets/data/moduleData";

const HomeContent: FC = () => {
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { token } = theme.useToken();
  const { styles } = useStyle();

  const curentScreen = useBreakpoint();

  const verticalScreen = ["xs", "sm"];

  //按下編輯按鈕跳出密碼確認視窗
  const handleEdit = async () => {
    setShowPasswordCheck(true);
  };

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
          title="Assests management"
          headStyle={{
            paddingInline: token.paddingMD,
            paddingTop: token.paddingSM,
          }}
          bodyStyle={{
            paddingInline: token.paddingMD,
            paddingTop: token.paddingSM,
            paddingBottom: 0,
          }}
          className={styles.card}
        >
          <AssestManagement listData={moduleData} />
        </ProCard>
      </Col>
      <Col>
        <ProCard
          title="Profile"
          extra={
            verticalScreen.includes(curentScreen ?? "") ? (
              <Button size="small"> Show detail</Button>
            ) : (
              <Button size="small" onClick={handleEdit}>
                Edit
              </Button>
            )
          }
          headStyle={{
            paddingInline: token.paddingMD,
            paddingTop: token.paddingSM,
          }}
          bodyStyle={{
            paddingInline: token.paddingMD,
            paddingTop: token.paddingSM,
          }}
          className={styles.card}
        >
          <ProfileContent
            messageApi={messageApi}
            showPasswordCheck={showPasswordCheck}
            setShowPasswordCheck={setShowPasswordCheck}
          />
        </ProCard>
      </Col>
    </Flex>
  );
};

export default HomeContent;
