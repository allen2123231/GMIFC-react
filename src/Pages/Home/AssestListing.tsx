import { ProCard, useBreakpoint } from "@ant-design/pro-components";
import { Button, Card, Col, Flex, List, theme } from "antd";
import { FC, useEffect, useState } from "react";
import Icon from "../../components/Icon";
import useStyle from "../../Layout/uiStyle";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { PlusOutlined } from "@ant-design/icons";
import { useThemeMode } from "antd-style";
import ModelCreateForm from "./ModelCreateForm";

export interface AssestListingProps {
  title: string;
  iconName: string;
  totalHeight: number | undefined;
}

const AssestListing: FC<AssestListingProps> = ({
  title,
  iconName,
  totalHeight,
}) => {
  const { styles } = useStyle();
  const { appearance } = useThemeMode();
  const { token } = theme.useToken();

  const curscreen = useBreakpoint();

  const [colcount, setColcount] = useState(1);
  const [modelformVisible, setModelformVisible] = useState(false);

  const handelmodelcreate = () => {
    setModelformVisible(true);
  };

  const cardHeight = totalHeight ? totalHeight / 3 - 34 - 30 : 0;
  console.log(cardHeight);

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
  console.log(totalHeight);

  // 依屏幕大小設置行數
  useEffect(() => {
    const middleScreen = ["md", "lg"];

    middleScreen.includes(curscreen ? curscreen : "")
      ? setColcount(3)
      : curscreen === "xl"
      ? setColcount(4)
      : curscreen === "xxl"
      ? setColcount(6)
      : setColcount(2);
  }, [curscreen]);

  const list: { id: number; title: string; description: string }[] = [];
  for (let i = 1; i < colcount; i += 1) {
    list.push({
      id: i,
      title: "卡片列表",
      description:
        "Umi@4 实战教程，专门针对中后台项目零基础的朋友，不管你是前端还是后端，看完这个系列你也有能力合理“抗雷”，“顶坑”",
    });
  }
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
        // extra={<Button size="small">Create</Button>}
        headStyle={{
          paddingInline: token.paddingXS,
          paddingTop: 0,
          paddingBottom: token.paddingXS,
        }}
        bodyStyle={{
          paddingInline: token.paddingXS,
          paddingTop: token.paddingXS,
          paddingBottom: 0,
        }}
        style={{ flex: 1 }}
      >
        <List
          grid={{
            gutter: token.paddingSM,
            column: colcount,
          }}
          style={{ height: "100%" }}
          dataSource={[{}, ...list]}
          renderItem={(item) => {
            if (item && (item as { id: number }).id) {
              return (
                <List.Item key={(item as { id: number }).id}>
                  <Card
                    hoverable
                    style={{
                      width: "100%",
                      height: cardHeight,
                      backgroundColor:
                        appearance === "dark" ? "#223c5f" : "#f0f6ff",
                    }}
                  >
                    <Card.Meta
                      title={
                        <a>
                          {
                            (
                              item as {
                                id: number;
                                title: string;
                                description: string;
                              }
                            ).title
                          }
                        </a>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item>
                <Button
                  type="dashed"
                  onClick={title === "Model" ? handelmodelcreate : () => {}}
                  style={{
                    width: "100%",
                    height: cardHeight,
                    boxShadow: "none",
                    backgroundColor:
                      appearance === "dark" ? "#223c5f" : "#f0f6ff",
                  }}
                >
                  <PlusOutlined /> 新增产品
                </Button>
                <ModelCreateForm
                  modelformVisible={modelformVisible}
                  setModelformVisible={setModelformVisible}
                />
              </List.Item>
            );
          }}
        ></List>
      </ProCard>
    </Flex>
  );
};
export default AssestListing;
