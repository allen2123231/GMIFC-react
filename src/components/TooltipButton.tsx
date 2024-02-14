import { Button, Tooltip } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { useThemeMode } from "antd-style";
import useStyle from "../Layout/uiStyle";

interface ITooltipButtonProps {
  title: string;
  disable?: boolean;
  isactived: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const TooltipButton: FC<ITooltipButtonProps> = ({
  title,
  disable,
  isactived,
  onClick,
  children,
}) => {
  const { appearance } = useThemeMode();
  const sideBarState = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  const { styles, theme } = useStyle({ sideBarState, isactived });
  return (
    <Tooltip
      placement="right"
      title={sideBarState ? title : ""}
      color={appearance === "light" ? theme.colorText : ""}
    >
      <Button
        type="text"
        disabled={disable}
        className={styles.siderButton}
        onClick={onClick}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default TooltipButton;
