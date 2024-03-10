import { Button, Card, List, theme } from "antd";
import React, { FC, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import fakeCardDatalist, { IfakeCardData } from "../assets/data/fakeCardData";

interface ICardlistingProps {
  createOnClick?: () => void;
}

const Cardlisting: FC<ICardlistingProps> = ({ createOnClick }) => {
  const [isHoveringID, setIsHoveringID] = useState("");
  const { token } = theme.useToken();

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringID(event.currentTarget.id);
  };
  const handleMouseLeave = () => {
    setIsHoveringID("");
  };
  console.log(isHoveringID);
  return (
    <List
      grid={{
        gutter: 24,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 5,
      }}
      // style={{ maxHeight: "80%", overflow: "auto" }}
      dataSource={[{}, ...fakeCardDatalist]}
      renderItem={(item: IfakeCardData) => {
        if (item && item.id) {
          return (
            <List.Item
              key={item.id}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: 16 / 9,
                marginBottom: token.marginXL,
              }}
            >
              <Card
                id={item.id}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: 16 / 9,
                  transform:
                    isHoveringID === item.id
                      ? "translateY(-16px)"
                      : "translateY(0px)",
                  boxShadow:
                    isHoveringID === item.id
                      ? token.boxShadow
                      : token.boxShadowTertiary,
                  transition: "all 0.5s",
                }}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                <Card.Meta title={item.title} />
              </Card>
            </List.Item>
          );
        }
        return (
          <List.Item>
            <Button
              type="dashed"
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "16/9",
                marginBottom: token.margin,
              }}
              onClick={createOnClick}
            >
              <PlusOutlined style={{ fontSize: "32px" }} />
            </Button>
          </List.Item>
        );
      }}
    />
  );
};
export default Cardlisting;
