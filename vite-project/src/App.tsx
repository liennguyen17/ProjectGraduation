import { App } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import NotFound from "./pages/404";
import { routes } from "./config/route";
import AppProvider from "./context/AppProvider";

dayjs.locale("vi");

function MyApp() {
  const router = createBrowserRouter(routes);

  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "rgba(41, 212, 178, 0.959)",
          colorLink: "rgb(49, 209, 172))",
        },
      }}
    >
      <AppProvider>
        <App>
          <RouterProvider router={router} fallbackElement={<NotFound />} />
        </App>
      </AppProvider>
    </ConfigProvider>
  );
}

export default MyApp;
