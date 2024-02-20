import { Flex } from "antd";
import { FC } from "react";
import AssestListing, { AssestListingProps } from "./AssestListing";

// const AssestListingData = [
//   { title: "Model", iconName: "deployed_code_update" },
//   { title: "Fabrication", iconName: "precision_manufacturing" },
// ];

export type TAssestListingData = AssestListingProps;

interface AssestManagementProps {
  listData: TAssestListingData[];
}

const AssestManagement: FC<AssestManagementProps> = ({ listData }) => {
  return (
    <Flex vertical style={{ height: "100%" }}>
      {listData.map((data, key) => (
        <AssestListing title={data.title} iconName={data.iconName} key={key} />
      ))}
    </Flex>
  );
};

export default AssestManagement;
