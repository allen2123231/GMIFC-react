import { createStyles } from "antd-style";

const useStyle = createStyles(({ token }) => {
  return {
    header: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      padding: "0 16px",
      background: token.colorBgLayout,
    },
    content: {
      padding: "0 16px",
      background: token.colorBgLayout,
    },
  };
});

export default useStyle;
