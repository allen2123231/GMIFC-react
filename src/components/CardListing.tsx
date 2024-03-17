import { Button, Card, List, theme } from "antd";
import React, { FC, useState } from "react";

import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { Project } from "../class/project";

import testImg from "../assets/img/testImg.png";

interface ICardlistingProps {
  createOnClick?: () => void;
  projectslistData: Project[];
}

const Cardlisting: FC<ICardlistingProps> = ({
  createOnClick,
  projectslistData,
}) => {
  const [isHoveringID, setIsHoveringID] = useState("");
  const { token } = theme.useToken();

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringID(event.currentTarget.id);
  };
  const handleMouseLeave = () => {
    setIsHoveringID("");
  };
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
      dataSource={[
        { name: "button", status: "Finish", description: "", id: "button" },
        ...projectslistData,
      ]}
      renderItem={(item: Project) => {
        if (item.id !== "button") {
          return (
            <List.Item
              key={item.id}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: 16 / 14,
                marginBottom: token.marginXL,
              }}
            >
              <Card
                id={item.id}
                cover={<img alt="example" src={testImg} />}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  aspectRatio: 16 / 14,
                  border: 0,
                  fontSize: "12px",
                  cursor: isHoveringID === item.id ? "pointer" : "default",
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
                styles={{
                  body: { padding: 8, flex: "auto" },
                  cover: { flex: 1, width: "100%", margin: 0 },
                  actions: { flex: 1 },
                }}
                actions={[
                  <EditOutlined key="edit" />,
                  <DeleteFilled
                    key="deket"
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log("delet click");
                    }}
                  />,
                ]}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  console.log(item.id);
                }}
              >
                <Card.Meta title={item.name} description={item.description} />
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
                aspectRatio: 16 / 14,
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
