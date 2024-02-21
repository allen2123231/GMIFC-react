import { ProCard, useBreakpoint } from "@ant-design/pro-components";
import { Avatar, Button, Card, Col, Flex, List, Row, theme } from "antd";
import { FC, useEffect, useState } from "react";
import Icon from "../../components/Icon";
import useStyle from "../../Layout/uiStyle";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { PlusOutlined } from "@ant-design/icons";

export interface AssestListingProps {
  title: string;
  iconName: string;
}

const AssestListing: FC<AssestListingProps> = ({ title, iconName }) => {
  const { styles } = useStyle();
  const { token } = theme.useToken();

  const curscreen = useBreakpoint();

  const [colcount, setColcount] = useState(1);

  const cols = [];
  for (let i = 0; i < colcount; i++) {
    cols.push(
      <Col key={i.toString()} span={24 / colcount}>
        <ProCard
          title="Card title"
          hoverable={true}
          extra={<Button size="small">More</Button>}
          style={{ height: "97%", boxShadow: token.boxShadow }}
        >
          Card content
        </ProCard>
      </Col>
    );
  }

  const sidebarisCollapsed = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  const limitScreenSize = curscreen === "xs" && sidebarisCollapsed == false;
  console.log(curscreen);

  const list: any[] = [];
  for (let i = 1; i < 4; i += 1) {
    list.push({
      id: i,
      title: "卡片列表",
      description:
        "Umi@4 实战教程，专门针对中后台项目零基础的朋友，不管你是前端还是后端，看完这个系列你也有能力合理“抗雷”，“顶坑”",
    });
  }

  // useEffect(() => {
  //   const middleScreen = ["md", "lg"];

  //   middleScreen.includes(curscreen ? curscreen : "")
  //     ? setColcount(2)
  //     : curscreen === "xl"
  //     ? setColcount(4)
  //     : curscreen === "xxl"
  //     ? setColcount(6)
  //     : setColcount(2);
  // }, [curscreen]);
  return (
    <Flex vertical style={{ flex: 1 }}>
      <ProCard
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Icon name={iconName} style={styles.colorText} />
            {limitScreenSize ? (
              ""
            ) : (
              <span style={{ marginInline: token.marginSM }}>{title}</span>
            )}
          </div>
        }
        extra={<Button size="small">Create</Button>}
        headStyle={{
          paddingInline: token.paddingXS,
          paddingTop: 0,
          paddingBottom: token.paddingXS,
        }}
        bodyStyle={{
          paddingInline: token.paddingXS,
          paddingTop: token.paddingXS,
          paddingBottom: token.paddingLG,
        }}
        style={{ flex: 1 }}
      >
        <Row justify="center" gutter={token.paddingMD}>
          <List
            grid={{
              gutter: token.paddingSM,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 6,
              xxl: 6,
            }}
            style={{ height: "100%" }}
            dataSource={[{}, ...list]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card hoverable style={{ width: "100%", height: "100%" }}>
                      <Card.Meta
                        avatar={
                          <Avatar
                            size={48}
                            src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
                          />
                        }
                        title={<a>{item.title}</a>}
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button
                    type="dashed"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <PlusOutlined /> 新增产品
                  </Button>
                </List.Item>
              );
            }}
          ></List>
        </Row>
      </ProCard>
    </Flex>
  );
};
export default AssestListing;
