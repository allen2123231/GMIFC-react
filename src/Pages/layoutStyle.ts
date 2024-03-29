import { createStyles } from "antd-style";

const useStyle = createStyles(({ token }) => {
  return {
    header: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      paddingInline: token.paddingLG,
      background: token.colorBgLayout,
    },
    content: {
      paddingInline: token.paddingLG,
      paddingBlock: token.paddingMD,
      background: token.colorBgLayout,
    },
    card: {
      height: "100%",
      boxShadow: token.boxShadow,
    },
  };
});

export default useStyle;
