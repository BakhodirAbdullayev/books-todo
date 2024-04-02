import { Box } from "@mui/material";
import { FC, JSX } from "react";
import AuthForm from "../../components/auth-form";

const Sign: FC = (): JSX.Element => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <AuthForm />
    </Box>
  );
};

export default Sign;
