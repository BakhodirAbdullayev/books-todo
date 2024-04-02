import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/layout";
import Sign from "../pages/Auth/sign";
import Error from "../pages/Error";
import { useUser } from "./context";
import Search from "../pages/Search";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const ctx = useUser();
  if (ctx?.user?.key && ctx?.user?.secret) {
    return children;
  }
  return <Navigate to={"/sign-up"} />;
};

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout>
            <Outlet />
          </Layout>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          path: "/",
        },
        {
          element: <Search />,
          path: "/search",
        },
      ],
    },
    {
      path: "/sign-up",
      element: <Sign />,
    },
    {
      path: "/sign-in",
      element: <Sign />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ],
  {
    basename: "/",
  }
);
export default routes;
