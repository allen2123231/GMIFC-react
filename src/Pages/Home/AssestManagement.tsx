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
  assestsManagementheight: number | undefined;
}

const AssestManagement: FC<AssestManagementProps> = ({
  listData,
  assestsManagementheight,
}) => {
  const assestsManagementBodyHeight = assestsManagementheight
    ? assestsManagementheight - 38 - 12
    : 0;
  console.log(assestsManagementheight);
  console.log(assestsManagementBodyHeight);
  return (
    <Flex vertical style={{ height: "100%" }}>
      {listData.map((data, key) => (
        <AssestListing
          title={data.title}
          iconName={data.iconName}
          key={key}
          totalHeight={assestsManagementBodyHeight}
        />
      ))}
    </Flex>
  );
};

export default AssestManagement;
