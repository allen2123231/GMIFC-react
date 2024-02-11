import { FC } from "react";
import Breadcrumbs from "../../components/Header_Breadcrumb";
import { AutoComplete, Button, Col, Grid, Input, Row } from "antd";
import useStyle from "../../ui/uiStyle";

const { useBreakpoint } = Grid;

const HeaderContent_Model: FC = () => {
  const { styles } = useStyle();
  const screens = useBreakpoint();
  const screensAll = Object.entries(screens);

  return (
    <Row style={{ width: "100%" }} align={"middle"}>
      {!screensAll?.[0]?.[1] && (
        <Col sm={6} md={6}>
          <Breadcrumbs />
        </Col>
      )}
      <Col
        xs={20}
        sm={12}
        md={12}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <AutoComplete style={{ width: "80%", alignItems: "center" }}>
          <Input.Search placeholder="Search" enterButton />
        </AutoComplete>
      </Col>
      <Col
        xs={4}
        sm={6}
        md={6}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {!screensAll?.[0]?.[1] ? (
          <Button type="primary" className={styles.primaryButton}>
            Create
          </Button>
        ) : (
          <Button
            type="primary"
            shape="circle"
            className={styles.primaryButton}
          >
            +
          </Button>
        )}
      </Col>
    </Row>
  );
};
export default HeaderContent_Model;
