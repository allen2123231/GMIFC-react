import React, { FC } from "react";
import { Col, Grid, Row } from "antd";

interface IheaderContentProps {
  col1?: React.ReactNode;
  col2?: React.ReactNode;
}

const { useBreakpoint } = Grid;

const HeaderContent: FC<IheaderContentProps> = ({ col1, col2 }) => {
  const screens = useBreakpoint();
  const screensAll = Object.entries(screens);
  console.log(screensAll);
  return (
    <Row style={{ width: "100%" }} align={"middle"}>
      {!screensAll?.[0]?.[1] && (
        <Col sm={14} md={12} lg={7}>
          {col1}
        </Col>
      )}
      <Col
        xs={24}
        sm={10}
        md={12}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {col2}
      </Col>
    </Row>
  );
};
export default HeaderContent;
