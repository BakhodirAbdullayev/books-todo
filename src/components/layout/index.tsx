import { FC, JSX, ReactNode } from "react";
import Header from "./header";
import { Box } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <Box paddingX={2}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
