import "./App.css";
import { useSelector } from "react-redux";
import { Router } from "./Router";
import { ThemeProvider, type ThemeMode, ThemeAppearance } from "antd-style";
import { theme } from "antd";

import type { TRootState } from "./store/store";

function App() {
  const themeModeState = useSelector<TRootState, ThemeMode>(
    (state) => state.thememode.theme
  );
  console.log(themeModeState);

  return (
    <ThemeProvider
      themeMode={themeModeState}
      theme={(appearance: ThemeAppearance) => {
        switch (appearance) {
          case "light":
            return {
              token: {
                colorBgBase: "#ebf1fb",
                colorText: "#0d2240",
                colorPrimary: "#d70036",
              },
              components: {
                Layout: {
                  lightSiderBg: "#ffffff",
                  headerHeight: 48,
                  headerPadding: "0px",
                },
                Switch: {
                  trackMinWidth: 36,
                  innerMinMargin: 2,
                },
                Select: {
                  selectorBg: "#ffffff",
                  optionActiveBg: "#d70036",
                },
                Input: {
                  addonBg: "#0000000d",
                },
              },
            };
          case "dark":
            return {
              token: {
                colorBgBase: "#122033",
                colorText: "#ffffffd8",
                colorPrimary: "#d70036",
                boxShadow:
                  "0px 1px 2px -2px rgba(0, 0, 0, 0.34), 0px 3px 6px 0px rgba(0, 0, 0, 0.3), 0px 5px 12px 4px rgba(0, 0, 0, 0.26)",
              },
              components: {
                Layout: {
                  siderBg: "#071223",
                  headerHeight: 48,
                  headerBg: "#122033",
                  headerPadding: "16px",
                },
                Button: {
                  textHoverBg: "#192b44",
                },
                Switch: {
                  trackMinWidth: 36,
                  innerMinMargin: 2,
                },
              },
              algorithm: theme.darkAlgorithm,
            };
        }
      }}
    >
      <Router />
    </ThemeProvider>
  );
}

export default App;
