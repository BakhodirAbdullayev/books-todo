import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { MdFolderOff } from "react-icons/md";
const NoData: FC = (): JSX.Element => {
  return (
    <Box
      width={"100%"}
      minHeight={300}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={200}
        height={200}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        fontSize={80}
        bgcolor={"#eee"}
        boxShadow={3}
        sx={{
          borderRadius: 1,
          color: "#333",
          gap: 1,
        }}
      >
        <MdFolderOff />
        <Typography fontWeight={"bold"} textTransform={"capitalize"}>
          Data not found
        </Typography>
      </Box>
    </Box>
  );
};

export default NoData;
