import { createStyles } from "antd-style";

const useLayoutStyle = createStyles(({ token }) => {
  return {
    layout: {
      maxHeight: "100vh",
      overflowY: "scroll",
    },
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

export default useLayoutStyle;
