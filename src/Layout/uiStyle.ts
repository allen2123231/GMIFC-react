import { createStyles } from "antd-style";

const useStyle = createStyles(
  (
    { token, css, isDarkMode },
    props: { sideBarState: boolean; isactived: boolean }
  ) => {
    const iscollapsed: boolean = props ? props.sideBarState : false;
    const isactived: boolean = props ? props.isactived : false;
    const siderButtonCommon = css`
      display: flex;
      padding: 0px;
      align-items: center;
      border: none;
      height: 36px;
      background-color: ${isDarkMode ? "#071223" : "#ffffff"};
      color: ${isactived ? "#ffffff" : token.colorText};
    `;
    return {
      siderButton: css`
        ${siderButtonCommon};
        width: ${iscollapsed ? "36px" : "90%"};
        margin-inline: ${iscollapsed ? "6px" : "0.5rem"};
        justify-content: ${iscollapsed ? "center" : "flex-start"};
        background-color: ${isactived ? token.colorPrimary : ""};
      `,
      siderButtonCollapsed: css`
        ${siderButtonCommon};
        width: 36px;
        margin-inline: 6px;
        justify-content: center;
      `,
      primaryButton: css`
        background-color: ${token.colorPrimary};
      `,
      buttonIcon: {
        marginInline: 8,
      },
      colorText: {
        color: token.colorText,
      },
      loginIconColor: {
        color: "#ffffff",
      },
    };
  }
);
export default useStyle;
