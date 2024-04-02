import { FC, JSX, ReactNode } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: { main: "#6200EE" },
    background: { default: "#333" },
    error: {
      main: "#ff0000",
    },
    warning: {
      main: "#FFEC43",
    },
    success: {
      main: "#00FF29",
    },
  },
  typography: {
    subtitle2: {
      fontSize: "14px",
    },
  },
});

const ThemeProvider: FC<ThemeProviderProps> = ({ children }): JSX.Element => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
