import { Box, Button } from "@mui/material";
import { FC, JSX } from "react";
import { useNavigate } from "react-router-dom";

const Error: FC = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Box
        maxWidth={"80vw"}
        height={"auto"}
        sx={{
          img: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
      >
        <img src="/404.svg" alt="404 image" />
      </Box>

      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        flexDirection={{ sm: "row", xs: "column" }}
        mt={{ xs: 6, lg: 4 }}
        sx={{
          button: {
            paddingLeft: 8,
            paddingRight: 8,
          },
        }}
      >
        <Button onClick={() => navigate("/")} variant="contained">
          Go Home Page
        </Button>
        <Button onClick={() => navigate(0)} variant="outlined">
          Reload Page
        </Button>
      </Box>
    </Box>
  );
};

export default Error;
