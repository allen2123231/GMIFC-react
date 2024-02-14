import { FC } from "react";
import useStyle from "../Layout/uiStyle";

interface IIconProps {
  name: string;
  style: string;
}

const Icon: FC<IIconProps> = ({ name, style }) => {
  const { cx } = useStyle();
  return <span className={cx("material-symbols-rounded", style)}>{name}</span>;
};
export default Icon;
