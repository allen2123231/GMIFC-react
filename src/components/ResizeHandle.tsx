import { Button } from "antd";
import { FC } from "react";
import { PanelResizeHandle } from "react-resizable-panels";

interface IResizeHandleProps {
  isVertical?: boolean;
  dbClick?: () => void;
}

const ResizeHandle: FC<IResizeHandleProps> = ({ isVertical, dbClick }) => {
  return (
    <PanelResizeHandle>
      <Button
        type="text"
        icon={
          <span
            className="material-symbols-rounded"
            style={{ fontSize: "16px" }}
          >
            compare_arrows
          </span>
        }
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: isVertical ? "20px" : "100%",
          width: isVertical ? "100%" : "20px",
          border: "none",
        }}
        onDoubleClick={dbClick}
      />
    </PanelResizeHandle>
  );
};

export default ResizeHandle;
