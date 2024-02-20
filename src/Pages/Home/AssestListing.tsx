import { ProCard, useBreakpoint } from "@ant-design/pro-components";
import { Button, Col, Flex, Row, theme } from "antd";
import { FC, useEffect, useState } from "react";
import Icon from "../../components/Icon";
import useStyle from "../../Layout/uiStyle";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";

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
  useEffect(() => {
    const middleScreen = ["md", "lg"];

    middleScreen.includes(curscreen ? curscreen : "")
      ? setColcount(2)
      : curscreen === "xl"
      ? setColcount(4)
      : curscreen === "xxl"
      ? setColcount(6)
      : setColcount(2);
  }, [curscreen]);
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
        <Row
          justify="center"
          style={{ height: "100%" }}
          gutter={token.paddingMD}
        >
          {/* {cols} */}
        </Row>
      </ProCard>
    </Flex>
  );
};
export default AssestListing;
