import { RouterProvider } from "react-router-dom";
import routes from "./utils/routes";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          position: "relative",
          background: "none",
          "&::after": {
            content: "' '",
            position: "fixed",
            zIndex: -1,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#333",
            clipPath: "polygon(0% 100%, 0% 0%, 80% 0%,  20% 100%)",
          },
        }}
      >
        <RouterProvider router={routes} />
      </Box>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
