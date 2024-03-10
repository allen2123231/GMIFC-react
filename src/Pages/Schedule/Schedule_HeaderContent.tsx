import { FC } from "react";
import Breadcrumbs from "../../components/Header_Breadcrumb";
import { AutoComplete, Col, Grid, Input, Row } from "antd";

const { useBreakpoint } = Grid;

const Schedule_HeaderContent: FC = () => {
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
    </Row>
  );
};
export default Schedule_HeaderContent;
