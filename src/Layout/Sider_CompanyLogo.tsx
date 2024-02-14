import { FC } from "react";
import darkImg from "../assets/GM_Logo_png (白).png";
import darkcollapsedImg from "../assets/GM_LogoSimple_png (白).png";
import lightImg from "../assets/GM_Logo_png (彩).png";
import lightcollapsedImg from "../assets/GM_LogoSimple_png (彩).png";
import { useThemeMode } from "antd-style";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { theme } from "antd";

const CompanyLogo: FC = () => {
  const { appearance } = useThemeMode();
  const sideBarState = useSelector<TRootState, boolean>(
    (state) => state.sidebarstate.isCollapsed
  );
  const { token } = theme.useToken();

  return (
    <div
      className="CompanyLogo"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "0.7rem",
        marginBottom: token.marginSM,
      }}
    >
      {appearance === "dark" ? (
        sideBarState ? (
          <img src={darkcollapsedImg} alt="logo" style={{ width: "85%" }} />
        ) : (
          <img src={darkImg} alt="logo" style={{ width: "85%" }} />
        )
      ) : sideBarState ? (
        <img src={lightcollapsedImg} alt="logo" style={{ width: "85%" }} />
      ) : (
        <img src={lightImg} alt="logo" style={{ width: "85%" }} />
      )}
    </div>
  );
};
export default CompanyLogo;
