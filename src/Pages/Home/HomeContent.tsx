import {
  ProCard,
  ProForm,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
import { Avatar, Button, Col, Flex, theme } from "antd";
import { FC } from "react";

const HomeContent: FC = () => {
  const { token } = theme.useToken();
  const curentScreen = useBreakpoint();
  const allScreen = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const tempArry = Array.from(allScreen);
  const horizontalScreen = tempArry.splice(4);
  const verticalScreen = tempArry;
  console.log(horizontalScreen);
  console.log(verticalScreen);
  console.log(curentScreen);
  return (
    <Flex
      gap={16}
      style={{
        height: "100%",
      }}
      vertical={verticalScreen.includes(curentScreen ? curentScreen : "")}
    >
      <Col flex="auto">
        <ProCard
          title="Welcome to GMIFC"
          headStyle={{
            paddingInline: token.paddingSM,
            paddingTop: token.paddingSM,
          }}
          style={{
            height: "100%",
            boxShadow: token.boxShadow,
          }}
          // className="shadow-xl "
        />
      </Col>
      <Col>
        <ProCard
          title="Profile"
          extra={<Button size="small">Edit</Button>}
          headStyle={{
            paddingInline: token.paddingSM,
            paddingTop: token.paddingSM,
          }}
          bodyStyle={{
            padding: token.paddingSM,
          }}
          style={{ height: "100%", boxShadow: token.boxShadow }}
        >
          <Flex
            justify="center"
            align="center"
            vertical={horizontalScreen.includes(
              curentScreen ? curentScreen : ""
            )}
            gap={16}
          >
            <Avatar
              size={{ xs: 70, sm: 90, md: 90, lg: 120, xl: 150, xxl: 150 }}
            />
            {curentScreen != "xs" && (
              <ProForm
                size="small"
                submitter={false}
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
                  initialValue="Muhammad Usman"
                  disabled
                />
                <ProFormText
                  // formItemProps={{ style: { marginBottom: "0px" } }}
                  name="email"
                  label="Email"
                  disabled
                />
              </ProForm>
            )}
          </Flex>
        </ProCard>
        {/* <Card
          title="Profile"
          style={{ height: "100%", boxShadow: token.boxShadow }}
        >
          <Meta
            avatar={
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 100, xl: 150, xxl: 200 }}
              />
            }
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingInlineEnd: "0px",
            }}
          />
        </Card> */}
      </Col>
    </Flex>
  );
};

export default HomeContent;
